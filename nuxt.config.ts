// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head: {
      title: "special-navi",
      style: [{ children: "body { margin: 0px; }" }],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href:"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" },
        { href: 'https://fonts.googleapis.com/icon?family=Material+Icons', rel: 'stylesheet' },
      ],
    },
  },
  modules: ['@sidebase/nuxt-auth'],
  auth: {
    //globalAppMiddleware: true,
    provider: {
      type: 'local',
      /*pages: {
        login: '/',
      },*/
      endpoints: {
        signIn: { path: "/login", method: "post"},
        signOut: { path: "/logout", method: "get" },
        getSession: { path: "/me", method: "post"},
      },
      token: {
        // signInResponseTokenPointer: '/token', // レスポンスJSON内のtokenのキー
        type: "Bearer",
        headerName: 'Authorization', // Authorization
        maxAgeInSeconds: 60 * 60 * 24 // バックエンドと同じか長くしないと不整合な状態になる（フロントが未ログイン、バックエンドがログイン中）
      },
    },
  },
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