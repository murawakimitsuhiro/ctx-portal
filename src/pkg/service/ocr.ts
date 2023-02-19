import type { Worker } from 'tesseract.js'
import { PSM, createWorker } from 'tesseract.js'

export default class TesseractService {
  worker: Worker | null = null

  private static instance: TesseractService
  private constructor() {}

  public static shared() {
    if (!this.instance)
      this.instance = new TesseractService()
    return this.instance
  }

  async init() {
    this.worker = await createWorker({
      workerPath: 'https://unpkg.com/tesseract.js@v4.0.1/dist/worker.min.js',
      langPath: browser.runtime.getURL('assets/js/traineddata/'),
      corePath: 'https://unpkg.com/tesseract.js-core@v4.0.1/tesseract-core.wasm.js',
      // eslint-disable-next-line no-console
      logger: m => console.debug('tesserract log : ', m),
    })
    // await this.worker.loadLanguage('eng+jpn')
    // await this.worker.initialize('eng+jpn')
    await this.worker.loadLanguage('jpn')
    await this.worker.initialize('jpn')
    await this.worker.setParameters({ tessedit_pageseg_mode: PSM.AUTO })
  }

  async recognize(imgbase64: string) {
    if (this.worker === null)
      await this.init()
    return await (this.worker as Worker).recognize(imgbase64)
  }

  async terminate() {
    if (this.worker)
      await this.worker.terminate()
  }
}
