<script setup lang="ts">
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useBrowseParagraphLog } from '~/composables/useBroseParagraphLog'
import { BrowseParagraphLog } from '~/pkg/entity/browse-paragraph-log'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')
// dayjs.tz.guess()

const { browseParagraphLogs } = useBrowseParagraphLog()

const latestCapture = computed((): BrowseParagraphLog => {
  return browseParagraphLogs.value[0]
})
</script>

<template>
  <main class="px-4 py-4 text-gray-700 dark:text-gray-200">
    <h2 class="text-lg font-bold">Debug View</h2>
    <div v-if="latestCapture" class="overflow-hidden bg-white shadow sm:rounded-lg my-6">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Latest Captured Log</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          {{ dayjs(latestCapture.datetime).tz().format('MM/DD HH:mm:ss') }}
        </p>
      </div>
      <div class="flex">
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Page title</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ latestCapture.document_title }}</dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Page url</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ latestCapture.document_url }}</dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Paragraph (OCR result)</dt>
              <dd class="max-h-60 overflow-scroll mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul role="list" class="divide-y divide-gray-200 rounded-md border border-gray-200">
                  <li v-for="p in latestCapture.paragraphs" class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    {{ p.text }}
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
        <img :src="latestCapture.capture_img" class="max-w-120 object-contain" alt="extension icon">
      </div>
    </div>

    <div class="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
      <header class="px-5 py-4 border-b border-gray-100">
        <h2 class="font-semibold text-gray-800">User Browse Logs</h2>
      </header>
      <div class="p-3">
        <div class="overflow-x-auto">
          <table class="table-auto w-full">
            <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold text-left">Time</div>
                </th>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold text-left">Title</div>
                </th>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold text-left">URL</div>
                </th>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold text-left">image</div>
                </th>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold text-center">paragraphs</div>
                </th>
              </tr>
            </thead>
            <tbody class="text-sm divide-y divide-gray-100">
              <tr v-for="log in browseParagraphLogs">
                <td class="p-2 whitespace-nowrap">
                  <div class="text-left">{{ dayjs(log.datetime).tz().format('DD日 HH:mm:ss') }}</div>
                </td>
                <td class="p-2 whitespace-nowrap">
                  <div class="text-left max-w-xs truncate">{{ log.document_title }}</div>
                </td>
                <td class="p-2 whitespace-nowrap">
                  <div class="text-left w-40 truncate font-medium text-green-500">{{ log.document_url }}</div>
                </td>
                <td class="p-2 whitespace-nowrap">
                  <img class="object-contain h-10 transition-all hover:h-60" :src="log.capture_img" alt="screenshot">
                </td>
                <td class="p-2 whitespace-nowrap max-w-xs overflow-scroll">
                  <div class="text-xs text-left">{{ log.paragraphs.map(p => p.text).join() }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
