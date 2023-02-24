import base64
from PIL import Image
from io import BytesIO

def dummy_document_b64img(path='dummy/test.png'):
    img = Image.open(path)
    im_file = BytesIO()
    img.save(im_file, format="png")
    im_bytes = im_file.getvalue()  # im_bytes: image in binary format.
    im_b64 = base64.b64encode(im_bytes)
    return 'data:image/png;base64,' + im_b64.decode('utf-8')

def dummy_browse_log(img_path='dummy/test.png'):
    return {
        'document': {
            'title': "福祉資本主義の三つの世界 : 比較福祉国家の理論と動態(ミネルヴァ書房) G.エスピン-アンデルセン著 ; 岡沢憲芙, 宮本太郎監訳 (1990-2001) - murawaki's project",
            'url': 'https://scrapbox.io/murawaki/%E7%A6%8F%E7%A5%89%E8%B3%87%E6%9C%AC%E4%B8%BB%E7%BE%A9%E3%81%AE%E4%B8%89%E3%81%A4%E3%81%AE%E4%B8%96%E7%95%8C_:_%E6%AF%94%E8%BC%83%E7%A6%8F%E7%A5%89%E5%9B%BD%E5%AE%B6%E3%81%AE%E7%90%86%E8%AB%96%E3%81%A8%E5%8B%95%E6%85%8B(%E3%83%9F%E3%83%8D%E3%83%AB%E3%83%B4%E3%82%A1%E6%9B%B8%E6%88%BF)_G.%E3%82%A8%E3%82%B9%E3%83%94%E3%83%B3-%E3%82%A2%E3%83%B3%E3%83%87%E3%83%AB%E3%82%BB%E3%83%B3%E8%91%97_;_%E5%B2%A1%E6%B2%A2%E6%86%B2%E8%8A%99,_%E5%AE%AE%E6%9C%AC%E5%A4%AA%E9%83%8E%E7%9B%A3%E8%A8%B3_(1990-2001)'
        },
        'histories': [],
        'img': dummy_document_b64img(img_path), 
        'timestamp': '2023-02-23 15:00:43.297+00'
    }
    