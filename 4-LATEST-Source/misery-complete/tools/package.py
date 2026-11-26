from pathlib import Path
import base64,json,re,zipfile
root=Path(__file__).resolve().parents[1]
used={'book-open','prop-cabinet','prop-tray','prop-mortar','bottle-empty','bottle-flowers','bottle-moon','bottle-butterfly','material-rain','material-flower','material-mushroom','material-feather','material-leaf','material-berries','shopkeeper-sheet','shop-characters','residents','cat-reactions'}
paths=list((root/'assets/backgrounds').glob('*.jpg'))+[root/'assets/sprites'/f'{n}.png' for n in sorted(used)]
assets={p.relative_to(root).as_posix():'data:'+('image/png' if p.suffix=='.png' else 'image/jpeg')+';base64,'+base64.b64encode(p.read_bytes()).decode() for p in paths}
html=(root/'index.html').read_text()
css=(root/'style.css').read_text()+'\n'+(root/'motion.css').read_text()
css=re.sub(r"url\(['\"]?(assets/[^'\")]+)['\"]?\)",lambda m:'url("'+assets[m[1]]+'")',css)
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+css+'</style>').replace('<link rel="stylesheet" href="motion.css">','')
for name in ['game.js','orchard.js','ui.js','motion.js','residents.js']:
    script=(root/name).read_text()
    if name=='ui.js':script=script.replace('const ASSETS={};','const ASSETS='+json.dumps(assets)+';')
    html=html.replace(f'<script src="{name}"></script>','<script>'+script+'</script>')
html=re.sub(r'src="(assets/[^"]+)"',lambda m:'src="'+assets[m[1]]+'"',html)
out=root.parent/'开始试玩-居民猫咪版.html'
out.write_text(html)
assert '<script src=' not in html
assert 'src="assets/' not in html
assert "url('assets/" not in html
bundle=root.parent/'发给组员-居民猫咪版.zip'
with zipfile.ZipFile(bundle,'w',zipfile.ZIP_DEFLATED) as z:
    z.write(out,'坏心情有限公司-居民猫咪版/'+out.name)
    z.write(root/'试玩指南.md','坏心情有限公司-居民猫咪版/先看这里-试玩指南.md')
    for p in sorted(root.rglob('*')):
        if p.is_file() and not any(part.startswith('.') or part=='__pycache__' for part in p.relative_to(root).parts):
            z.write(p,'坏心情有限公司-居民猫咪版/开发源码/'+p.relative_to(root).as_posix())
with zipfile.ZipFile(bundle) as z:assert z.testzip() is None
print(out.name,round(out.stat().st_size/1024/1024,1),'MB;',len(assets),'embedded assets; ZIP integrity PASS')
