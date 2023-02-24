import base64
from functools import reduce
import numpy as np
from PIL import Image
import sys
import pyocr
import pyocr.builders
from io import BytesIO

from pprint import pprint

confidence_threshold = 85

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
    def concat_box(acc, box):
        if box.confidence < confidence_threshold:
            return acc
        # return acc + f'({box.confidence}) {box.content}\n'
        return acc + box.content

    return reduce(concat_box, box.word_boxes, '')

    
# debug
if __name__ == '__main__':
    img = Image.open('dummy/test.png')
    im_file = BytesIO()
    img.save(im_file, format="png")
    im_bytes = im_file.getvalue()  # im_bytes: image in binary format.
    im_b64 = base64.b64encode(im_bytes)
    # print(image_to_paragraphs(im_b64))
    pprint(image_to_paragraphs('data:image/png;base64,' + im_b64.decode('utf-8')))
