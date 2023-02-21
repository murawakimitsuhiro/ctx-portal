<script setup lang="ts">
import { captureBrowseQueue } from '~/logic'
import { CaptureBrowse } from '~/pkg/entity/capture-log'
import { supabase } from '~/pkg/service/supabase'

const latestCapture = computed((): CaptureBrowse => {
  return captureBrowseQueue.value[captureBrowseQueue.value.length - 1]
})

const countries = ref<any[]>([])

async function getCountries() {
  const { data } = await supabase.from('countries').select()
  countries.value = data ?? []
}

onMounted(() => {
  // getCountries()
})
</script>

<template>
  <main class="px-4 py-4 text-gray-700 dark:text-gray-200">
    <h2 class="text-lg font-bold">Debug View</h2>
    <div class="overflow-hidden bg-white shadow sm:rounded-lg my-6">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Latest Captured Log</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ latestCapture.datetime }}</p>
      </div>
      <div class="flex">
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Page title</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ latestCapture.document.title }}</dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Page url</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ latestCapture.document.url }}</dd>
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
        <img :src="latestCapture.img" class="max-w-120 object-contain" alt="extension icon">
      </div>
    </div>
  </main>
</template>
