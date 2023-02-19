import browser from 'webextension-polyfill';
import { useStorageLocal } from '~/composables/useStorageLocal';
import type { CaptureLog } from '~/pkg/entity/capture-log';
// import TesseractService from '~/pkg/service/ocr';

export const capturedLog = useStorageLocal<CaptureLog>(
  'captured-log',
  {
    img: '',
    datetime: new Date(),
    title: '',
    url: '',
    displayText: '',
    inputText: '',
  },
  { listenToStorageChanges: true },
)

// import { createWorker } from 'tesseract.js'

export const captureCurrentTab = async () => {
  // const currentTab = await browser.tabs.query({
  //   active: true,
  //   lastFocusedWindow: true,
  // })
  const queryOptions = { active: true, currentWindow: true }
  const [tab] = await browser.tabs.query(queryOptions)
  const captureImg = await browser.tabs.captureVisibleTab()

  // const displayText = await OCRWorker.shared().recognize(captureImg)
  // const worker = createWorker({
  //   logger: m => console.log(m),
  // });

  // const tsract = new TesseractService()
  // const text = await tsract.recognize(captureImg)
  // console.debug('text ! ', text)

  // Tesseract.recognize(
  //   captureImg, 'eng',
  //   {
  //     logger: m => console.log(m)
  //   }
  // )
  //   .catch (err => {
  //     console.error(err);
  //   })
  //   .then(result => {
  //     console.log(result);
  //   })

  // console.debug(newLog)
  capturedLog.value = {
    img: captureImg,
    url: tab.url ?? '<unk>',
    title: tab.title ?? '<unk>',
    datetime: new Date(),
    displayText: '',
    inputText: '',
  }
  // console.debug(currentTab[0].url)
}

// const { createWorker, OEM, PSM } = Tesseract
//
// class OCRWorker {
//   private static instance: OCRWorker
//   private readonly tesseract: Promise<Tesseract.Worker>
//
//   private constructor() {
//     this.tesseract = createWorker({
//       // eslint-disable-next-line no-console
//       logger: m => console.log(m),
//     }).then((worker) => {
//       worker.load()
//       worker.loadLanguage('jpn')
//       worker.initialize('jpn', OEM.LSTM_ONLY)
//       worker.setParameters({
//         tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
//       })
//       return worker
//     })
//   }
//
//   public static shared(): OCRWorker {
//     if (!OCRWorker.instance)
//       OCRWorker.instance = new OCRWorker()
//
//     return OCRWorker.instance
//   }
//
//   public async recognize(img: string): Promise<string> {
//     const worker = await this.tesseract
//     const { data: { text } } = await worker.recognize(img)
//     return text
//   }
// }
