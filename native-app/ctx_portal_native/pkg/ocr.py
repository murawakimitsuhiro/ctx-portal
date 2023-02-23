import base64
from functools import reduce
import numpy as np
from PIL import Image
import sys
import pyocr
import pyocr.builders
from io import BytesIO

from pprint import pprint

def image_to_paragraphs(b64_img):
    tools = pyocr.get_available_tools()
    if len(tools) == 0:
        print("No OCR tool found")
        sys.exit(1)
    tool = tools[0]

    im_bytes = base64.b64decode(b64_img.split(',')[-1])
    im_file = BytesIO(im_bytes)
    img = Image.open(im_file)
    lang = 'jpn+eng'

    line_and_word_boxes = tool.image_to_string(
        img, lang=lang,
        builder=pyocr.builders.LineBoxBuilder(tesseract_layout=1)
    )

    paragraphs = list(map(box_to_paragraph, line_and_word_boxes))
    return paragraphs


def box_to_paragraph(box):
    return reduce(lambda acc, b: acc + b.content, box.word_boxes, '')

    

