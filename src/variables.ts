interface AppVariables {
  SUPABASE_API_URL: string
  SUPABASE_KEY: string
}

const loadVars = (): AppVariables => {
  // background or content script
  let env: { [key: string]: string } = {}
  if (import.meta.env)
    env = import.meta.env
  else
    env = Object(process.env.VITE)

  return {
    SUPABASE_API_URL: env.VITE_SUPABASE_API_URL as string,
    SUPABASE_KEY: env.VITE_SUPABASE_KEY as string,
  }
}

export const VARIABLES = loadVars()
