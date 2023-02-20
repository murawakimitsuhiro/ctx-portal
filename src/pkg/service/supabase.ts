import { SupabaseClient, createClient } from '@supabase/supabase-js'

// export const supabase = createClient(VARIABLES.SUPABASE_API_URL, VARIABLES.SUPABASE_KEY)

export class Supabase {
  client: SupabaseClient | null = null

  private static instance: Supabase
  private constructor() {}

  public static shared() {
    if (!this.instance)
      this.instance = new Supabase()

    return this.instance
  }

  public setVariables(url: string, key: string) {
    this.client = createClient(url, key)
  }
}
