<script setup lang="ts">
import { capturedLog } from '~/logic'
// import TesseractService from '~/pkg/service/ocr';
//
const title = computed(() => {
  console.debug(capturedLog)
  return capturedLog.value?.title ?? 'no title'
})
// const tsract = new TesseractService()
// const text = await tsract.recognize('hoge')
// console.debug('text ! ', text)
</script>

<template>
  <main class="px-4 py-4 text-gray-700 dark:text-gray-200">
    <h2 class="text-lg font-bold">Debug View {{ title }}</h2>

    <div class="overflow-hidden bg-white shadow sm:rounded-lg my-6">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Latest Captured Log</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ capturedLog.datetime }}</p>
      </div>
      <div class="flex">
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Page title</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ capturedLog.title }}</dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Page url</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ capturedLog.url }}</dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">OCR text</dt>
              <dd class="max-h-60 overflow-scroll mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {{ capturedLog.displayText }}
              </dd>
            </div>
          </dl>
        </div>
        <img :src="capturedLog.img" class="max-w-120 object-contain" alt="extension icon">
      </div>
    </div>
  </main>
</template>
