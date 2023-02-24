import { PostgrestError } from '@supabase/supabase-js'

export interface AppError {
  message: string
  details: string
  hint: string
  code: string
}

export function AppErrorByPostgrestError(error: PostgrestError): AppError {
  return error
}
