const VERSION='0.10.21';
export const providers=[
 {module:`https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${VERSION}/vision_bundle.mjs`,wasm:`https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${VERSION}/wasm`},
 {module:`https://unpkg.com/@mediapipe/tasks-vision@${VERSION}/vision_bundle.mjs`,wasm:`https://unpkg.com/@mediapipe/tasks-vision@${VERSION}/wasm`}
];
export async function bounded(work,ms,label,onLate=()=>{}){
 let expired=false,timer;
 const pending=Promise.resolve().then(work);
 pending.then(value=>{if(expired)onLate(value)},()=>{});
 try{return await Promise.race([pending,new Promise((_,reject)=>{timer=setTimeout(()=>{expired=true;reject(new Error(label))},ms)})])}finally{clearTimeout(timer)}
}
export async function fetchModel(report,signal){
 const controller=new AbortController();const abort=()=>controller.abort();signal.addEventListener('abort',abort,{once:true});
 if(signal.aborted)controller.abort();const timer=setTimeout(abort,22000);
 try{
 report('下载识别模型…');
 const response=await fetch('https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',{signal:controller.signal});
 if(!response.ok)throw new Error(`模型服务器返回 ${response.status}`);
 const reader=response.body.getReader(),chunks=[];let size=0;const total=Number(response.headers.get('content-length'));
 while(true){const {done,value}=await reader.read();if(done)break;chunks.push(value);size+=value.length;report(total?`识别模型 ${Math.round(size/total*100)}%`:`识别模型 ${(size/1048576).toFixed(1)} MB`)}
 const data=new Uint8Array(size);let offset=0;for(const v of chunks){data.set(v,offset);offset+=v.length}return data;
 }catch(e){if(signal.aborted)throw new Error('加载已取消');throw new Error('识别模型下载失败，请重试或选择已下载的模型文件')}
 finally{clearTimeout(timer);signal.removeEventListener('abort',abort)}
}
export async function loadRecognizer({report,signal,model}){
 const bytes=model||await fetchModel(report,signal);
 let lastError;
 for(let i=0;i<providers.length;i++){
 if(signal.aborted)throw new Error('加载已取消');
 const p=providers[i];report(`加载识别引擎 ${i+1}/${providers.length}…`);
 try{
 const d=await bounded(async()=>{
 const {FilesetResolver,HandLandmarker}=await import(p.module);
 if(signal.aborted)throw new Error('加载已取消');
 const files=await FilesetResolver.forVisionTasks(p.wasm);
 const value=await HandLandmarker.createFromOptions(files,{baseOptions:{modelAssetBuffer:bytes},runningMode:'VIDEO',numHands:1,minHandDetectionConfidence:.6,minTrackingConfidence:.6});
 if(signal.aborted){value.close();throw new Error('加载已取消')}return value;
 },18000,'识别引擎加载超时',d=>d?.close());
 return d;
 }catch(e){lastError=e}
 }
 throw new Error('识别引擎加载失败，请检查网络后重试');
}
