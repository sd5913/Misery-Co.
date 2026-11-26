from pathlib import Path
import base64,json,re,zipfile
root=Path(__file__).resolve().parents[1]
outdir=root.parent/'github-upload-icons';outdir.mkdir(exist_ok=True)
used={'book-open','prop-cabinet','prop-tray','prop-mortar','bottle-empty','bottle-flowers','bottle-moon','bottle-butterfly','material-rain','material-flower','material-mushroom','material-feather','material-leaf','material-berries','shop-characters','residents','cat-smooth','shop-portraits'}
paths=sorted(q for q in (root/'assets/backgrounds').glob('*.jpg') if q.stem not in {'shop','river'})+[root/'assets/sprites'/f'{n}.png' for n in sorted(used)]
assets={p.relative_to(root).as_posix():'data:'+('image/png' if p.suffix=='.png' else 'image/jpeg')+';base64,'+base64.b64encode(p.read_bytes()).decode() for p in paths}
css='\n'.join((root/n).read_text() for n in ['style.css','motion.css','icons.css'])
keys={p:'--image-'+str(i) for i,p in enumerate(assets)}
css=re.sub(r"url\(['\"]?(assets/[^'\")]+)['\"]?\)",lambda m:'var('+keys[m[1]]+')',css)
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="style.css">','<style>'+css+'</style>').replace('<link rel="stylesheet" href="motion.css">','').replace('<link rel="stylesheet" href="icons.css">','')
html=re.sub(r'src="(assets/[^\"]+)"',lambda m:'data-asset="'+m[1]+'"',html)
hydrate='\nObject.entries(ASSETS).forEach(([p,u],i)=>document.documentElement.style.setProperty("--image-"+i,`url("${u}")`));\ndocument.querySelectorAll("[data-asset]").forEach(e=>{e.src=ASSETS[e.dataset.asset]});\ndocument.querySelectorAll(".collector,.town-walker.one").forEach(e=>{e.style.backgroundImage=`url("${ASSETS["assets/sprites/residents.png"]}")`});\n'
for n in ['icons.js','game.js','orchard.js','ui.js','motion.js','residents.js','guidance.js']:
 script=(root/n).read_text()
 if n=='ui.js':script=script.replace('const ASSETS={};','const ASSETS='+json.dumps(assets)+';'+hydrate)
 html=html.replace(f'<script src="{n}"></script>','<script>'+script+'</script>')
(root.parent/'github-upload-icons/Misery-Co-Icons.html').write_text(html)
zipout=outdir/'icons-source.zip'
with zipfile.ZipFile(zipout,'w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(root.rglob('*')):
  if p.is_file() and 'assets' not in p.relative_to(root).parts and not any(x.startswith('.') or x=='__pycache__' for x in p.relative_to(root).parts):z.write(p,'misery-icons/'+p.relative_to(root).as_posix())
 for p in paths:z.write(p,'misery-icons/'+p.relative_to(root).as_posix())
with zipfile.ZipFile(zipout) as z:assert z.testzip() is None
for p in sorted(outdir.iterdir()):print(p.name,round(p.stat().st_size/1024/1024,2),'MB')
