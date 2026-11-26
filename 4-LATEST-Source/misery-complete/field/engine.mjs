export class Garden {
 constructor(){this.reset()}
 reset(){this.stage='seed';this.water=0;this.growth=0;this.pinch=false;this.armed=false;this.anchor=null;this.harvestY=null;this.count=0;this.lost()}
 lost(){this.pinch=false;this.armed=false;this.anchor=null;this.harvestY=null;this.raining=false}
 update(h,dt){
 dt=Math.min(.08,Math.max(0,dt));this.raining=false;
 if(!h){this.lost();return}
 const near=h.x>.20&&h.x<.80;
 if(this.stage==='seed'){
 if(h.pinch&&near)this.armed=true;
 if(this.armed&&this.pinch&&!h.pinch&&near){this.stage='water';this.armed=false}
 }else if(this.stage==='water'){
 if(h.open&&near&&h.y<.72){this.raining=true;this.water=Math.min(1,this.water+dt/2.8);if(this.water>=1){this.stage='grow';this.anchor=h.y}}
 }else if(this.stage==='grow'){
 if(h.open&&near){if(this.anchor!==null)this.growth=Math.min(1,this.growth+Math.max(0,Math.min(.025,this.anchor-h.y))*1.8);this.anchor=h.y;if(this.growth>=1)this.stage='harvest'}else this.anchor=null;
 }else if(this.stage==='harvest'){
 if(h.pinch&&near){if(this.harvestY===null)this.harvestY=h.y;if(this.harvestY-h.y>.12){this.stage='done';this.count=1}}else this.harvestY=null;
 }
 this.pinch=h.pinch;
 }
}
export function classify(l,previousPinch=false){
 const d=(a,b)=>Math.hypot(l[a].x-l[b].x,l[a].y-l[b].y);
 const scale=Math.max(.03,d(0,9));const p=d(4,8)/scale;
 const fingers=[[8,6],[12,10],[16,14],[20,18]].filter(([a,b])=>d(a,0)>d(b,0)*1.15).length;
 return {x:1-(l[0].x+l[9].x)/2,y:(l[0].y+l[9].y)/2,pinch:p<(previousPinch?.43:.29),open:fingers>=3&&p>.5};
}

export const PLOTS=Array.from({length:6},(_,i)=>({x:700+(i%3)*370,y:510+Math.floor(i/3)*270}));
export class Field {
 constructor(saved){this.reset();if(saved?.version===1&&Array.isArray(saved.plots)&&saved.plots.length===6){saved.plots.forEach((p,i)=>{if(['seed','water','grow','harvest'].includes(p.stage)&&Number.isFinite(p.water)&&Number.isFinite(p.growth)){Object.assign(this.plots[i],{stage:p.stage,water:Math.max(0,Math.min(1,p.water)),growth:Math.max(0,Math.min(1,p.growth))})}});this.count=Number.isSafeInteger(saved.count)&&saved.count>=0?saved.count:0}}
 reset(){this.plots=Array.from({length:6},()=>new Garden());this.selected=0;this.count=0;this.locked=false;this.candidate=-1;this.dwell=0;this.spark=null;this.cooldown=false}
 get current(){return this.plots[this.selected]}
 select(i){if(!Number.isInteger(i)||i<0||i>=6)return;this.current.lost();this.selected=i;this.current.lost();this.locked=false;this.dwell=0;this.candidate=-1}
 lost(){this.plots.forEach(p=>p.lost());this.locked=false;this.candidate=-1;this.dwell=0}
 snapshot(){return {version:1,count:this.count,plots:this.plots.map(p=>({stage:p.stage,water:p.water,growth:p.growth}))}}
 update(h,dt){dt=Math.max(0,Math.min(.08,dt));
 this.plots.forEach(p=>{p.raining=false;if(p.stage==='grow'){p.growth=Math.min(1,p.growth+dt/45);if(p.growth>=1)p.stage='harvest'}});
 if(!h){this.lost();this.cooldown=false;return}
 if(this.cooldown){if(!h.pinch&&!h.open)this.cooldown=false;else return}
 if(!h.open&&!h.pinch)this.locked=false;
 if(!this.locked){
 const x=(h.aimX??h.x)*1920,y=(h.aimY??h.y)*1080;
 let hit=-1,best=Infinity;PLOTS.forEach((p,i)=>{const d=((x-p.x)/180)**2+((y-p.y)/110)**2;if(d<1.4&&d<best){hit=i;best=d}});
 if(hit!==this.candidate){this.candidate=hit;this.dwell=0}else this.dwell+=dt;
 if(hit>=0&&hit!==this.selected&&this.dwell>=.38)this.select(hit);
 // Wait until the pointing cursor has settled on the chosen soil bed.
 if(hit!==this.selected)return;
 if(h.open||h.pinch)this.locked=true;
 }
 const p=this.current,old=p.stage;
 p.update({...h,x:.5,y:Math.min(.7,h.y)},dt);
 if(p.stage==='done'){this.count+=3;this.spark={plot:this.selected,at:Date.now()};p.reset();this.locked=true;this.cooldown=true;}
 else if(old!==p.stage){p.anchor=null;p.harvestY=null}
 }
}
