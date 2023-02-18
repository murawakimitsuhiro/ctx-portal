<script setup lang="ts">
import { capturedLog } from '~/logic'

// const title = computed(() => {
//   console.debug(capturedLog)
//   return capturedLog.value?.title ?? 'no title'
// })
</script>

<template>
  <main class="px-4 py-4 text-center text-gray-700 dark:text-gray-200">
    <h2>debug view</h2>
    <div class="flex">
      <div>
        <div>{{ capturedLog.title }}</div>
        <div>{{ capturedLog.url }}</div>
      </div>
      <img :src="capturedLog.img" class="max-h-120" alt="extension icon">
    </div>
  </main>
</template>
