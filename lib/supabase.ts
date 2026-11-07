import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://apnkghwyefcoyszgeemv.supabase.co'
const supabaseAnonKey = 'sb_publishable_zWowxDzOySX4yVbj50I5bw_BAVyrdVA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)