from pathlib import Path
import base64,json,re,zipfile
root=Path(__file__).resolve().parents[1]
out=root.parent/'坏心情有限公司-花田完整版';out.mkdir(exist_ok=True)
f=root/'field'
field=(f/'index.html').read_text().replace('<link rel="stylesheet" href="style.css">','<style>'+(f/'style.css').read_text()+'</style>')
fjs=(f/'engine.mjs').read_text().replace('export ','')+'\n'+(f/'recognition.mjs').read_text().replace('export ','')+'\n'+(f/'app.mjs').read_text().replace("import {Field,PLOTS,classify} from './engine.mjs';",'').replace("import {loadRecognizer,bounded} from './recognition.mjs';",'')
field=field.replace('<script type="module" src="app.mjs"></script>','<script type="module">'+fjs+'</script>')
for name,mime in [('orchard.jpg','image/jpeg'),('flower.png','image/png')]:
 field=field.replace('assets/'+name,'data:'+mime+';base64,'+base64.b64encode((f/'assets'/name).read_bytes()).decode())
(f/'掌心花田-直接打开.html').write_text(field)
used={'book-open','prop-cabinet','prop-tray','prop-mortar','bottle-empty','bottle-flowers','bottle-moon','bottle-butterfly','material-rain','material-flower','material-mushroom','material-feather','material-leaf','material-berries','shop-characters','residents','cat-smooth','shop-portraits'}
paths=sorted(q for q in (root/'assets/backgrounds').glob('*.jpg') if q.stem not in {'shop','river'})+[root/'assets/sprites'/f'{n}.png' for n in sorted(used)]
assets={p.relative_to(root).as_posix():'data:'+('image/png' if p.suffix=='.png' else 'image/jpeg')+';base64,'+base64.b64encode(p.read_bytes()).decode() for p in paths}
css='\n'.join((root/n).read_text() for n in ['style.css','motion.css','icons.css','garden.css'])
keys={p:'--image-'+str(i) for i,p in enumerate(assets)}
css=re.sub(r"url\(['\"]?(assets/[^'\")]+)['\"]?\)",lambda m:'var('+keys[m[1]]+')',css)
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="style.css">','<style>'+css+'</style>')
for n in ['motion.css','icons.css','garden.css']:html=html.replace(f'<link rel="stylesheet" href="{n}">','')
html=re.sub(r'src="(assets/[^\"]+)"',lambda m:'data-asset="'+m[1]+'"',html)
hydrate='\nObject.entries(ASSETS).forEach(([p,u],i)=>document.documentElement.style.setProperty("--image-"+i,`url("${u}")`));\ndocument.querySelectorAll("[data-asset]").forEach(e=>{e.src=ASSETS[e.dataset.asset]});\ndocument.querySelectorAll(".collector,.town-walker.one").forEach(e=>{e.style.backgroundImage=`url("${ASSETS["assets/sprites/residents.png"]}")`});\n'
for n in ['icons.js','game.js','orchard.js','ui.js','motion.js','residents.js','guidance.js','garden-bridge.js']:
 script=(root/n).read_text()
 if n=='ui.js':script=script.replace('const ASSETS={};','const ASSETS='+json.dumps(assets)+';'+hydrate)
 if n=='garden-bridge.js':script='const FIELD_HTML='+json.dumps(field).replace('<','\\u003c')+';\n'+script
 html=html.replace(f'<script src="{n}"></script>','<script>'+script+'</script>')
(out/'开始游戏.html').write_text(html)
(out/'先看这里.txt').write_text((root/'完整版试玩指南.txt').read_text())
with zipfile.ZipFile(out/'完整源代码.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(root.rglob('*')):
  if p.is_file() and 'assets' not in p.relative_to(root).parts and not any(x.startswith('.') or x=='__pycache__' for x in p.relative_to(root).parts):z.write(p,'misery-complete/'+p.relative_to(root).as_posix())
 for p in paths:z.write(p,'misery-complete/'+p.relative_to(root).as_posix())
 for p in (f/'assets').iterdir():z.write(p,'misery-complete/field/assets/'+p.name)
with zipfile.ZipFile(root.parent/'坏心情有限公司-花田完整版.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in out.iterdir():
  if p.is_file():z.write(p,out.name+'/'+p.name)
with zipfile.ZipFile(root.parent/'坏心情有限公司-花田完整版.zip') as z:assert z.testzip() is None
print('Packaged full game, guide, editable source and ZIP.')
