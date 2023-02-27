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
        <div class="absolute align-bottom bg-white rounded-5px text-left overflow-hidden shadow-xl transform transition-all -translate-x-1/2 left-1/2 top-10vh w-650px max-w-screen-90vw dark:bg-gray-800 dark:text-bg-gray-100">
          <div class="relative text-gray-600 focus-within:text-gray-400">
            <div class="p-20px pb-0">
              <i-uil-search width="24" height="24" class="absolute ml-12px mt-11px" />
              <input
                  id="keywords"
                  ref="searchInput"
                  v-model="searchWord"
                  class="appearance-none w-full py-12px px-12px text-gray-700 leading-tight focus:outline-none box-border bg-white pl-43px text-16px"
                  type="search"
                  placeholder="Search for.."
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
              <div class="overflow-y-scroll max-h-80vh grid grid-cols-2 gap-4 my-4">
                <div class="bg-gray-200">1</div>
                <div class="bg-gray-200">2</div>
                <div class="bg-gray-200">3</div>
                <div class="bg-gray-200">4</div>
              </diV>
              <!--              <nav class="m overflow-scroll max-h-60vh" role="navigation">-->
              <!--                <template v-if="searchResult.length">-->
              <!--                  <ul class="pl-0">-->
              <!--                    <li-->
              <!--                        v-for="(item, i) in searchResult"-->
              <!--                        :key="i"-->
              <!--                        :ref="el => { if (el) searchResultRefs[i] = el }"-->
              <!--                        :aria-selected="i === selectedNumber"-->
              <!--                        class="block"-->

              <!--                        role="option"-->
              <!--                        :data-tabid="item.tabId"-->
              <!--                        :data-url="item.url"-->
              <!--                        @click="onClick(item.url, item.tabId)"-->
              <!--                    >-->
              <!--                      <button class="p-6px block text-13px flex items-center text-black justify-between border-none w-full cursor-pointer bg-white rounded-5px dark:bg-gray-800 dark:text-gray-200" type="button" :class="{ 'bg-blue-200': i === selectedNumber, 'dark:bg-blue-700': i === selectedNumber }">-->
              <!--                        <span class="flex items-center w-440px">-->
              <!--                          <img :src="item.faviconUrl" alt="" class="w-16px h-16px mr-8px inline-block" />-->
              <!--                          <span class="overflow-hidden block whitespace-nowrap text-over overflow-ellipsis mr-5px">{{ item.title }}</span>-->
              <!--                          <span class="overflow-hidden text-gray-400 text-11px block whitespace-nowrap text-over overflow-ellipsis max-w-200px">-->
              <!--                            {{ item.url }}-->
              <!--                          </span>-->
              <!--                        </span>-->
              <!--                        <span class="px-8px py-3px rounded-5px text-gray-400 bg-gray-100 dark:bg-gray-600 dark:text-gray-200">-->
              <!--                          {{ item.type }}-->
              <!--                        </span>-->
              <!--                      </button>-->
              <!--                    </li>-->
              <!--                  </ul>-->
              <!--                </template>-->
              <!--                <template v-else>-->
              <!--                  <template v-if="searchWord">-->
              <!--                    <ul class="pl-0">-->
              <!--                      <li-->
              <!--                          :ref="el => { if (el) searchResultRefs[0] = el }"-->
              <!--                          :aria-selected="true"-->
              <!--                          class="block rounded-5px"-->
              <!--                          :data-url="`https://www.google.com/search?q=${searchWord}`"-->
              <!--                          role="option"-->
              <!--                          @click="onClick(`https://www.google.com/search?q=${searchWord}`)"-->
              <!--                      >-->
              <!--                        <button class="p-6px block text-13px flex items-center text-black border-none w-full cursor-pointer rounded-5px bg-blue-200 dark:bg-blue-800 dark:text-gray-200" type="button">-->
              <!--                          <img :src="`https://www.google.com/s2/favicons?domain=google.com`" alt="" class="w-16px h-16px mr-8px inline-block" /><span class="overflow-hidden display-block whitespace-nowrap text-over overflow-ellipsis">"{{ searchWord }}" search with google</span>-->
              <!--                        </button>-->
              <!--                      </li>-->
              <!--                    </ul>-->
              <!--                  </template>-->
              <!--                  <template v-else>-->
              <!--                    <div class="flex min-h-15vh w-full justify-center items-center flex-row opacity-40">-->
              <!--                      <div class="mr-10px">-->
              <!--                        <Logo width="45" height="45" class="dark:hidden" />-->
              <!--                        <Logo width="45" height="45" class="hidden dark:block" dark />-->
              <!--                      </div>-->
              <!--                      <p class="text-24px text-black font-bold leading-20px dark:text-gray-100">-->
              <!--                        Chikamichi<br />-->
              <!--                        <span class="text-12px">Fuzzy search for anything</span>-->
              <!--                      </p>-->
              <!--                    </div>-->
              <!--                  </template>-->
              <!--                </template>-->
              <!--              </nav>-->
            </div>
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
