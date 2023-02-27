<script setup lang="ts">
import 'uno.css'
// import IconAccessibility from '~icons/carbon/accessibility'

const showModal = ref(false)

function onCloseModal() {
  console.debug('onCloseModal')
}

onMounted(() => {
  if (location.hostname === 'drive.google.com' || location.hostname === 'pgeblnnbkphmknghbdodpmkfbgikknbp')
    showModal.value = true
})
</script>

<template>
  <transition name="fade">
    <div v-if="showModal" class="fixed z-99999 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="position relative min-h-screen">
        <div class="fixed inset-0 bg-black bg-opacity-60 transition-opacity" aria-hidden="true" @click="onCloseModal"></div>
        <div class="absolute align-bottom bg-white rounded-5px text-left overflow-hidden shadow-xl transform transition-all -translate-x-1/2 left-1/2 top-10vh w-1080px max-w-screen-90vw dark:bg-gray-800 dark:text-bg-gray-100">
          <div class="relative text-gray-600 focus-within:text-gray-400">
            <div class="p-20px pb-0">
              <i-uil-search width="16" height="16" class="absolute ml-12px mt-10.5px" />
              <input
                id="keywords"
                ref="searchInput"
                v-model="searchWord"
                class="appearance-none w-full py-8px px-8px text-gray-700 leading-tight focus:outline-none box-border bg-white pl-43px text-16px"
                type="search"
                placeholder="Search Documents / Histories / Bookmarks"
                @keydown.stop.exact
                @keypress.stop.exact
                @keyup.stop.exact
                @keypress.ctrl.enter.exact.prevent="onEnterWithControl"
                @keydown.down.prevent="onArrowDown"
                @keydown.up.prevent="onArrowUp"
                @keypress.enter.exact.prevent="onEnter"
                @keydown.ctrl.j.prevent="onArrowDown"
                @keydown.ctrl.k.prevent="onArrowUp"
                @keydown.esc.prevent="onCloseModal"
              >
            </div>
            <div class="overflow-y-scroll max-h-80vh grid grid-cols-2 gap-4 my-4 px-4">
              <div v-for="i in 10" :key="i" class="bg-gray-200">{{i}}</div>
            </diV>
            <div class="flex border-t-1px border-b-0 border-l-0 border-r-0 border-t-gray-200 h-40px justify-between px-20px items-center border-solid text-11px text-gray-500 dark:border-t-gray-700 dark:text-gray-200 rounded-b-5px">
              <div class="flex">
                <p class="mr-10px">
                  <span class="bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-3px px-5px py-4px inline-block mr-3px">↑</span>
                  <span class="bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-3px px-5px py-4px inline-block">↓</span>
                  or
                  <span class="bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-3px px-5px py-4px inline-block mr-3px">Ctrl + n</span>
                  <span class="bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-3px px-5px py-4px inline-block mr-3px">Ctrol + p</span>
                  Navigate,
                </p>
                <p class="mr-10px">
                  <span class="bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-3px px-5px py-4px inline-block mr-3px">Enter</span>Open,
                </p>
                <p>
                  <span class="bg-gray-200 dark:bg-gray-600 dark:text-white rounded-3px px-5px py-4px inline-block mr-3px">Ctrl + Enter</span>
                  Open in new tab
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
