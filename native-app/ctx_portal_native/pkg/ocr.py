import base64
import re
import sys
import pyocr
import pyocr.builders
import numpy as np
from functools import reduce
from io import BytesIO
from PIL import Image
from pprint import pprint

confidence_threshold = 80

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
    return list(filter(lambda p: len(p) > 0, paragraphs))


def box_to_paragraph(box):
    def concat_box(acc, box):
        if box.confidence < confidence_threshold or len(box.content) == 0:
            return acc
        # return acc + f'({box.confidence}) {box.content}\n'
        return acc + ' ' + box.content

    remove_jpn_space = r'(?<![a-z])\s+(?![a-z])'

    return re.sub(remove_jpn_space, '', reduce(concat_box, box.word_boxes, '')).strip()

    
# debug
if __name__ == '__main__':
    from util.dummy_data import dummy_document_b64img
    img_b64 = dummy_document_b64img('dummy/test_eng.png')
    pprint(image_to_paragraphs(img_b64))
    