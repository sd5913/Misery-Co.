'use strict';
const GardenBridge=(()=>{
 const overlay=document.querySelector('#gardenOverlay'),frame=document.querySelector('#gardenFrame'),status=document.querySelector('#gardenConnection');let opened=false,ready=false,returnScene='town',closeTimer;
 function send(data){frame.contentWindow?.postMessage(data,'*')}
 function init(){send({type:'misery-field-init',snapshot:s.garden})}
 function close(){clearTimeout(closeTimer);opened=false;overlay.hidden=true;frame.src='about:blank';frame.removeAttribute('srcdoc');ready=false;setScene(returnScene);save()}
 function open(){if(s.garden)game.syncGarden(s.garden);save();returnScene=scene;document.querySelector('#leaveGarden').textContent='← '+(titles[scene]||'返回');cancelInput();heating=false;renderProgress();overlay.hidden=false;opened=true;ready=false;status.textContent='正在打开花田…';
 if(typeof FIELD_HTML==='string')frame.srcdoc=FIELD_HTML;else frame.src='field/掌心花田-直接打开.html';
 }
 document.querySelector('#leaveGarden').onclick=()=>{if(!ready){close();return}status.textContent='正在保存花田…';send({type:'misery-field-exit'});closeTimer=setTimeout(()=>{status.textContent='花田未响应，请再次点击返回。摄像头会随关闭停止。';ready=false},4000)};
 window.addEventListener('message',event=>{
 if(event.source!==frame.contentWindow||!opened)return;
 const d=event.data;if(!d||typeof d!=='object')return;
 if(d.type==='misery-field-hello')init();
 if(d.type==='misery-field-ready'){ready=true;status.textContent='';}
 if(d.type==='misery-field-save'){
 const result=game.syncGarden(d.snapshot);if(!result.ok){status.textContent=result.message;return}
 save();render();status.textContent=result.deposited?'✿ +'+result.deposited+' → 材料柜':result.pending?'材料柜已满，剩余花朵已保留':'';
 }
 if(d.type==='misery-field-closed')close();
 });
 return {open};
})();
