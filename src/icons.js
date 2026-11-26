/* Small ink icons are code-native UI, keeping the supplied scene artwork intact. */
function icon(name){const shapes={
 day:'<rect x="5" y="7" width="26" height="24" rx="3"/><path d="M5 14h26M12 4v7M24 4v7M11 20h3m5 0h3m-11 6h3m5 0h3"/>',
 coin:'<ellipse cx="18" cy="12" rx="12" ry="5"/><path d="M6 12v7c0 7 24 7 24 0v-7M6 19v6c0 7 24 7 24 0v-6M12 12h12"/>',
 heart:'<path d="M18 30C-6 16 9 0 18 12 27 0 42 16 18 30Z"/>',
 shop:'<path d="M5 15h26L27 6H9ZM8 17v15h20V17M15 32V22h7v10M4 15c0 6 7 6 7 0 0 6 7 6 7 0 0 6 7 6 7 0 0 6 7 6 7 0"/>',
 town:'<path d="M4 32V18l8-7 7 7v14M18 32V8l7-5 7 5v24M8 32v-8h5v8M24 11h3m-3 6h3m-3 6h3M2 33h32"/>',
 fire:'<path d="M19 3c5 9-2 9 5 14l3-6c13 19-6 25-14 20C-2 22 10 13 12 9c-1 7 1 9 3 10-1-9 6-9 4-16Z"/>',
 stir:'<path d="M7 9c-10 19 20 27 24 8M31 17v8m0-8h-8M25 4 14 25"/><ellipse cx="12" cy="28" rx="6" ry="3"/>',
 pour:'<path d="m8 7 13-3 6 19-13 3ZM25 7h6v9h-3M10 12 3 16l10 4M31 25c8 9-2 10-2 5Z"/>',
 bottle:'<path d="M13 4h10v9l7 8v9c0 4-24 4-24 0v-9l7-8ZM11 4h14M11 23h14"/>',
 cabinet:'<rect x="5" y="3" width="26" height="30" rx="2"/><path d="M6 14h24M6 24h24M12 7v4m11-4v4M11 18h5m6 0h4M12 27v3m10-3v3"/>',
 book:'<path d="M18 8C13 3 6 4 3 6v25c5-3 10-3 15 0 5-3 10-3 15 0V6c-4-2-10-3-15 2v23M7 12h6m-6 6h6m10-6h6m-6 6h6"/>',
 moon:'<path d="M27 4A15 15 0 1 0 32 26 17 17 0 0 1 27 4Z"/>',
 arrow:'<path d="M5 18h25M20 7l11 11-11 11"/>',
 back:'<path d="M31 18H6M16 7 5 18l11 11"/>',
 plus:'<path d="M18 6v24M6 18h24"/>',
 check:'<path d="m6 18 8 9L31 8"/>',cross:'<path d="m8 8 20 20M28 8 8 28"/>',
 scroll:'<path d="M10 5h20v23H11M10 5C1 5 1 13 10 13V5ZM11 13v15C2 28 2 35 11 33h14M16 13h9m-9 6h9"/>',
 cloud:'<path d="M8 22a7 7 0 0 1 0-14 9 9 0 0 1 16 0c12-1 12 14 4 14ZM10 27l-2 5m11-5-2 5m11-5-2 5"/>',
 filter:'<path d="M4 5h28L21 20v10l-6 3V20Z"/>',
 help:'<path d="M12 10c0-10 18-10 15 1-2 5-9 4-9 12M18 29v2"/>',
 person:'<circle cx="18" cy="10" r="6"/><path d="M6 32v-5c0-13 24-13 24 0v5ZM13 22v10m10-10v10"/>',
 tree:'<path d="M18 33V17m0 9-8-8m8 3 8-8M18 4 5 18h7L6 26h24l-6-8h7Z"/>'};return `<svg class="ink-icon" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name]||shapes.check}</svg>`}
function renderHud(){document.querySelector('#hud').innerHTML=[['day',s.day,'Day'],['coin',s.coins,'coins'],['heart',s.warmth+'%','Warmth']].map(([i,n,t])=>`<span aria-label="${t} ${n}" title="${t}">${icon(i)}<b>${n}</b></span>`).join('')}
function iconsInit(){
 const put=(selector,name,label)=>document.querySelectorAll(selector).forEach(e=>{e.innerHTML=icon(name);e.setAttribute('aria-label',label);e.title=label});
 put('[data-action="help"]','help','Guide');put('[data-action="settle"]','moon','Close Shop');
 put('#mainNav [data-scene="shop"]','shop','Shop');put('#mainNav [data-scene="craft"]','bottle','Craft');put('#mainNav [data-scene="town"]','town','Town');
 put('[data-action="toCraft"]','bottle','Go to workbench');put('[data-action="pantry"]','cabinet','Cabinet');put('[data-action="recipes"]','book','Recipes');
 put('[data-action="add"]','plus','Add');put('[data-action="clear"]','back','Return ingredients');put('#pourButton','pour','Hold to pour');put('#cork','bottle','Seal bottle');
 put('.pantry-intro [data-action="craft"]','arrow','To workbench');put('.pantry-intro [data-action="gather"]','tree','To orchard');put('[data-action="putBack"]','back','Return to cabinet');
 document.querySelector('#rainSky span').innerHTML=icon('cloud');
 document.querySelector('#rainSky').addEventListener('click',openRain);
 document.querySelectorAll('.town-hotspot').forEach(e=>{const map={hall:'scroll',martha:'person',post:'person',shop:'shop',gather:'tree',gazebo:'fire'};e.querySelector('span:last-child').innerHTML=icon(map[e.dataset.building]);});
 renderHud();
}
let rainCatchFrame=0;
function openRain(){
 Orchard.cancel();cancelAnimationFrame(rainCatchFrame);
 const done=s.harvested.includes('rain');
 modal(`<h2 class="rain-title">Catch rain in a bottle</h2><div class="rain-popup ${done?'caught':''}"><div class="rain-lines" aria-hidden="true"></div><button id="catchRain" aria-label="Catch rain in a bottle" ${done?'disabled':''}><span class="rain-vessel"><span class="rain-fill"></span><span class="rain-neck"></span></span></button><div id="rainReward" role="status">${done?icon('check'):icon('cloud')}</div></div>`);
 if(done)return;
 document.querySelector('#catchRain').addEventListener('click',()=>{const button=document.querySelector('#catchRain');button.disabled=true;let t0=performance.now();function fill(t){if(!document.querySelector('#modal').open||!button.isConnected)return;const f=Math.min(1,(t-t0)/2800);button.style.setProperty('--catch',f);if(f<1){rainCatchFrame=requestAnimationFrame(fill);return}const r=game.harvest('rain');save();render();document.querySelector('#rainReward').innerHTML=r.ok?art('material-rain')+'<b>+3</b>':icon('cross');document.querySelector('.rain-popup')?.classList.add('caught')}rainCatchFrame=requestAnimationFrame(fill)},{once:true});
}
document.addEventListener('DOMContentLoaded',iconsInit);
