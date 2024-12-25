// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@sidebase/nuxt-auth'],
  auth: {
    globalAppMiddleware: true,
    provider: {
      type: 'local',
      pages: {
        login: '/',
      },
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