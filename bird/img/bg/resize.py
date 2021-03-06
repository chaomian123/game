from PIL import Image
import os
import glob
from PIL import ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True
in_dir = os.getcwd()
out_dir = in_dir+' mini'

percent = 0.4
percent = input('请输入缩放比例：')
percent = float(percent)
if not os.path.exists(out_dir): os.mkdir(out_dir)
#图片批处理
def main():
    for files in glob.glob(in_dir+'/*.png'):
        filepath, filename = os.path.split(files)
        im = Image.open(files)
        w, h = im.size
        im = im.resize((int(w*percent), int(h*percent)))
        im.save(os.path.join(out_dir,filename))

if __name__=='__main__':
    main()

print('you succeed.')

