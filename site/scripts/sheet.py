import sys, glob
from PIL import Image
pat, out, sc, cols = sys.argv[1], sys.argv[2], float(sys.argv[3]), int(sys.argv[4])
fs = sorted(glob.glob(pat)); ims = [Image.open(f) for f in fs]
ims = [i.resize((int(i.width*sc), int(i.height*sc))) for i in ims]
W = max(i.width for i in ims); H = max(i.height for i in ims); rows = (len(ims)+cols-1)//cols
o = Image.new('RGB', (W*cols, H*rows), 'white')
for k, i in enumerate(ims): o.paste(i, ((k%cols)*W, (k//cols)*H))
o.save(out)
