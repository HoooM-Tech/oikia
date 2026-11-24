"""Export the approved V2 PDF wordmark, standalone O and colour values.

Usage: python scripts/sync_brand.py /path/to/"Logo 2 direction V2.pdf"
Requires PyMuPDF only for this optional brand export; the website has no runtime dependencies.
"""
from pathlib import Path
import json, sys, shutil
import fitz

root=Path(__file__).resolve().parents[1]
assets=root/'dist/assets'
source=Path(sys.argv[1])
document=fitz.open(source)
drawings=document[0].get_drawings()

def path(drawing, colour):
    commands=[]
    last=None
    def point(p): return f'{p.x:.5f},{p.y:.5f}'
    for item in drawing['items']:
        kind=item[0]
        if kind=='re':
            r=item[1]
            commands.append(f'M{r.x0},{r.y0}H{r.x1}V{r.y1}H{r.x0}Z')
            last=None
        elif kind in ('l','c'):
            if last is None or abs(item[1]-last)>.0001:
                commands.append('M'+point(item[1]))
            if kind=='l':
                commands.append('L'+point(item[2]))
                last=item[2]
            else:
                commands.append('C'+' '.join(point(p) for p in item[2:]))
                last=item[-1]
        else:
            raise ValueError('Unexpected vector command: '+kind)
    if drawing['closePath']: commands.append('Z')
    rule='evenodd' if drawing['even_odd'] else 'nonzero'
    return f'<path fill="{colour}" fill-rule="{rule}" d="{" ".join(commands)}"/>'

def hex_colour(drawing):
    return '#'+''.join(f'{round(c*255):02x}' for c in drawing['fill'])

letters=[d for d in drawings if 35<d['rect'].y0<36.5 and d['rect'].y1<58 and 40<d['rect'].x0<124]
assert len(letters)==5
o=next(d for d in letters if d['rect'].x0<41)
logo_ink=hex_colour(o)
names=['black','cream','stone','lime','charcoal','electric-blue','orange','sage','yellow']
swatches={name:hex_colour(drawings[i]) for name,i in zip(names,range(71,80))}
application_blue=hex_colour(drawings[24])
for name,colour in [('wordmark',logo_ink),('wordmark-white','#ffffff')]:
    paths=''.join(path(d,colour) for d in letters)
    (assets/(name+'.svg')).write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="40 35 84 23">'+paths+'</svg>')
for name,colour in [('mark',logo_ink),('mark-white','#ffffff'),('mark-lime',swatches['lime'])]:
    (assets/(name+'.svg')).write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="40 35 23 23">'+path(o,colour)+'</svg>')
(assets/'wordmark-paths.txt').unlink(missing_ok=True)
brand={'revision':'2026-11-19','source':'Logo 2 direction V2.pdf','logo_ink':logo_ink,'primary_application_blue':application_blue,'palette':swatches}
(assets/'brand-palette.json').write_text(json.dumps(brand,indent=2)+'\n')
tokens={
    'paper':swatches['cream'],'ink':swatches['black'],'logo-ink':logo_ink,
    'muted':swatches['charcoal'],'line':swatches['stone'],'stone':swatches['stone'],
    'lime':swatches['lime'],'blue':application_blue,'electric-blue':swatches['electric-blue'],
    'orange':swatches['orange'],'sage':swatches['sage'],'yellow':swatches['yellow'],
    'charcoal':swatches['charcoal'],'white':'#ffffff'
}
css='/* Final approved identity: Logo 2 direction V2.pdf — 19 November 2026. */\n:root{\n'
css+=''.join('  --'+name+':'+value+';\n' for name,value in tokens.items())
css+='}\n'
(assets/'brand.css').write_text(css)
shutil.copy2(source,assets/'brand-direction-v2.pdf')
print(json.dumps(brand,indent=2))
