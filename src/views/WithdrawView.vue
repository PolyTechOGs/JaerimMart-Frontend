<template>
  <div class="withdraw">
    <button @click="showInput = true">회원 탈퇴</button>

    <div v-if="showInput">
      <input v-model="password" type="password" placeholder="비밀번호 입력" />
      <button @click="withdraw">탈퇴 확인</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const password = ref('')
const showInput = ref(false)
const router = useRouter()

const withdraw = async () => {
  await axios.post('/api/user/withdraw', { password: password.value }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    }
  })
  localStorage.clear()
  router.push('/login')
}
</script>
<style scoped>
.withdraw {
  background-color: #0a0a0a;
  color: #f5f5f5;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  margin: auto;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
  text-align: center;
}

input[type="password"] {
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: #1a1a1a;
  border: 1px solid #ff3c3c;
  border-radius: 5px;
  color: #fff;
}

button {
  width: 100%;
  padding: 0.8rem;
  background-color: #ff3c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #cc2a2a;
}
</style>
