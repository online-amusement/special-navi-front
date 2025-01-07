<template>
    <div class="container">
        <div class="title">
            <h2>新規会員登録</h2>
        </div>
        <div class="email-contents">
            <label class="email">メールアドレス</label>
            <input v-model="email" type="text">
        </div>
        <div class="error-text-area">
            <span class="error-text">{{ errorMessage.email }}</span>
        </div>
        <div class="message" v-if="status == 200">
            <span class="success-text">{{ successMessage }}</span>
        </div>
        <div class="sent-btn">
            <button @click="send" type="button">送信</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref,onMounted } from "vue";
import { string } from "yup";
import Response from "~/apis/response";
import * as yup from "yup";

const email = ref('');
const errorMessage: any = ref({});
const successMessage = ref('');
const status = ref(0);

const validateScheme = yup.object().shape({
    email: yup.string().required("※メールアドレスを入力してください。").email(),
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

const send = (async () => {
    const values = {
        email: email.value,
    }
    //バリデーション実行
    if(false == validate(values)){
        //バリデーションエラーの場合は何も返さない
        return 
    }
    const response = await Response.temporaryRegistration(email.value)
    status.value = response.status
    if(response.status == 200) {
        successMessage.value = "*メールをご確認頂き本登録に進んでください。"
    }
})
</script>
<style lang="scss" scoped>
.title {
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
}
.email-contents {
    display: flex;
    justify-content: center;
    align-items: center;
}
.email {
    letter-spacing: 5px;
}
input {
    width: 250px;
    height: 30px;
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
    margin-bottom: 20px;
}
.error-text-area {
    max-width: 285px;
    margin: 0 auto;
}
.message {
    max-width: 335px;
    margin: 0 auto;
    margin-bottom: 20px;
}
</style>