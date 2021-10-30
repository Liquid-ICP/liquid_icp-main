import { createClient } from '@supabase/supabase-js'


export const sendEmail = async (email: string) => {
    const supabaseUrl = `${process.env.SUPABASE_URL}`
    const supabaseKey = `${process.env.SUPABASE_API_KEY}`
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { error } = await supabase
        .from('liquid_icp_news_letter_emails')
        .insert([
            { email: email },
        ])

    if (error) return
}