'use strict';
const ASSETS={};
const asset=path=>ASSETS[path]||path;
const $=s=>document.querySelector(s);
const materials=[{id:'rain',name:'雨云'},{id:'flower',name:'花朵'},{id:'crystal',name:'水晶'},{id:'leaf',name:'枫叶'},{id:'berries',name:'浆果'},{id:'mushroom',name:'蘑菇'},{id:'feather',name:'羽毛'},{id:'shell',name:'贝壳'},{id:'seaweed',name:'海草'}];
let materialPage=0,bookOpen=true,toastTimer;
function fit(){document.documentElement.style.setProperty('--fit',Math.min(window.innerWidth/1920,window.innerHeight/1080))}window.addEventListener('resize',fit);fit();
document.querySelectorAll('[data-asset]').forEach(button=>{const img=document.createElement('img');img.src=asset(`assets/sprites/${button.dataset.asset}.png`);img.alt='';img.draggable=false;button.appendChild(img)});
function turnMaterials(direction){materialPage=(materialPage+direction+3)%3;renderMaterials()}
function renderMaterials(){$('#materialItems').innerHTML=materials.slice(materialPage*3,materialPage*3+3).map((m,i)=>`<button class="material" style="left:${84+i*222}px" aria-label="${m.name}素材预览" onclick="inspectMaterial('${m.id}')"><img src="${asset(`assets/sprites/material-${m.id}.png`)}" alt="${m.name}" draggable="false"><span class="name">${m.name}</span></button>`).join('');$('#materialDots').innerHTML=[0,1,2].map(n=>`<span class="${n===materialPage?'active':''}"></span>`).join('');}
function inspectMaterial(id){const m=materials.find(m=>m.id===id);toast(`${m.name} · 当前为素材排版预览，拖入玻璃瓶将在阶段2实现。`)}
function toggleBook(){bookOpen=!bookOpen;$('#recipeBook').src=asset(`assets/sprites/book-${bookOpen?'open':'closed'}.png`);$('#recipeBook').alt=bookOpen?'原画配方书：三组材料配方':'原画金饰皮革配方书封面';$('.book').classList.toggle('closed',!bookOpen);$('.book').setAttribute('aria-label',bookOpen?'合上配方书':'打开配方书');$('.book-toggle').setAttribute('aria-label',bookOpen?'查看配方书封面':'打开配方书');$('#bookLabel').textContent=bookOpen?'配方手记':'坏心情有限公司 · 配方手记';}
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3400)}
function previewMake(){toast('当前为阶段1视觉确认：尚未接入配方判定，不扣材料、不发金币。')}
function showHelp(){$('#infoBody').innerHTML='<h2>制作工作台 · 视觉确认</h2><p>本阶段检查你提供的原画素材在1920×1080工作台中的尺寸、位置、透明边缘和风格。</p><p>左右箭头可查看三组材料，点击配方书可查看封面。材料拖拽、成功和失败产物将在后续阶段实现。</p><p>这里不读取或修改经营存档。商店与小镇仅用于核对三个场景尺寸，沿用基线背景。</p>';$('#info').showModal()}
function setScene(scene){if(!['shop','craft','town'].includes(scene))return;$('#stage').dataset.scene=scene;$('#background').src=asset(`assets/backgrounds/${scene}.jpg`);$('#craftScene').hidden=scene!=='craft';$('#otherScene').hidden=scene==='craft';$('#otherTitle').textContent=scene==='shop'?'商店视角':'城镇视角';$('#background').alt=scene==='craft'?'原风格手绘魔法工作台':scene==='shop'?'基线手绘商店场景':'基线手绘伪俯视城镇场景';$('#toast').classList.remove('show')}
renderMaterials();
