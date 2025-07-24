
<template>
  <div class="page-wrapper">
    <div class="register-container">
      <h2>회원가입</h2>
      <form @submit.prevent="handleRegister">
        <input
          id="register-userid"
          name="userid"
          v-model="userid"
          type="text"
          placeholder="아이디"
          autocomplete="username"
          required
        />
        <div v-if="!isUserIdAvailable" class="warning">이미 사용 중인 아이디입니다.</div>

        <input
          id="register-password"
          name="password"
          v-model="password"
          type="password"
          placeholder="비밀번호"
          autocomplete="new-password"
          required
        />

        <input
          id="register-email"
          name="email"
          v-model="email"
          type="email"
          placeholder="이메일"
          autocomplete="email"
          required
        />
        <div v-if="!isEmailAvailable" class="warning">이미 사용 중인 이메일입니다.</div>

        <input
          id="register-nickname"
          name="nickname"
          v-model="nickname"
          type="text"
          placeholder="닉네임"
          autocomplete="nickname"
          required
        />
        <div v-if="!isNicknameAvailable" class="warning">이미 사용 중인 닉네임입니다.</div>

        <button
          type="submit"
          :disabled="!isUserIdAvailable || !isEmailAvailable || !isNicknameAvailable || isChecking"
        >
          회원가입
        </button>
      </form>
      <router-link to="/login">로그인</router-link>
    </div>
  </div>
</template>


<script setup>

import { ref, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import debounce from 'lodash/debounce'

const userid = ref('')
const password = ref('')
const email = ref('')
const nickname = ref('')
const isUserIdAvailable = ref(true)
const isEmailAvailable = ref(true)
const isNicknameAvailable = ref(true)
const isChecking = ref(false)
const router = useRouter()

const checkUserId = debounce(async () => {
  if (!userid.value) return
  isChecking.value = true
  try {
    const res = await axios.get('http://localhost:8080/api/users/check-userid', {
      params: { userid: userid.value }
    })
    isUserIdAvailable.value = res.data.available
  } catch (err) {
    console.error('아이디 중복 검사 실패:', err)
    isUserIdAvailable.value = false
  } finally {
    isChecking.value = false
  }
}, 500)

const checkEmail = debounce(async () => {
  if (!email.value) return
  isChecking.value = true
  try {
    const res = await axios.get('http://localhost:8080/api/users/check-email', {
      params: { email: email.value }
    })
    isEmailAvailable.value = res.data.available
  } catch (err) {
    console.error('이메일 중복 검사 실패:', err)
    isEmailAvailable.value = false
  } finally {
    isChecking.value = false
  }
}, 500)

const checkNickname = debounce(async () => {
  if (!nickname.value) return
  isChecking.value = true
  try {
    const res = await axios.get('http://localhost:8080/api/users/check-nickname', {
      params: { nickname: nickname.value }
    })
    isNicknameAvailable.value = res.data.available
  } catch (err) {
    console.error('닉네임 중복 검사 실패:', err)
    isNicknameAvailable.value = false
  } finally {
    isChecking.value = false
  }
}, 500)

// 실시간 검사 트리거
watch(userid, () => checkUserId())
watch(email, () => checkEmail())
watch(nickname, () => checkNickname())

const handleRegister = async () => {
  if (!isUserIdAvailable.value || !isEmailAvailable.value || !isNicknameAvailable.value) {
    alert('중복된 정보가 있습니다. 수정 후 다시 시도해주세요.')
    return
  }

  try {
    const response = await axios.post('http://localhost:8080/api/users/signup', {
      userid: userid.value,
      password: password.value,
      email: email.value,
      nickname: nickname.value
    })

    console.log('회원가입 성공:', response.data)
    alert('회원가입이 완료되었습니다! 🎉')
    router.push('/login')
  } catch (error) {
    console.error('회원가입 실패:', error)
    alert('회원가입에 실패했습니다. 이메일 인증을 완료했는지 확인해주세요.')
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

.register-container {
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

a {
  display: block;
  margin-top: 1.5rem;
  color: #ff6666;
  text-decoration: underline;
  font-size: 1rem;
}

.warning {
  color: #ff9999;
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
}

/* 반응형 */
@media (max-width: 768px) {
  .register-container {
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
