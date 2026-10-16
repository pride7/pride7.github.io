<script lang="ts">
import { onDestroy } from 'svelte'
import { url } from '@utils/url-utils.ts'
import { i18n } from '@i18n/translation'
import I18nKey from '@i18n/i18nKey'
import Icon from '@iconify/svelte'

type SearchResult = {
  url: string
  meta: { title?: string }
  excerpt: string
}

type Pagefind = {
  options: (options: { excerptLength: number }) => Promise<void>
  search: (keyword: string) => Promise<{
    results: { data: () => Promise<SearchResult> }[]
  }>
}

let keyword = ''
let result: SearchResult[] = []
let status: 'idle' | 'loading' | 'ready' | 'error' = 'idle'
let requestId = 0
let pagefindPromise: Promise<Pagefind> | undefined

function loadPagefind(): Promise<Pagefind> {
  if (!pagefindPromise) {
    const scriptUrl = url('/pagefind/pagefind.js')
    pagefindPromise = import(/* @vite-ignore */ scriptUrl)
      .then(async (pagefind: Pagefind) => {
        await pagefind.options({ excerptLength: 20 })
        return pagefind
      })
      .catch(error => {
        pagefindPromise = undefined
        throw error
      })
  }
  return pagefindPromise
}

function closePanel() {
  document.getElementById('search-panel')?.classList.add('float-panel-closed')
}

async function search(value: string, isDesktop: boolean) {
  const currentRequest = ++requestId
  const query = value.trim()
  result = []
  status = 'idle'

  if (!query) {
    if (isDesktop) closePanel()
    return
  }

  document.getElementById('search-panel')?.classList.remove('float-panel-closed')
  status = 'loading'
  try {
    const pagefind = await loadPagefind()
    const response = await pagefind.search(query)
    const matches = await Promise.all(response.results.map(item => item.data()))
    // A slower response must not replace results for a newer query.
    if (currentRequest !== requestId) return
    result = matches
    status = 'ready'
  } catch (error) {
    if (currentRequest !== requestId) return
    status = 'error'
    console.error('Search could not be loaded:', error)
  }
}

function handleInput(event: Event, isDesktop: boolean) {
  keyword = (event.currentTarget as HTMLInputElement).value
  void search(keyword, isDesktop)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closePanel()
}

function togglePanel() {
  const panel = document.getElementById('search-panel')
  if (!panel) return
  const isClosed = panel.classList.contains('float-panel-closed')
  panel.classList.toggle('float-panel-closed')
  if (isClosed) document.getElementById('search-input-mobile')?.focus()
}

onDestroy(() => {
  requestId++
})
</script>

<div id="search-bar" class="hidden lg:flex transition-all items-center h-11 mr-2 rounded-lg
      bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06]
      dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10">
    <Icon icon="material-symbols:search" class="absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30" />
    <input type="search" placeholder={i18n(I18nKey.search)} aria-label={i18n(I18nKey.search)}
           aria-controls="search-panel" bind:value={keyword}
           on:input={event => handleInput(event, true)} on:focus={() => search(keyword, true)} on:keydown={handleKeydown}
           class="transition-all pl-10 pr-3 text-sm bg-transparent outline-0
           h-full w-40 active:w-60 focus:w-60 text-black/50 dark:text-white/50">
</div>

<button on:click={togglePanel} aria-label="Search Panel" aria-controls="search-panel" id="search-switch"
        class="btn-plain scale-animation lg:!hidden rounded-lg w-11 h-11 active:scale-90">
    <Icon icon="material-symbols:search" class="text-[1.25rem]" />
</button>

<div id="search-panel" class="float-panel float-panel-closed search-panel absolute md:w-[30rem]
     top-20 left-4 md:left-[unset] right-4 shadow-2xl rounded-2xl p-2 max-h-[70vh] !overflow-y-auto">
    <div id="search-bar-inside" class="flex relative lg:hidden transition-all items-center h-11 rounded-xl
         bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06]
         dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10">
        <Icon icon="material-symbols:search" class="absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30" />
        <input id="search-input-mobile" type="search" placeholder={i18n(I18nKey.search)} aria-label={i18n(I18nKey.search)}
               bind:value={keyword} on:input={event => handleInput(event, false)} on:keydown={handleKeydown}
               class="pl-10 pr-3 w-full h-full text-sm bg-transparent outline-0 text-black/50 dark:text-white/50">
    </div>

    <div role="status" aria-live="polite" class="text-sm text-50">
        {#if status === 'loading'}
            <p class="px-3 py-3">正在搜索…</p>
        {:else if status === 'error'}
            <p class="px-3 py-3">搜索暂时不可用，请稍后重试。</p>
        {:else if status === 'ready' && !result.length}
            <p class="px-3 py-3">没有找到相关文章，试试其他关键词。</p>
        {:else if status === 'idle'}
            <p class="px-3 py-3">输入关键词搜索文章。</p>
        {/if}
    </div>

    {#each result as item}
        <a href={item.url} on:click={closePanel}
           class="transition first-of-type:mt-2 lg:first-of-type:mt-0 group block
           rounded-xl text-lg px-3 py-2 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)]">
            <div class="transition text-90 inline-flex font-bold group-hover:text-[var(--primary)]">
                {item.meta.title || i18n(I18nKey.untitled)}<Icon icon="fa6-solid:chevron-right" class="transition text-[0.75rem] translate-x-1 my-auto text-[var(--primary)]" />
            </div>
            <div class="transition text-sm text-50">
                {@html item.excerpt}
            </div>
        </a>
    {/each}
</div>
