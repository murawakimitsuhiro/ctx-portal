<script setup lang="ts">
import 'uno.css'
import { SearchModalPresenter } from '~/contentScripts/presenters/search-modal'
import type { UUID } from '~/pkg/entity/basic'
import { decodedUrl } from '~/pkg/entity/searched-document'

const { state, action } = SearchModalPresenter()

onMounted(() => {
  // if (location.hostname === 'drive.google.com' || location.hostname === 'pgeblnnbkphmknghbdodpmkfbgikknbp'
  // showModalDomestic.value = true
})

// focus to input when modal open
const searchInput = ref<HTMLInputElement | null>(null)
watch(state.showModal, async(next, _) => {
  await nextTick()
  if (next && searchInput.value)
    searchInput.value.focus()
})

function currentSelectedIndexForDebug(): number {
  for (const [idx, doc] of Object.entries(state.documents.value)) {
    if (doc.isSelected)
      return Number(idx)
  }
  return -1
}
</script>

<template>
  <transition name="fade">
    <div v-if="state.showModal.value" class="fixed z-99999 inset-0 overflow-y-auto text-12px" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="position relative min-h-screen">
        <div class="fixed inset-0 bg-black bg-opacity-60 transition-opacity" aria-hidden="true" @click="action.closeModal()"></div>
        <div class="absolute align-bottom bg-white rounded-8px text-left overflow-hidden shadow-xl transform transition-all -translate-x-1/2 -translate-y-1/2 left-1/2 top-1\/2 w-95vw max-w-screen-90vw dark:bg-gray-800 dark:text-bg-gray-100">
          <div class="relative text-gray-600">
            <div class="p-20px pb-0">
              <i-uil-search width="16" height="16" class="absolute ml-12px mt-10.5px" />
              <input
                id="keywords"
                ref="searchInput"
                class="appearance-none w-full py-8px px-8px text-gray-700 leading-tight border-0 focus:outline-none box-border bg-white pl-43px text-16px"
                type="search"
                placeholder="Search Space"
                :value="state.searchQuery.value"
                @input="action.setSearchQuery($event.target.value)"
                @keydown.stop.exact
                @keypress.stop.exact
                @keyup.stop.exact
                @keydown.enter.meta.exact.prevent="action.openSelectedDoc(true)"
                @keydown.down.prevent="action.setSelectionDown()"
                @keydown.up.prevent="action.setSelectionUp()"
                @keypress.enter.exact.prevent="action.openSelectedDoc()"
                @keydown.ctrl.j.prevent="action.setSelectionDown()"
                @keydown.ctrl.k.prevent="action.setSelectionUp()"
                @keydown.esc.prevent="action.closeModal()"
                @keydown.ctrl.c.prevent="action.closeModal()"
              >
            </div>

<!--            <div>-->
<!--              related page count : {{ state.relatedDocuments.value.length }}-->
<!--              <div v-for="relatedLinks in state.relatedDocuments.value">-->
<!--                links number : {{ Object.keys(relatedLinks) }}-->
<!--              </div>-->
<!--            </div>-->
            <div>
              {{ currentSelectedIndexForDebug() }}
            </div>

            <transition-group name="list" tag="div" class="relative overflow-hidden" :class="{ 'h-75vh': state.documents.value.length > 0}">
<!--            <div class="flex"> -->
              <div
                :key="0" class="
                  absolute overflow-y-scroll h-75vh grid grid-cols-1 gap-1 mt-16px px-16px
                  transition-[width] ease-out duration-300
                "
                :class="{
                  'w-full': !(currentSelectedIndexForDebug() === 2),
                  'w-1/2': currentSelectedIndexForDebug() === 2,
                }"
              >
                <div
                  v-for="doc in state.documents.value" :key="doc.id"
                  class="bg-slate-70 p-12px rounded-6px"
                  :class="{ 'bg-slate-100': doc.isSelected }"
                >
                  <div class="flex items-center">
                    <img class="shrink-0 w-16px h-16px" src="https://developer.chrome.com/images/meta/favicon-32x32.png" alt="captured_image">
                    <p class="mx-8px truncate text-base font-semibold my-0">{{ doc.title }}</p>
                    <p class="shrink-20 min-w-200px truncate text-slate-500 my-0 ml-auto text-right">
                      {{ decodedUrl(doc) }}
                    </p>
                  </div>
                  <p v-if="doc.texts && doc.texts.length > 0" class="truncate my-0 mt-1">
                    {{ doc.texts }}
                  </p>
                </div>
              </diV>

              <!-- dummy -->
              <div v-if="currentSelectedIndexForDebug() === 2"
                   class="absolute overflow-y-scroll h-75vh w-1/2 grid grid-cols-1 gap-1 mt-16px px-16px">
                <div
                  v-for="doc in state.documents.value" :key="doc.id"
                  class="bg-slate-70 p-12px rounded-6px"
                  :class="{ 'bg-slate-100': doc.isSelected }"
                >
                  <div class="flex items-center">
                    <img class="shrink-0 w-16px h-16px" src="https://developer.chrome.com/images/meta/favicon-32x32.png" alt="captured_image">
                    <p class="mx-8px truncate text-base font-semibold my-0">{{ doc.title }}</p>
                    <p class="shrink-20 min-w-200px truncate text-slate-500 my-0 ml-auto text-right">
                      {{ decodedUrl(doc) }}
                    </p>
                  </div>
                  <p v-if="doc.texts && doc.texts.length > 0" class="truncate my-0 mt-1">
                    {{ doc.texts }}
                  </p>
                </div>
              </diV>

<!--              </div>-->
            </transition-group>

<!--            <div v-for="(docs, index) in state.documents.value">-->
<!--            </div>-->

<!--              <div-->
<!--                v-for="doc in state.searchedDocs.value" :key="doc.id"-->
<!--                class="bg-slate-70 p-12px rounded-6px"-->
<!--                :class="{ 'bg-slate-100': isSelectedDoc(doc.id) }"-->
<!--              >-->
            <div class="flex border-t-1px border-b-0 border-l-0 border-r-0 border-t-gray-200 h-40px justify-between px-20px items-center border-solid text-11px text-gray-500 dark:border-t-gray-700 dark:text-gray-200 rounded-b-5px">
              <div class="flex">
                <p class="mr-10px">
                  <span class="bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-3px px-5px py-4px inline-block mr-3px">↑</span>
                  <span class="bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-3px px-5px py-4px inline-block">↓</span>
                  or
                  <span class="bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-3px px-5px py-4px inline-block mr-3px">Ctrl + j</span>
                  <span class="bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-3px px-5px py-4px inline-block mr-3px">Ctrl + k</span>
                  Navigate,
                </p>
                <p class="mr-10px">
                  <span class="bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-3px px-5px py-4px inline-block mr-3px">Enter</span>Open,
                </p>
                <p>
                  <span class="bg-gray-200 dark:bg-gray-600 dark:text-white rounded-3px px-5px py-4px inline-block mr-3px">command + Enter</span>
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

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .1s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}


.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}
/*.slide-enter-to {*/
/*    transition: transform 0.3s ease-out;*/
/*    transform: translateX(0px);*/
/*}*/
/*.slide-enter-from {*/
/*    transform: translateX(250px);*/
/*}*/

/*.slide-leave-to {*/
/*    transition: transform 0.3s ease-out;*/
/*    transform: translateX(250px);*/
/*}*/
/*.slide-leave-from {*/
/*    transform: translateX(0px);*/
/*}*/
</style>
