/* Optional, delayed visual guidance. No hint appears until ten seconds of inactivity. */
(()=>{
 const delay=10000;
 let lastInput=performance.now(),lastScene=scene,current=null;
 function clear(){document.querySelectorAll('.next-step-glow').forEach(e=>e.classList.remove('next-step-glow'));current=null}
 function reset(){lastInput=performance.now();clear()}
 for(const event of ['pointermove','pointerdown','keydown','wheel'])document.addEventListener(event,reset,{passive:true});
 addEventListener('blur',reset);document.addEventListener('visibilitychange',reset);
 function nextTarget(){
  if(scene==='pantry'){
   const required=recipes[game.customer().want].items;
   const missing=required.find(id=>!s.tray.some(x=>x.id===id)&&!s.batch.items.some(x=>x.id===id));
   if(!missing)return document.querySelector('.pantry-intro [data-action="craft"]');
   return document.querySelector(s.stock[missing]>0?`#shelf [data-take="${missing}"]`:'.pantry-intro [data-action="gather"]');
  }
  if(scene!=='craft')return null;
  if(finished)return document.querySelector('#benchHint');
  const b=s.batch;
  if(b.stir>=1)return document.querySelector('#pourButton');
  if(b.heat>=1)return document.querySelector('#stir');
  const wanted=recipes[game.customer().want].items;const missingWanted=b.items.every(x=>wanted.includes(x.id))&&b.items.length<wanted.length;
  if(b.items.length>=2&&!missingWanted)return document.querySelector('#heatButton');
  if(s.tray.some(x=>x.uid===selected))return document.querySelector('[data-action="add"]');
  if(s.tray.length){const desired=recipes[game.customer().want].items;const item=s.tray.find(x=>desired.includes(x.id)&&!b.items.some(i=>i.id===x.id))||s.tray[0];return document.querySelector(`#tray [data-uid="${item.uid}"]`)}
  return document.querySelector('.cabinet-link');
 }
 setInterval(()=>{
  if(scene!==lastScene){lastScene=scene;reset()}
  if(!['craft','pantry'].includes(scene)||document.hidden||document.querySelector('#modal').open||heating||activeHold||drag){reset();return}
  if(performance.now()-lastInput<delay)return;
  const target=nextTarget();
  if(target?.disabled||!target||target.getClientRects().length===0){clear();return}
  if(current!==target){clear();current=target;target.classList.add('next-step-glow')}
 },180);
})();
