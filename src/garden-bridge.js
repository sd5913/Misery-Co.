'use strict';
const GardenBridge=(()=>{
 const overlay=document.querySelector('#gardenOverlay'),frame=document.querySelector('#gardenFrame'),status=document.querySelector('#gardenConnection');let opened=false,ready=false,returnScene='town',closeTimer;
 function send(data){frame.contentWindow?.postMessage(data,'*')}
 function init(){send({type:'misery-field-init',snapshot:s.garden})}
 function close(){clearTimeout(closeTimer);opened=false;overlay.hidden=true;frame.src='about:blank';frame.removeAttribute('srcdoc');ready=false;setScene(returnScene);save()}
 function open(){if(s.garden)game.syncGarden(s.garden);save();returnScene=scene;document.querySelector('#leaveGarden').textContent='← '+(titles[scene]||'Back');cancelInput();heating=false;renderProgress();overlay.hidden=false;opened=true;ready=false;status.textContent='Opening the garden…';
 if(typeof FIELD_HTML==='string')frame.srcdoc=FIELD_HTML;else frame.src='field/garden-standalone.html';
 }
 document.querySelector('#leaveGarden').onclick=()=>{if(!ready){close();return}status.textContent='Saving the garden…';send({type:'misery-field-exit'});closeTimer=setTimeout(()=>{status.textContent='The garden is not responding, Click Back again. Closing the garden stops the camera. ';ready=false},4000)};
 window.addEventListener('message',event=>{
 if(event.source!==frame.contentWindow||!opened)return;
 const d=event.data;if(!d||typeof d!=='object')return;
 if(d.type==='misery-field-hello')init();
 if(d.type==='misery-field-ready'){ready=true;status.textContent='';}
 if(d.type==='misery-field-save'){
 const result=game.syncGarden(d.snapshot);if(!result.ok){status.textContent=result.message;return}
 save();render();status.textContent=result.deposited?'✿ +'+result.deposited+' → Cabinet':result.pending?'Cabinet full, Extra flowers kept safely':'';
 }
 if(d.type==='misery-field-closed')close();
 });
 return {open};
})();
