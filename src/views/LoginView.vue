<template>
  <div class="page-wrapper">
    <div class="login-container">
      <h2>로그인</h2>
      <form @submit.prevent="handleLogin">
        <input id="userid" name="userid" v-model="userid" type="text" placeholder="아이디" required />
        <input id="password" name="password" v-model="password" type="password" placeholder="비밀번호" required />
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? '로그인 중...' : '로그인' }}
        </button>
      </form>
      <router-link to="/register">회원가입</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'


const userid = ref('')
const password = ref('')
const isLoading = ref(false)
const router = useRouter()

function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decoded.exp < currentTime
  } catch (e) {
    console.error('JWT 디코딩 오류:', e)
    return true
  }
}


const handleLogin = async () => {
  isLoading.value = true
  try {
    const response = await axios.post('http://localhost:8080/api/users/login', {
    userid: userid.value,
    password: password.value
  })

  const { token, email, nickname, role } = response.data

  if (!token || typeof token !== 'string') {
    console.error('유효하지 않은 토큰:', token)
    alert('서버에서 유효한 토큰을 받지 못했습니다.')
    return
  }

  if (isTokenExpired(token)) {
    alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
    return
  }

  localStorage.setItem('jwtToken', token)
  localStorage.setItem('userEmail', email)
  localStorage.setItem('userNickname', nickname)
  localStorage.setItem('userRole', role)

  router.push('/')


  } catch (error) {
    console.error('로그인 실패:', error)
    alert('아이디 또는 비밀번호가 올바르지 않아요 😢')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
:global(html),
:global(body) {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: 'Noto Sans KR', sans-serif;
  overflow: hidden;
}

.page-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/bg-horror.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 0;
  margin: 0;
}

.login-container {
  max-width: 400px;
  width: 100%;
  padding: 3rem;
  background-color: rgba(42, 14, 14, 0.95);
  border: 1px solid #5c1a1a;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(120, 0, 0, 0.7);
  color: #f8dada;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

input,
button {
  width: 80%;
  padding: 1rem;
  border-radius: 6px;
  font-size: 1.1rem;
  margin: 0 auto;
  box-sizing: border-box;
}

input {
  border: 1px solid #5c1a1a;
  background-color: #3a1a1a;
  color: #f2f2f2;
}

input::placeholder {
  color: #caa;
}

button {
  background-color: #8b0000;
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
  background-color: #a30000;
  box-shadow: 0 0 12px rgba(255, 0, 0, 0.8);
}

button:disabled {
  background-color: #5c1a1a;
  cursor: not-allowed;
  opacity: 0.7;
}

a {
  display: block;
  margin-top: 1.5rem;
  color: #ff6666;
  text-decoration: underline;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .login-container {
    padding: 2rem;
    border-radius: 0;
    box-shadow: none;
  }

  input,
  button {
    width: 100%;
    font-size: 1rem;
  }
}
</style>
