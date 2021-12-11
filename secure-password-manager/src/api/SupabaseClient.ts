import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ajhjefmoqaifqwmwcrhi.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDY2MDgxOCwiZXhwIjoxOTUwMjM2ODE4fQ.g-ELbVMYXgpZlJQSjm_Kb7h34Zm5HTcwX6vrl5ZPO8E"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)