import { createClient } from '@supabase/supabase-js'
import { VARIABLES } from '~/variables'

export const supabase = createClient(VARIABLES.SUPABASE_API_URL, VARIABLES.SUPABASE_KEY)
