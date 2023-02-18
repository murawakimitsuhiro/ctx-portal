import { useStorageLocal } from '~/composables/useStorageLocal'

export const storageDemo = useStorageLocal(
  'webext-demo',
  'Storage Demo',
  { listenToStorageChanges: true },
)

export const capturedImg = useStorageLocal(
  'capturedImg',
  'Storage Demo',
  { listenToStorageChanges: true },
)
