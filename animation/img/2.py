#! /usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from PIL import Image

def main(gif_file):
    png_dir = gif_file[:-4] + '/'
    os.mkdir(png_dir)
    img = Image.open(gif_file)
    try:
        while True:
            current = img.tell()
            img.save(png_dir+str(current)+'.png')
            img.seek(current+1)
    except:
        pass


if __name__=='__main__':
    gif_file = 'attack_2.gif'
    main(gif_file)
