import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://idqwkijmiyvsuzxfzsyr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkcXdraWptaXl2c3V6eGZ6c3lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzMjAwNDcsImV4cCI6MjAyNzg5NjA0N30.l6V-KbiZ_gb6JDJajnLldvtfSGUOPsZZ9YmfYrbxNMY'
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }