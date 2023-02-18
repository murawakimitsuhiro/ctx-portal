import { useStorageLocal } from '~/composables/useStorageLocal'
import type { CaptureLog } from '~/pkg/entity/capture-log'

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
