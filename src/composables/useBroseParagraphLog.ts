import { ref } from 'vue'
import type { AppError } from '~/pkg/entity/app-error'
import type { BrowseParagraphLog } from '~/pkg/entity/browse-paragraph-log'
import { supabase } from '~/pkg/service/supabase'

export const useBrowseParagraphLog = () => {
  const logs = ref<BrowseParagraphLog[]>([])
  const err = ref<AppError | null>(null)

  const fetchBrowseParagraphLog = async () => {
    const { data, error } = await supabase
      .rpc('get_browse_paragraph_log')
      .limit(100)
      .order('datetime', { ascending: false })

    logs.value = data
    err.value = error
  }

  supabase
    .channel('any')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'browse_paragraph_logs' }, (_) => {
      fetchBrowseParagraphLog().then()
    })
    .subscribe()

  fetchBrowseParagraphLog().then()

  return { browseParagraphLogs: logs, error: readonly(err) }
}
