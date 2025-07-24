<template>
  <div class="page-wrapper">
    <div class="register-container">
      <h2>비밀번호 재설정</h2>

      <!-- 이메일 인증 UI: 인증 성공 전까지만 표시 -->
      <template v-if="!isVerified">
        <input v-model="email" type="email" placeholder="이메일 입력" required />
        <button @click="sendVerificationCode">인증 코드 요청</button>

        <template v-if="timer !== null">
          <input
            v-model="verifyCode"
            type="text"
            placeholder="인증 코드 입력"
            :disabled="timer === 0"
            required
          />
          <div v-if="timer > 0" class="timer">남은 시간: {{ formattedTime }}</div>
          <div v-else class="warning">
            인증 시간이 만료되었습니다.
            <button @click="resendVerificationCode">재요청</button>
          </div>
          <button @click="verifyCodeRequest" :disabled="timer === 0">인증 코드 확인</button>
        </template>

        <div v-if="successMessage" class="success-message">
        {{ successMessage }}
        </div>

      </template>

      <!-- 비밀번호 변경 UI: 인증 성공 후에만 표시 -->
      <template v-if="isVerified">
        <input
          v-model="newPassword"
          type="password"
          placeholder="새 비밀번호 입력"
          required
          ref="passwordInput"
        />
        <button @click="resetPassword">비밀번호 변경</button>
      </template>

      <router-link to="/login">로그인으로 돌아가기</router-link>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, nextTick } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const verifyCode = ref('')
const newPassword = ref('')
const timer = ref(null)
const isVerified = ref(false)
let timerInterval = null
const router = useRouter()
const passwordInput = ref(null)
const successMessage = ref('')

const formattedTime = computed(() => {
  if (timer.value === null) return ''
  const min = String(Math.floor(timer.value / 60)).padStart(2, '0')
  const sec = String(timer.value % 60).padStart(2, '0')
  return `${min}:${sec}`
})

const startTimer = () => {
  timer.value = 180
  clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    } else {
      clearInterval(timerInterval)
    }
  }, 1000)
}

const stopTimer = () => {
  clearInterval(timerInterval)
  timer.value = null
}

const sendVerificationCode = async () => {
  try {
    await axios.post('http://localhost:8080/api/email/send', { email: email.value })
    alert('인증 코드가 이메일로 전송되었습니다.')
    isVerified.value = false
    verifyCode.value = ''
    startTimer()
  } catch (error) {
    console.error('인증 코드 전송 실패:', error)
    alert('등록된 이메일인지 확인해주세요.')
  }
}

const resendVerificationCode = async () => {
  await sendVerificationCode()
}

const verifyCodeRequest = async () => {
  try {
    const res = await axios.post('http://localhost:8080/api/email/verify', {
      verifyCode: verifyCode.value
    })
    if (res.data.result === '인증 성공') {
      successMessage.value = '✅ 이메일 인증이 완료되었습니다.'
      isVerified.value = true
      stopTimer()
      await nextTick()
      passwordInput.value?.focus()
    } else {
      alert('인증 코드가 올바르지 않습니다.')
    }
  } catch (error) {
    console.error('인증 실패:', error)
    alert('인증에 실패했습니다.')
  }
}

const resetPassword = async () => {
  try {
    await axios.post('http://localhost:8080/api/users/reset-password', {
      email: email.value,
      verifyCode: verifyCode.value,
      newPassword: newPassword.value
    })
    alert('비밀번호가 성공적으로 변경되었습니다.')
    router.push('/login')
  } catch (error) {
    console.error('비밀번호 변경 실패:', error)
    alert('비밀번호 변경에 실패했습니다. 인증을 다시 확인해주세요.')
  }
}
</script>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background: url('/bg-horror.jpg') center/cover no-repeat;
  background-color: #000;
  background-blend-mode: multiply;
  box-sizing: border-box;
}

.register-container {
  width: 100%;
  max-width: 420px;
  padding: 2.5rem;
  margin: auto;
  background: rgba(20, 0, 0, 0.92);
  border: 2px solid #8b0000;
  border-radius: 12px;
  box-shadow: 0 0 40px rgba(255, 0, 0, 0.6);
  color: #f8dada;
  text-align: center;
  box-sizing: border-box;
}

.register-container h2 {
  font-family: 'Creepster', cursive;
  font-size: 2.2rem;
  color: #ff3c3c;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
  margin-bottom: 2rem;
}

input,
button {
  width: 85%;
  padding: 1rem;
  margin: 0.5rem auto;
  border-radius: 6px;
  font-size: 1.1rem;
  display: block;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

input {
  border: 1px solid #ff4d4d;
  background-color: #1a0a0a;
  color: #f2f2f2;
}

input:focus {
  outline: none;
  border-color: #ff0000;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
}

input::placeholder {
  color: #caa;
}

button {
  background-color: #8b0000;
  color: #fff;
  border: none;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

button:hover {
  background-color: #a30000;
  box-shadow: 0 0 12px rgba(255, 0, 0, 0.8);
}

button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 0, 0, 0.2);
  transition: left 0.4s ease;
}

button:hover::after {
  left: 0;
}

.warning {
  color: #ff9999;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  animation: pulse 1s infinite;
}

.timer {
  color: #ffcccc;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

a {
  display: block;
  margin-top: 1.5rem;
  color: #ff6666;
  text-decoration: underline;
  font-size: 1rem;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
}

.success-message {
  color: #66ff66;
  font-size: 1rem;
  margin-bottom: 1rem;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

</style>
