<template>
    <div class="container">
        <h1 class="topic">ログイン</h1>
    </div>
    <div class="detail-container">
        <div class="name-container">
            <label class="name-label">氏名</label>
            <input type="text" />
        </div>
        <div class="password-container">
            <label class="pass-label">パスワード</label>
            <input type="text" />
        </div>
        <div class="login_button">
            <button type="button">ログイン</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';

</script>
<style lang="scss" scoped>
.topic {
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
}
.name-container {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    align-items: center;
}
.password-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.name-label {
    letter-spacing: 35px;
}
.pass-label {
    letter-spacing: 5px;
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
</style>