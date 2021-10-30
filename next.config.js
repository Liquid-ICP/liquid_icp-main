const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    SUPABASE_API_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMjE3NDg0MCwiZXhwIjoxOTI3NzUwODQwfQ.xt8h-17q6CarKu4IHUBCmfMWnz-HmKKy7K6xJWnJN9k",
    SUPABASE_URL: "https://elnobfaaxrawlzxgnhlu.supabase.co" 
  }
}
