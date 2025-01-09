<template>
    <div class="container">
        <div class="title">
            <h2>お客様情報</h2>
        </div>
        <div class="contents">
            <div class="name-contents">
                <label class="name">氏名</label>
                <input v-model="name" type="text">
            </div>
            <div class="error-text-area">
                <span class="error-text">{{ errorMessage.name }}</span>
            </div>
            <div class="password-contents">
                <label class="password">パスワード</label>
                <input v-model="password" type="text">
            </div>
            <div class="error-text-area">
                <span class="error-text">{{ errorMessage.password }}</span>
            </div>
            <div class="postal-code-contents">
                <label class="postal-code">郵便番号</label>
                <input v-model="postalCode" type="text">
            </div>
            <div class="error-text-area">
                <span class="error-text">{{ errorMessage.postalCode }}</span>
            </div>
            <div class="address1-contents">
                <label class="address">住所</label>
                <input v-model="address" type="text">
            </div>
            <div class="error-text-area">
                <span class="error-text">{{ errorMessage.address }}</span>
            </div>
            <div class="address2-contents">
                <label class="address">住所</label>
                <input v-model="address2" type="text">
            </div>
            <div class="error-text-area">
                <span class="error-text">{{ errorMessage.address2 }}</span>
            </div>
            <div class="address3-contents">
                <label class="address">住所</label>
                <input v-model="address3" type="text">
            </div>
            <div class="error-text-area">
                <span class="error-text">{{ errorMessage.address3 }}</span>
            </div>
            <div class="tel-contents">
                <label class="tel">電話番号</label>
                <input v-model="tel" type="text">
            </div>
            <div class="error-text-area">
                <span class="error-text">{{ errorMessage.tel }}</span>
            </div>
            <div class="sent-btn">
                <button @click="infoSent" type="button">送信</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import Response from '~/apis/response';
import * as yup from 'yup';

const urlParams: any = ref([]);
const token = ref('');
const name = ref('');
const password = ref('');
const postalCode = ref();
const address = ref('');
const address2 = ref('');
const address3 = ref('');
const tel = ref();
const errorMessage: any = ref({});

const formData = reactive({
    name,
    password,
    postalCode,
    address,
    address2,
    address3,
    tel
})

onMounted(() =>{
    verifyToken();
})

const verifyToken = (() => {
    const url = location.search
    urlParams.value = url.slice(7);
    console.log(urlParams.value)
    token.value = urlParams.value;
})

watch(postalCode, (newcode) => {
    postalCode.value = newcode
    searchCode()
})

const searchCode = (async () => {
    const res = await Response.searchAddress(postalCode.value)
        address.value = res.data.address
        address.value = address.value
        address2.value = res.data.address2
        address3.value = res.data.address3
        console.log(address, address2, address3)
})

const validateScheme = yup.object().shape({
    name: yup.string().required("※氏名を入力してください。"),
    password: yup.string().required("※パスワードを入力してください。").min(8, "※8文字以上で入力してください。"),
    postalCode: yup.string().required("※郵便番号を入力してください。"),
    address: yup.string().required("※住所を入力してください。"),
    address2: yup.string().required("※住所を入力してください。"),
    address3: yup.string().required("※住所を入力してください。"),
    tel: yup.number().required("※電話番号を入力してください。")
})

//バリデーション関数定義
const validate = (values: any) => {
    try {
        validateScheme.validateSync(values, {abortEarly: false})
        return true
    }catch(e: any){
        const validationErrors : any = {}
        //innerにエラー内容が入っている
        e.inner.forEach((error:any) => {
            if (error.path) {
                validationErrors[error.path] = error.message;
            }
        });
        errorMessage.value = validationErrors
        return false;
    }
}


const infoSent = (async () => {
    const values = {
        name: name.value,
        password: password.value,
        postalCode: postalCode.value,
        address: address.value,
        address2: address2.value,
        address3: address3.value,
        tel: tel.value
    }
    //バリデーション実行
    if(false == validate(values)){
        //バリデーションエラーの場合は何も返さない
        return 
    }
    const response = await Response.officialRegistration(name.value, password.value, token.value, postalCode.value, address.value, address2.value, address3.value, tel.value)
    console.log(response.data)
    console.log(token.value)
    localStorage.setItem("auth._token", token.value)
    if(token.value)
    {
        navigateTo('/login')
    }else {
        return
    }
    
})
</script>
<style lang="scss" scoped>
.name { 
    letter-spacing: 35px;
}
.password {
    letter-spacing: 5px;
}
.postal-code { 
    letter-spacing: 10px;
}
.address { 
    letter-spacing: 35px;
}
.tel { 
    letter-spacing: 10px;
}
.title {
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
}
.name-contents {
    display: flex;
    justify-content: center;
    //margin-bottom: 30px;
    align-items: center;
}
.password-contents {
    display: flex;
    justify-content: center;
    //margin-bottom: 30px;
    align-items: center;
}
.postal-code-contents {
    display: flex;
    justify-content: center;
    //margin-bottom: 30px;
    align-items: center;
}
.address1-contents {
    display: flex;
    justify-content: center;
    //margin-bottom: 30px;
    align-items: center;
}
.address2-contents {
    display: flex;
    justify-content: center;
    //margin-bottom: 30px;
    align-items: center;
}
.address3-contents {
    display: flex;
    justify-content: center;
    //margin-bottom: 30px;
    align-items: center;
}
.tel-contents {
    display: flex;
    justify-content: center;
    //margin-bottom: 50px;
    align-items: center;
}
.sent-btn {
    display: flex;
    justify-content: center;
}
input {
    width: 250px;
    height: 30px;
}
button {
    width: 350px;
    height: 40px;
    color: #fff;
    background:#00F ;
}
.error-text {
    color: #FF0000	;
    display: inline-block;
    text-align: left;
}
.error-text-area {
    max-width: 250px;
    margin: 0 auto;
}
</style>