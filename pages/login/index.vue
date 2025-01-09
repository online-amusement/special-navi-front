<template>
    <div class="container">
        <h1 class="topic">ログイン</h1>
    </div>
    <div class="detail-container">
        <form method="POST" action="" @submit.prevent>
            <div class="email-container">
                <label class="email-label">メールアドレス</label>
                <input v-model="email" placeholder="メールアドレス" id="email" type="text" />
            </div>
            <div class="error-text-area">
                <span class="error-text">{{ errorMessage.email }}</span>
            </div>
            <div class="password-container">
                <label class="pass-label">パスワード</label>
                <input v-model="password" :type="pass_check == false ? 'password' : 'text'" placeholder="パスワード" id="password" :value="password" />
                <span v-if="pass_check == false" class="material-icons" @click="passwordCheck()" :class="pass_check == false ? 'visibility' : 'visibility_off' ">visibility</span>
                <span v-if="pass_check == true" class="material-icons" @click="passwordCheck()" :class="pass_check == true ? 'visibility' : 'visibility_off' " >visibility_off</span>
            </div>
            <div class="error-text-area">
                <span class="error-text">{{ errorMessage.password }}</span>
            </div>
            <div class="login_button">
                <button @click="send" type="submit">ログイン</button>
            </div>
        </form>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Response from '~/apis/response';
import * as yup from 'yup';

onMounted(() => {
    console.log(token.value)
})

/*definePageMeta({
    auth: {
        unauthenticatedOnly: false
    }
})*/
const { signIn, token, status } = useAuth();
const email = ref('');
const password = ref('');
const pass_check = ref(false);
const { setToken } = useAuthState();
const errorMessage :any = ref({});

const validateScheme = yup.object().shape({
    email: yup.string().required("※メールアドレスを入力してください。").email(),
    password: yup.string().required("※パスワードを入力してください。").min(8, "※8文字以上で入力してください。"),
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
        password: password.value,
    }
    //バリデーション実行
    if(false == validate(values)){
        //バリデーションエラーの場合は何も返さない
        return 
    }
    localStorage.removeItem("auth._token");
    setToken(null);
    
    const response = await signIn({
        email: email.value,
        password: password.value
    }, {
        redirect: false
    });
    try {
        console.log("tokenTest", token.value)
        if(token.value) {
            localStorage.setItem("auth._token", token.value)
            if(status.value === 'authenticated') {
                navigateTo('/')
            }
        }
    }catch(e) {
        return e
    }
    
})

const passwordCheck = () => {
    pass_check.value =! pass_check.value
    console.log(pass_check.value);
}

</script>
<style lang="scss" scoped>
.topic {
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
}
.email-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.password-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.email-label {
    letter-spacing: 6px;
}
.pass-label {
    letter-spacing: 14px;
}
input {
    width: 250px;
    height: 30px;
}
.login_button {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}
button {
    width: 350px;
    height: 40px;
    color: #fff;
    background:#00F ;
}
.material-icons {
    position: absolute;
    margin-left: 380px;
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