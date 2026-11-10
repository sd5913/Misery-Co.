from pathlib import Path
from PIL import Image
import json,hashlib
root=Path(__file__).resolve().parents[1]
atlas=Path('/Users/yangshuhan/Desktop/暖手绘魔法炼金素材图集.png')
im=Image.open(atlas).convert('RGBA')
regions={
'bottle-empty':(40,20,280,375),'bottle-flowers':(285,20,525,375),'bottle-sun':(535,20,775,375),'bottle-moon':(780,20,1025,375),'bottle-roses':(1030,20,1275,375),'bottle-butterfly':(1275,20,1535,375),
'material-rain':(15,390,200,575),'material-flower':(200,390,365,575),'material-crystal':(365,390,515,575),'material-leaf':(515,390,680,575),'material-berries':(680,390,820,575),'material-mushroom':(820,390,985,575),'material-feather':(985,390,1110,575),'material-shell':(1110,390,1235,575),'material-fairy':(1235,390,1365,575),'material-seaweed':(1365,390,1525,575),
'prop-tray':(10,580,490,850),'prop-mortar':(490,575,725,850),'prop-scale':(725,575,1040,850),'prop-tubes':(1040,580,1290,850),'prop-ink':(1310,575,1525,850),
'button-craft':(15,865,350,1005),'button-back':(350,865,655,1005),'button-next':(660,865,990,1005),'button-settings':(990,865,1115,1005),'button-book':(1120,865,1245,1005),'button-help':(1250,865,1375,1005),'button-home':(1380,865,1525,1005)}
manifest={'source':atlas.name,'sourceSha256':hashlib.sha256(atlas.read_bytes()).hexdigest(),'method':'Lossless rectangular crop of original RGBA; pixels and alpha unchanged; no redraw or recolor.','sprites':{}}
for name,box in regions.items():
 crop=im.crop(box);out=root/'assets/sprites'/f'{name}.png';crop.save(out)
 manifest['sprites'][name]={'file':str(out.relative_to(root)),'sourceRect':list(box),'width':crop.width,'height':crop.height,'alphaRange':list(crop.getchannel('A').getextrema())}
for name,filename in [('book-open','魔法配方书插画.png'),('book-closed','华丽金饰皮革书籍插画.png')]:
 p=Path('/Users/yangshuhan/Desktop')/filename;book=Image.open(p).convert('RGBA');box=book.getchannel('A').point(lambda x:255 if x>16 else 0).getbbox();crop=book.crop(box);out=root/'assets/sprites'/f'{name}.png';crop.save(out);manifest['sprites'][name]={'file':str(out.relative_to(root)),'source':filename,'sourceRect':list(box),'sourceSha256':hashlib.sha256(p.read_bytes()).hexdigest(),'width':crop.width,'height':crop.height,'alphaRange':list(crop.getchannel('A').getextrema())}
(root/'assets/manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
print('Extracted',len(manifest['sprites']),'original RGBA sprites.')
