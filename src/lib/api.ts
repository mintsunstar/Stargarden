import { supabase, isSupabaseConfigured } from './supabase'

type EdgeFunctionName =
  | 'grant-daily-seed'
  | 'confirm-bloom'
  | 'get-daily-insight'
  | 'delete-account'

/** Edge Function 호출 (Supabase 미설정 시 null 반환) */
export async function invokeEdgeFunction<T = unknown>(
  name: EdgeFunctionName,
  body?: Record<string, unknown>,
): Promise<{ data: T | null; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) {
    return { data: null, error: 'SUPABASE_NOT_CONFIGURED' }
  }

  const { data, error } = await supabase.functions.invoke(name, { body: body ?? {} })
  if (error) return { data: null, error: error.message }
  return { data: data as T, error: null }
}
