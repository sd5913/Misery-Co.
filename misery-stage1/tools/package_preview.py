from pathlib import Path
import base64,json,re,zipfile
root=Path(__file__).resolve().parents[1]
assets={str(p.relative_to(root)):'data:'+('image/png' if p.suffix=='.png' else 'image/jpeg')+';base64,'+base64.b64encode(p.read_bytes()).decode() for p in (root/'assets').rglob('*') if p.suffix in ('.png','.jpg')}
html=(root/'index.html').read_text().replace('<link rel="stylesheet" href="style.css">','<style>'+(root/'style.css').read_text()+'</style>')
js=(root/'preview.js').read_text().replace('const ASSETS={};','const ASSETS='+json.dumps(assets)+';')
html=html.replace('<script src="preview.js"></script>','<script>'+js+'</script>')
html=html.replace('<script src="town.js"></script>','<script>'+(root/'town.js').read_text()+'</script>')
html=re.sub(r'src="(assets/[^\"]+)"',lambda m:'src="'+assets[m[1]]+'"',html)
(root/'坏心情有限公司-小镇互动版.html').write_text(html)
with zipfile.ZipFile(root.parent/'坏心情有限公司-小镇互动版.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in root.rglob('*'):
  rel=p.relative_to(root)
  if p.is_file() and 'before-town-interaction' not in rel.parts and p.name!='坏心情有限公司-阶段1-直接打开.html':
   z.write(p,'misery-stage1/'+str(rel))
print('Standalone HTML and ZIP created')
