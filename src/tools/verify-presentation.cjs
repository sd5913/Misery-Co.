const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const runtime=['game.js','ui.js','icons.js','orchard.js','residents.js','guidance.js','motion.js','garden-bridge.js','index.html','style.css','motion.css','icons.css','garden.css','field/app.mjs','field/engine.mjs','field/recognition.mjs','field/index.html','field/style.css'];
for(const name of runtime)assert(!/[\u3400-\u9fff]/u.test(fs.readFileSync(path.join(root,name),'utf8')),`Untranslated runtime text in ${name}`);
const ui=fs.readFileSync(path.join(root,'ui.js'),'utf8'),css=fs.readFileSync(path.join(root,'icons.css'),'utf8');
assert(ui.includes('asset-${name}'));assert(ui.includes('material-feather-clean.svg'));const feather=fs.readFileSync(path.join(root,'assets/sprites/material-feather-clean.svg'),'utf8');assert(feather.includes('viewBox="0 0 110 185"'));assert(feather.includes('clip-path="url(#feather)"'));
assert(!fs.readFileSync(path.join(root,'motion.css'),'utf8').includes('@keyframes resident-orchard-bend'));
let frame;const callbacks={};
function node(){const classes=new Set();return {style:{setProperty(){}},dataset:{},hidden:false,innerHTML:'',textContent:'',classList:{add(...x){x.forEach(v=>classes.add(v))},remove(...x){x.forEach(v=>classes.delete(v))},contains:x=>classes.has(x),toggle(x,on){if(on)classes.add(x);else classes.delete(x)}},setAttribute(){},addEventListener(){}}}
const nodes=new Map();const get=s=>{if(!nodes.has(s))nodes.set(s,node());return nodes.get(s)};
const g=require('../game.js').make();const env={scene:'gather',s:g.s,game:g,document:{hidden:false,querySelector:get,addEventListener:(type,fn)=>callbacks[type]=fn},matchMedia:()=>({matches:false}),performance:{now:()=>0},requestAnimationFrame:fn=>frame=fn,setTimeout(){},art:()=>'<img>',materials:require('../game.js').materials,toast(){},save(){},renderProgress(){},renderHud(){},stagePoint:()=>({x:0,y:0}),suppressClick:false};
const ctx=vm.createContext(env);vm.runInContext(fs.readFileSync(path.join(root,'orchard.js'),'utf8')+'\nthis.testOrchard=Orchard',ctx);
ctx.testOrchard.init();ctx.testOrchard.enter();ctx.testOrchard.open('flower');
const walk=new Set();for(let t=0;t<=6000;t+=50){frame(t);const el=get('#collector');assert(['0','1','2','3'].includes(el.dataset.frame));if(el.classList.contains('moving')){walk.add(el.dataset.frame);assert(['1','2'].includes(el.dataset.frame))}}
assert.equal(get('#collector').classList.contains('collecting'),true);assert(walk.size===2);
const poses=new Set();for(let t=6050;t<=10000;t+=50){frame(t);poses.add(get('#collector').style.backgroundPosition)}assert.equal(poses.size,1,'Collection must never slide between atlas cells');assert.equal(get('#collector').dataset.frame,'3');
ctx.testOrchard.cancel();frame(10050);assert.equal(get('#collector').dataset.frame,'0');
assert.equal(g.s.stock.flower,3,'Animation changes do not award resources');
console.log('PASS: English runtime text, feather viewport rule, discrete walk frames, stable collecting pose, cancel-to-idle, unchanged inventory');
