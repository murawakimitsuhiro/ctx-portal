from pkg.ocr import image_to_paragraphs


def handle_user_activity(data):
    ocr_paragraphs = image_to_paragraphs(data.get('img'))
    return ('user-activity', {'paragraphs': ocr_paragraphs})