<template>
    <div class="container">
        <h1 class="topic">ログイン</h1>
    </div>
    <div class="detail-container">
        <div class="name-container">
            <label class="name-label">氏名：</label>
            <input type="text" />
        </div>
        <div class="password-container">
            <label class="pass-label">パスワード：</label>
            <input type="text" />
        </div>
        <div class="login_button">
            <button type="button">ログイン</button>
        </div>
    </div>
</template>
<script lang="ts" setup>

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
}
.password-container {
    display: flex;
    justify-content: center;
}
.name-label {
    width: max-content;
    margin: 5px 34px;
}
.pass-label {
    width: max-content;
    margin: 5px 10px;
}
input {
    width: 250px;
}
.login_button {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}
button {
    width: 300px;
    height: 40px;
    color: #fff;
    background: #0000FF;
}
</style>