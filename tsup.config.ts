import { defineConfig } from 'tsup'
import { loadEnv } from 'vite'
import { isDev } from './scripts/utils'

export default defineConfig(() => {
  const nodeEnvMode = isDev ? 'development' : 'production'
  const env = loadEnv(nodeEnvMode, `${process.cwd()}/src`)

  return {
    entry: {
      'background/index': './src/background/index.ts',
      ...(isDev ? { mv3client: './scripts/client.ts' } : {}),
    },
    outDir: 'extension/dist',
    format: ['esm'],
    target: 'esnext',
    ignoreWatch: ['**/extension/**'],
    splitting: false,
    sourcemap: isDev ? 'inline' : false,
    define: {
      '__DEV__': JSON.stringify(isDev),
      'process.env.NODE_ENV': JSON.stringify(nodeEnvMode),
      'process.env.VITE': JSON.stringify(env),
    },
    platform: 'browser',
    minifyWhitespace: !isDev,
    minifySyntax: !isDev,
  }
})
