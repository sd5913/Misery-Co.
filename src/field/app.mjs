import {Field,PLOTS,classify} from './engine.mjs';
import {loadRecognizer,bounded} from './recognition.mjs';
const $=id=>document.getElementById(id),canvas=$('art'),c=canvas.getContext('2d');
let game=new Field(readSave());
const EMBED=window.parent!==window;let initialized=!EMBED;
function readSave(){if(window.parent!==window)return null;try{return JSON.parse(localStorage.getItem('misery-hand-field-v1'))}catch{return null}}
function save(){if(mode==='demo'||!initialized)return;if(EMBED){window.parent.postMessage({type:'misery-field-save',snapshot:game.snapshot()},'*');return}try{localStorage.setItem('misery-hand-field-v1',JSON.stringify(game.snapshot()))}catch{}}
let demoPlot=0,demoPhase='seed',demoStepTime=0;
const bg=new Image(),flower=new Image();bg.src='assets/orchard.jpg';flower.src='assets/flower.png';
let hand=null,stream=null,detector=null,mode='idle',last=performance.now(),lastDetect=0,lastVideo=-1,pinched=false,smooth=null,demoTime=0,session=0,errorCount=0;
const messages={seed:['Pinch · Release','Select a bed, then pinch and release to sow'],water:['Open your palm','Open your palm to bring rain, Water this bed'],grow:['Raise your hand slowly','Lift to help it grow; or tend another bed'],harvest:['Pinch · Lift','Pinch and lift, Harvest three flowers']};
let recognitionAbort=null,localModel=null;
function stop(){session++;recognitionAbort?.abort();recognitionAbort=null;$('retry').hidden=true;$('modelLabel').hidden=true;if(stream)stream.getTracks().forEach(t=>t.stop());stream=null;if(detector)detector.close();detector=null;$('video').srcObject=null;hand=null;smooth=null;pinched=false;game.lost();$('camera').disabled=false;$('camera').textContent='Start camera';$('camLabel').hidden=false;$('camLabel').style.display='grid'}
function reset(){game.reset();hand=null;smooth=null;pinched=false;demoTime=0;demoPlot=0;demoPhase='seed';demoStepTime=0;save()}
$('reset').onclick=reset;$('again').onclick=()=>{game.select((game.selected+1)%6)};
let realSnapshot=null;
$('demo').onclick=()=>{if(mode!=='demo')realSnapshot=game.snapshot();save();stop();mode='demo';game=new Field();reset();$('status').textContent='Demo mode · No camera required';$('camLabel').textContent='Playing gesture demo'};
async function recognize(){
 const token=++session;recognitionAbort?.abort();const controller=new AbortController();recognitionAbort=controller;
 $('retry').hidden=true;$('modelLabel').hidden=true;mode='loading';
 try{
 const ready=await loadRecognizer({signal:controller.signal,model:localModel,report:text=>{if(token===session)$('status').textContent=text}});
 if(token!==session){ready.close();return}detector=ready;mode='camera';lastVideo=-1;errorCount=0;$('status').textContent='Hand tracking ready · Show one hand';
 }catch(e){if(token!==session)return;mode='preview';$('status').textContent='Camera is on · '+e.message;$('retry').hidden=false;$('modelLabel').hidden=false;}
}
$('retry').onclick=()=>recognize();
$('modelFile').onchange=async e=>{const file=e.target.files[0];if(!file)return;if(file.size<1000000||file.size>30000000){$('status').textContent='Select the official hand_landmarker.task file';return}localModel=new Uint8Array(await file.arrayBuffer());if(stream)recognize();};
$('camera').onclick=async()=>{
 if(stream||mode==='loading'){stop();mode='idle';$('camLabel').textContent='Camera is off';$('status').textContent='Click Start camera';return}
 if(mode==='demo')game=new Field(EMBED?realSnapshot:readSave());
 stop();mode='loading';const token=session;const current=()=>token===session;
 $('camera').textContent='Cancel';$('camLabel').textContent='Waiting for camera permission';$('status').textContent='Allow camera access in the browser prompt';
 try{
 if(!navigator.mediaDevices?.getUserMedia)throw new Error('Open via localhost or HTTPS Open');
 const media=await bounded(()=>navigator.mediaDevices.getUserMedia({video:{width:640,height:480,facingMode:'user'},audio:false}),30000,'Camera permission timed out, Please retry',m=>m.getTracks().forEach(t=>t.stop()));
 if(!current()){media.getTracks().forEach(t=>t.stop());return}stream=media;$('video').srcObject=stream;
 await bounded(()=>$('video').play(),10000,'Camera video could not play, Stop the camera and try again');
 if(!current())return;
 $('camLabel').style.display='none';$('camera').textContent='Stop camera';$('status').textContent='Camera is on';
 await recognize();
 }catch(e){if(!current())return;stop();mode='idle';$('camLabel').textContent='Camera not ready';$('status').textContent=e.name==='NotAllowedError'?'Camera access was denied, Allow access in the browser’s camera settings':e.name==='NotFoundError'?'No camera found':e.name==='NotReadableError'?'Camera is unavailable, Close other apps using the camera and retry':e.message;}
};
window.addEventListener('pagehide',()=>{stop();mode='idle'});
document.addEventListener('visibilitychange',()=>{hand=null;smooth=null;game.lost()});
function demo(dt){
 demoStepTime+=dt;const p=game.plots[demoPlot];
 if(demoPhase==='seed'&&p.stage!=='seed'||demoPhase==='water'&&p.stage!=='water'||demoPhase==='grow'&&p.stage==='harvest'||demoPhase==='harvest'&&p.stage==='seed'){
 demoPlot++;demoStepTime=0;
 if(demoPlot>=6){demoPlot=0;demoPhase=({seed:'water',water:'grow',grow:'harvest',harvest:'seed'})[demoPhase]}
 game.select(demoPlot);
 }
 const target=PLOTS[demoPlot];let y=.5,pinch=false,open=false;
 if(demoStepTime>.6){
 if(demoPhase==='seed')pinch=demoStepTime<1.4;
 if(demoPhase==='water')open=true;
 if(demoPhase==='grow'){open=true;y=.75-(demoStepTime%2)*.3}
 if(demoPhase==='harvest'){pinch=true;y=.67-Math.min(.4,(demoStepTime-.6)*.18)}
 }
 return {x:target.x/1920,y,aimX:target.x/1920,aimY:target.y/1080,pinch,open};
}
function path(points,fill,stroke='#202527',width=6){c.beginPath();points(c);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.lineJoin='round';c.stroke()}}
function ellipse(x,y,rx,ry,fill,stroke='#202527',width=5){path(p=>p.ellipse(x,y,rx,ry,0,0,Math.PI*2),fill,stroke,width)}
function draw(t){
 c.clearRect(0,0,1920,1080);if(bg.complete&&bg.naturalWidth)c.drawImage(bg,0,0,1920,1080);c.fillStyle='#10292b8f';c.fillRect(0,0,1920,1080);
 const glow=c.createRadialGradient(1090,610,20,1090,610,720);glow.addColorStop(0,'#d9ad5b22');glow.addColorStop(1,'#162c2e00');c.fillStyle=glow;c.fillRect(0,0,1920,1080);
 // Six soil beds sit on the orchard ground. Back row draws before front row.
 PLOTS.forEach((pos,i)=>{
 const p=game.plots[i],x=pos.x,y=pos.y,selected=game.selected===i;
 ellipse(x,y+65,177,43,'#0c1c2377',null);
 path(q=>{q.moveTo(x-158,y-62);q.lineTo(x+141,y-62);q.lineTo(x+175,y+72);q.lineTo(x-178,y+72);q.closePath()},'#594737',selected?'#dfc180':'#282b28',selected?5:6);
 path(q=>{q.moveTo(x-142,y-50);q.lineTo(x+128,y-50);q.lineTo(x+155,y+57);q.lineTo(x-156,y+57);q.closePath()},p.water>.2?'#342f27':'#4e3d2e','#9c8053',2);
 c.strokeStyle='#b0986650';c.lineWidth=2;for(let r=0;r<3;r++){c.beginPath();c.moveTo(x-120,y-25+r*28);c.quadraticCurveTo(x,y-17+r*28,x+126,y-25+r*28);c.stroke()}
 for(let k=0;k<13;k++){ellipse(x+Math.sin(k*9+i)*120,y+Math.cos(k*7)*40,3,1.7,'#b49b6355',null)}
 const g=p.stage==='seed'?0:p.stage==='water'?p.water*.12:Math.max(.12,p.growth);
 for(let j=0;j<3;j++){
 const px=x+(j-1)*85,py=y+(j%2?18:-4),height=25+g*(130+j*12),sw=Math.sin(t*.0018+i+j)*.025+(hand?.open?(hand.x-.5)*.05:0);
 c.save();c.translate(px,py);c.rotate(sw);
 if(g>0){
 path(q=>{q.moveTo(0,0);q.bezierCurveTo(-14,-height*.3,16,-height*.7,0,-height)},null,'#1c2924',8);
 path(q=>{q.moveTo(0,0);q.bezierCurveTo(-14,-height*.3,16,-height*.7,0,-height)},null,'#89916b',4);
 for(let n=0;n<4;n++){const a=(n+1)/6,side=n%2?1:-1,yy=-height*a,sz=(18+g*20)*Math.min(1,g*3);path(q=>{q.moveTo(0,yy+6);q.bezierCurveTo(side*sz*.7,yy-30,side*sz*1.4,yy-20,side*sz,yy-8);q.quadraticCurveTo(side*sz*.45,yy+5,0,yy+6)},n%2?'#7d8961':'#526a51');path(q=>{q.moveTo(0,yy+3);q.lineTo(side*sz*.8,yy-13)},null,'#bcac76',1.4)}
 if(g>.65){const b=(g-.65)/.35;c.save();c.translate(0,-height);c.scale(.3+b*.7,.3+b*.7);if(flower.complete&&flower.naturalWidth)c.drawImage(flower,-40,-56,80,80);c.restore()}
 }else if(p.armed){ellipse(0,-35,4,7,'#e4c784')}
 c.restore();
 }
 // A small ring shows per-bed water/growth without paragraphs.
 if(p.stage==='water'||p.stage==='grow'){
 const value=p.stage==='water'?p.water:p.growth;c.strokeStyle='#132a2a';c.lineWidth=5;c.beginPath();c.arc(x+137,y+57,12,0,7);c.stroke();c.strokeStyle=p.stage==='water'?'#9abdbf':'#d9bf7e';c.beginPath();c.arc(x+137,y+57,12,-Math.PI/2,-Math.PI/2+value*Math.PI*2);c.stroke();
 }
 if(p.raining){c.strokeStyle='#a6c7c7cc';c.lineWidth=2;for(let k=0;k<23;k++){const xx=x-125+(k*43)%250,yy=y-195+(t*.19+k*29)%225;c.beginPath();c.moveTo(xx,yy);c.lineTo(xx-4,yy+13);c.stroke()}}
 if(p.stage==='harvest'){c.fillStyle='#f0d59d';c.font='25px Georgia';c.fillText('✦',x+125,y-70)}
 if(game.spark?.plot===i&&Date.now()-game.spark.at<1800){const a=(Date.now()-game.spark.at)/1800;c.globalAlpha=1-a;c.fillStyle='#ffe4ae';c.font='28px Georgia';c.fillText('✿ +3',x-25,y-150-a*60);c.globalAlpha=1}
 });
 for(let i=0;i<17;i++){const x=500+(i*71)%1050+Math.sin(t*.0005+i)*20,y=280+(i*73)%520+Math.cos(t*.0008+i)*15;ellipse(x,y,1.5,1.5,'#d3b46b66',null)}
 if(hand){const x=(hand.aimX??hand.x)*1920,y=(hand.aimY??hand.y)*1080;ellipse(x,y,hand.pinch?10:19,hand.pinch?10:19,'#edd7a533','#ead19a',2);ellipse(x,y,3,3,'#fff1cd',null)}
 const p=game.current,[title,caption]=messages[p.stage];$('gesture').textContent=title;$('caption').textContent=caption;$('progress').style.width=(p.stage==='water'?p.water:p.stage==='grow'?p.growth:0)*100+'%';
 [...$('steps').children].forEach((el,i)=>el.classList.toggle('active',i===['seed','water','grow','harvest'].indexOf(p.stage)));$('yield').textContent='× '+game.count;$('bedNumber').textContent=(game.selected+1)+' / 6';
 [...$('plots').children].forEach((el,i)=>{el.setAttribute('aria-pressed',i===game.selected?'true':'false');el.setAttribute('aria-label',`Bed ${i+1}, ${({seed:'Empty',water:'Needs water',grow:'Growing',harvest:'Ready to harvest'})[game.plots[i].stage]}`)});
}
PLOTS.forEach((p,i)=>{const b=document.createElement('button');b.textContent=String(i+1);b.style.left=(p.x/1920*100)+'%';b.style.top=((p.y+70)/1080*100)+'%';b.onclick=()=>game.select(i);$('plots').append(b)});
setInterval(save,2000);window.addEventListener('pagehide',save);
function frame(now){const dt=Math.min(.08,(now-last)/1000);last=now;
 if(!document.hidden){
 if(mode==='demo')hand=demo(dt);
 if(mode==='camera'&&detector&&now-lastDetect>50&&$('video').readyState>=2&&$('video').currentTime!==lastVideo){
 lastDetect=now;lastVideo=$('video').currentTime;
 try{const result=detector.detectForVideo($('video'),now);const l=result.landmarks[0];
 if(l){const h=classify(l,pinched);h.aimX=Math.max(0,Math.min(1,(1-l[8].x-.1)/.8));h.aimY=Math.max(0,Math.min(1,(l[8].y-.12)/.76));pinched=h.pinch;if(smooth){h.x=smooth.x*.6+h.x*.4;h.y=smooth.y*.6+h.y*.4;h.aimX=smooth.aimX*.6+h.aimX*.4;h.aimY=smooth.aimY*.6+h.aimY*.4}smooth=h;hand=h;$('status').textContent=h.pinch?'Detected · Pinch':h.open?'Detected · Open palm':'Hand detected'}else{hand=null;smooth=null;pinched=false;$('status').textContent='Keep one whole hand in view'}errorCount=0;
 }catch(e){hand=null;game.lost();if(++errorCount>5){stop();mode='idle';$('status').textContent='Hand tracking stopped, Restart the camera'}}
 }
 const before=game.count;game.update(initialized?hand:null,dt);if(game.count!==before)save();draw(now);
 }requestAnimationFrame(frame)}requestAnimationFrame(frame);

if(EMBED){
 $('reset').hidden=true;
 $('again').textContent='Next bed';
 window.addEventListener('message',event=>{
 if(event.source!==window.parent)return;
 if(event.data?.type==='misery-field-init'){stop();mode='idle';game=new Field(event.data.snapshot);realSnapshot=game.snapshot();initialized=true;$('camLabel').textContent='Camera is off';$('status').textContent='Harvests go into the cabinet';window.parent.postMessage({type:'misery-field-ready'},'*')}
 if(event.data?.type==='misery-field-exit'){save();stop();mode='idle';window.parent.postMessage({type:'misery-field-closed'},'*')}
 });window.parent.postMessage({type:'misery-field-hello'},'*');
}
