<script setup lang="ts">
import 'uno.css'

const showModal = ref(false)

function onCloseModal() {
  showModal.value = false
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
        <div class="absolute align-bottom bg-white rounded-8px text-left overflow-hidden shadow-xl transform transition-all -translate-x-1/2 left-1/2 top-10vh w-1080px max-w-screen-90vw dark:bg-gray-800 dark:text-bg-gray-100">
<!--          <div class="relative text-gray-600 focus-within:text-gray-400">-->
          <div class="relative text-gray-600">
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
            <div class="overflow-y-scroll max-h-80vh grid grid-cols-1 gap-4 my-4 px-4">
              <div v-for="i in 10" :key="i" class="bg-slate-50 p-3 rounded-6px">
                <div class="flex items-center">
                  <img class="shrink-0 w-24px h-24px" src="https://developer.chrome.com/images/meta/favicon-32x32.png" alt="captured_image">
                  <p class="shrink-0 mx-2 truncate text-base font-semibold">ベクトル データベース - Google 検索</p>
                  <p class="truncate text-slate-500">
                    https://www.google.com/search?q=%E3%83%99%E3%82%AF%E3%83%88%E3%83%AB+%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9&sxsrf=AJOqlzXqdJNs_di0njQ-apkR0M5rgh-X1A%3A1677500733454&ei=PaH8Y-WyG8ya-AaEkpPwCw&ved=0ahUKEwilxc-a2bX9AhVMDd4KHQTJBL4Q4dUDCA8&uact=5&oq=%E3%83%99%E3%82%AF%E3%83%88%E3%83%AB+%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIHCAAQBBCABDoICAAQogQQsAM6CggAEB4QogQQsAM6BAgAEEM6CQgAEAQQgAQQJToFCAAQgAQ6CQgAEAcQHhDxBDoGCAAQBxAeOgoIABAEEIAEELEDOg0IABAEEIAEELEDEIMBOgsIABAHEAQQHhDxBDoICAAQBxAEEB46CggAEAgQBxAEEB46DAgAEAgQBxAEEB4QD0oECEEYAVC3DljPImDBI2gEcAB4AYABmgOIAckTkgEJMi42LjMuMS4xmAEAoAEByAEFwAEB&sclient=gws-wiz-serp
                  </p>
                </div>
                <p class="truncate mt-2">
                  ベクトルデータベースPinecone を試す| npaka - note,「Pinecone」は、シブルなAPIを提供するフルマネージドなトルデータベ,ースです高性能なペクトル検索アプリケーションを簡単に構築することが,の人はこちらも検索,ベクトル,密トルベクトル,度検索,ベクトル特化型データベースサービスで,一本記事では、マネージド・ベクトル・データベースの「Pinecone」を活用して、,セマンティック・キーワード検索を実施していきます。,あらゆるデータのアクセスを実現するGoogle のベクトル,一ベクトル検索:Google 検索、YouTube、Google Play などを支える技術,来、ステムの情報検索基盤はリレーショナルデータベースと全文検索,非構造化データを高速処理、ベクトルデータベースの.…,一高次元ベクトルデータベースを手がけるがこのほど、シリーズB+で6000,万ドル(約86億円)を調達した。出資を主導したのはサウジアラムコ傘下.…,pdf,化ベルデータベースのための引構造-CORE,川本淳平著一あらまし本論文では,暗号化ベトルデータベースにおいて類似ベクトルを検索,する際の検索結.候補を削減するフィルタリング手法を提案する,9ページ,) flearea,データベース-Vector,A5:SQL(22.09.21公開18.683K):汎用SQL開発環境/ER図ツール(入力補完・SQLのGUI編,集機能を備えるER図も編集可能フリーソフト:4.5.,blog,ベクトル近傍検索技術とは?Google を支える最先端技術と,一ここからは、このトル検索とVertex Matching Engine について深掘り.…,来システムで情報を検索するときは、データベースまたは全文.…,ベクトル類似性検索とは(前)-日経BP,一方法の1つは、個々の楽曲が持つ特徴をいくつかの切り口で数値化し、それぞれの特徴値を組み合わせた「ベクトル」を作成して、データベース
                </p>
              </div>
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
