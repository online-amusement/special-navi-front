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
    apiToken: string,
    postalCode: string,
    address: string,
    address2: string,
    address3: string,
    tel: number
}

//APIメソッド呼び出し

//仮登録
const temporaryRegistration = (data: Member) => {
    return useFetch(domain + "/member/temporary-registration", {
        method: "POST",
        body: {
            email: data.email
        }
    })
}
//新規会員登録
const officialRegistration = (data: Member) => {
    return useFetch(domain + "/member/official-registration", {
        method: "POST",
        body: {
            name: data.name,
            passsword: data.password,
            apiToken: data.apiToken,
            postalCode: data.postalCode,
            address: data.address,
            address2: data.address2,
            address3: data.address3,
            tel: data.tel
        }
    })
}
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
//住所検索
const searchAddress = (data: Member) => {
    return useFetch(domain + "/member/search-address", {
        method: "POST",
        body: {
            postalCode: data.postalCode
        }
    })
}

export {
    login,
    temporaryRegistration, 
    officialRegistration,
    searchAddress
}

