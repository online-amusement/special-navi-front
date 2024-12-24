// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    dev: process.env.API_URL !== 'production',
    public: {
      apiUrl: process.env.API_URL
    },
  },
  devServer: {
    port: 3003,
  },  
  ssr: false,
  compatibilityDate: '2024-12-24',
})