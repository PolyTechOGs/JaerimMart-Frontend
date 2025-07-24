<template>
  <div class="mypage-wrapper">
    <div class="menu-bar">
      <button @click="activeTab = 'info'">내 정보</button>
      <button @click="activeTab = 'password'">비밀번호 변경</button>
      <button @click="activeTab = 'withdraw'">회원 탈퇴</button>
    </div>

    <div class="content-area">
      <UserInfoView v-if="activeTab === 'info'" />
      <ResetPasswordView v-if="activeTab === 'password'" />
      <WithdrawView v-if="activeTab === 'withdraw'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserInfoView from './UserInfoView.vue'
import ResetPasswordView from './ResetPasswordView.vue'
import WithdrawView from './WithdrawView.vue'

const activeTab = ref('info')
</script>


<style scoped>
.mypage-wrapper {
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  background-color: rgba(42, 14, 14, 0.95);
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(120, 0, 0, 0.7);
  color: #f8dada;
}

.menu-bar {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
}

.menu-bar button {
  background-color: #330000;
  color: #ff6666;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.menu-bar button:hover {
  background-color: #660000;
  box-shadow: 0 0 12px rgba(255, 0, 0, 0.8);
}

.content-area {
  padding: 1rem;
}

</style>
