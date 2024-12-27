import * as Member from "~/entities/Member";
let domain = "http://local.navi/api";

//headerにトークン付与
const headers = computed(() => {
    const tokenString = localStorage.getItem("auth.token")

    return new Headers({
        Authorization: "Bearer " + tokenString
    })
})

//型定義

type Member = {
    id: number,
    name: string,
    email: string,
    password: string,
    postal_code: string,
    tel: number
}

//APIメソッド呼び出し

//仮登録

//新規会員登録

//ログイン
const login = (data: Member) => {
    return useFetch(domain + "/login", {
        method: "POST",
        body: {
            email: data.email,
            password: data.password

        }
    })
}

export {
    login
}

