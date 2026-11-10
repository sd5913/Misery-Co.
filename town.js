'use strict';
// Hotspots are traced in the original 1920×1080 artwork coordinates.
const townBuildings=[
{id:'hall',name:'市政厅',box:[102,204,323,459],shape:'polygon(0% 51%,17% 40%,21% 21%,31% 0%,46% 25%,47% 45%,70% 30%,89% 60%,100% 74%,100% 100%,5% 100%)',story:'钟声替雨巷记下每一天。镇务员把需要关照的居民写在委托簿里。'},
{id:'martha',name:'玛莎婆婆的家',box:[0,595,432,330],shape:'polygon(0% 21%,51% 0%,100% 49%,91% 97%,20% 100%,10% 66%,0% 53%)',story:'“雨又下了一整夜。我把第二只茶杯也摆好了，万一有人来呢。”玛莎把一张干燥的椅子推到炉边。'},
{id:'post',name:'邮差埃德的家',box:[485,307,286,233],shape:'polygon(0% 55%,20% 22%,35% 0%,46% 18%,61% 9%,84% 34%,100% 57%,95% 100%,8% 100%)',story:'“有些信没有回音，也值得好好送到。”埃德正在烘干一封被雨打湿的家书。'},
{id:'tailor',name:'裁缝艾达的家',box:[731,237,222,187],shape:'polygon(0% 48%,16% 14%,33% 23%,59% 0%,91% 44%,100% 100%,5% 100%)',story:'艾达把旧外套上的每一道裂口缝好：“伤口不一定要藏起来，金线也很好看。”'},
{id:'baker',name:'面包师奥托的家',box:[922,245,139,168],shape:'polygon(0% 5%,72% 0%,100% 48%,83% 100%,15% 100%)',story:'窗内的炉火还没熄。奥托说，明早第一份热面包会留给最早出门的人。'},
{id:'shop',name:'坏心情有限公司',box:[793,387,258,207],shape:'polygon(0% 46%,19% 15%,45% 12%,59% 0%,100% 30%,96% 91%,49% 100%,7% 89%)',story:'雨巷十三号。一点坏心情，也有被温柔收藏的位置。'},
{id:'florist',name:'园丁莉娅的家',box:[1100,319,120,146],shape:'polygon(0% 45%,38% 0%,75% 26%,100% 49%,95% 100%,8% 95%)',story:'莉娅没急着让花盛开。她在窗台上写着：“今天先好好活着，就已经很好。”'},
{id:'musician',name:'琴师诺尔的家',box:[1199,299,93,177],shape:'polygon(0% 30%,57% 0%,100% 44%,96% 100%,0% 100%)',story:'诺尔的琴弦有些走调。他仍然每天练习同一首曲子，等一位老朋友回来听。'},
{id:'ferryman',name:'摆渡人伊文的家',box:[1272,370,135,110],shape:'polygon(0% 47%,35% 0%,96% 38%,100% 100%,8% 100%)',story:'“河水总会把人带到新的岸边。”伊文挂起湿漉漉的帽子，给晚归的人留了一盏灯。'},
{id:'archive',name:'旧档案馆',box:[1222,236,125,122],shape:'polygon(0% 40%,38% 0%,93% 30%,100% 100%,8% 100%)',story:'旧档案里夹着许多没有名字的照片。管理员说，每一张笑脸都曾照亮过一条街。'},
{id:'school',name:'雨巷学堂',box:[1340,234,144,122],shape:'polygon(0% 32%,33% 0%,75% 30%,100% 37%,95% 100%,0% 100%)',story:'今天的作业是画下一个让自己安心的地方。孩子们画了许多扇亮着灯的窗。'},
{id:'watch',name:'守桥人的小屋',box:[1479,235,50,107],shape:'polygon(0% 27%,50% 0%,100% 32%,100% 100%,0% 100%)',story:'守桥人每天数经过的脚步声。他说，今夜比昨天多了两个人。'},
{id:'books',name:'河岸书屋',box:[1684,267,136,143],shape:'polygon(0% 41%,35% 0%,78% 14%,100% 48%,95% 100%,0% 100%)',story:'老板在书页间夹了干叶：“读不下去的日子，可以只翻一页。”'},
{id:'inn',name:'晚灯旅舍',box:[1808,254,112,160],shape:'polygon(0% 40%,35% 0%,100% 30%,100% 100%,0% 100%)',story:'旅舍的门口始终有一块干燥的地毯。今晚还有一间靠炉火的空房。'},
{id:'manor',name:'山上的旧庄园',box:[1309,89,549,159],shape:'polygon(0% 86%,15% 47%,20% 44%,22% 5%,25% 50%,30% 0%,34% 49%,43% 47%,49% 18%,55% 55%,70% 55%,81% 23%,95% 38%,100% 100%,0% 100%)',story:'雨雾后的旧庄园还亮着灯。镇上的人说，那是为走失的旅人留的。'},
{id:'gazebo',name:'河畔小亭',box:[1307,474,191,185],shape:'polygon(0% 37%,49% 0%,100% 37%,93% 100%,7% 100%)',story:'雨点落在亭顶，像一段慢慢的伴奏。几把椅子正等着愿意停一停的人。'}
];
const townTasks=[
{id:'neighbours',title:'敲一敲两扇门',text:'雨天里，独居的老人和送信的人都需要一句问候。请走访玛莎婆婆与邮差埃德。',targets:['martha','post']},
{id:'river',title:'河岸的晚灯',text:'替镇务员确认今晚的河岸仍有人守候：走访摆渡人、河岸书屋和晚灯旅舍。',targets:['ferryman','books','inn']}
];
const TOWN_SAVE_KEY='misery-town-visits-v1';
function loadTown(){try{const x=JSON.parse(localStorage.getItem(TOWN_SAVE_KEY));return{accepted:townTasks.filter(t=>x?.accepted?.includes(t.id)).map(t=>t.id),completed:townTasks.filter(t=>x?.completed?.includes(t.id)).map(t=>t.id),visits:townBuildings.filter(b=>x?.visits?.includes(b.id)).map(b=>b.id)}}catch(e){return{accepted:[],completed:[],visits:[]}}}
let townState=loadTown();
function saveTown(){try{localStorage.setItem(TOWN_SAVE_KEY,JSON.stringify(townState));return true}catch(e){return false}}
function taskProgress(task){return task.targets.filter(id=>townState.visits.includes(id)).length}
function mountTown(){
 $('#townBuildings').innerHTML=townBuildings.map(b=>`<button class="town-building ${b.id==='hall'?'municipal':''}" data-building="${b.id}" aria-label="${b.name}" style="left:${b.box[0]}px;top:${b.box[1]}px;width:${b.box[2]}px;height:${b.box[3]}px;--outline:${b.shape}" onclick="openBuilding('${b.id}')"><span class="building-surface"></span><span class="building-name">${b.name}${b.id==='hall'?' · 委托簿':''}</span></button>`).join('');
 updateTownMap();
}
function updateTownMap(){
 const pending=new Set(townTasks.filter(t=>townState.accepted.includes(t.id)&&!townState.completed.includes(t.id)).flatMap(t=>t.targets.filter(id=>!townState.visits.includes(id))));
 document.querySelectorAll('[data-building]').forEach(button=>button.classList.toggle('task-target',pending.has(button.dataset.building)));
 $('#townSummary').textContent=`市政委托 ${townState.completed.length} / ${townTasks.length} · 点击房屋走访`;
}
function openTownDialog(html){$('#townDialogBody').innerHTML=html;if(!$('#townDialog').open)$('#townDialog').showModal()}
function openBuilding(id){
 const b=townBuildings.find(b=>b.id===id);if(!b)return;
 if(id==='hall'){openTownHall();return}
 if(!townState.visits.includes(id))townState.visits.push(id);
 const saved=saveTown();updateTownMap();
 const related=townTasks.filter(t=>townState.accepted.includes(t.id)&&t.targets.includes(id)&&!townState.completed.includes(t.id));
 openTownDialog(`<div class="town-kicker">雨巷来访簿</div><h2>${b.name}</h2><p class="resident-story">${b.story}</p>${related.map(t=>`<p class="visit-progress">已记入委托「${t.title}」 · ${taskProgress(t)} / ${t.targets.length}</p>`).join('')}<p class="town-note">${saved?'这次来访已记下。':'浏览器未允许保存，本次来访仅在当前页面保留。'}</p><div class="town-actions">${id==='shop'?'<button class="paper-button" onclick="leaveTownForShop()">进入商店</button>':''}<button class="paper-button" onclick="openTownHall()">查看市政委托</button></div>`)
}
function openTownHall(){
 openTownDialog(`<div class="town-kicker">雨巷市政厅 · 镇务公告</div><h2>雨天也有人等你敲门</h2><p>委托簿就在钟楼下。领取后，地图会标出还没走访的房屋。</p><div class="town-task-list">${townTasks.map(t=>{
 const done=townState.completed.includes(t.id),accepted=townState.accepted.includes(t.id),n=taskProgress(t),ready=n===t.targets.length;
 return `<article class="town-task"><div class="task-heading"><h3>${t.title}</h3><span>${done?'已完成':accepted?`进行中 · ${n}/${t.targets.length}`:'待领取'}</span></div><p>${t.text}</p><ul>${t.targets.map(id=>`<li>${townState.visits.includes(id)?'✓':'○'} ${townBuildings.find(b=>b.id===id).name}</li>`).join('')}</ul><button class="paper-button" onclick="${done?'':accepted?`submitTownTask('${t.id}')`:`acceptTownTask('${t.id}')`}" ${done||accepted&&!ready?'disabled':''}>${done?'已登记完成':accepted?(ready?'提交委托':'等待走访完成'):'领取委托'}</button></article>`
 }).join('')}</div>`)
}
function acceptTownTask(id){if(!townTasks.some(t=>t.id===id)||townState.accepted.includes(id))return;townState.accepted.push(id);saveTown();updateTownMap();openTownHall()}
function submitTownTask(id){const t=townTasks.find(t=>t.id===id);if(!t||!townState.accepted.includes(id)||townState.completed.includes(id)||taskProgress(t)!==t.targets.length)return;townState.completed.push(id);saveTown();updateTownMap();openTownHall()}
function leaveTownForShop(){$('#townDialog').close();setScene('shop')}
mountTown();
