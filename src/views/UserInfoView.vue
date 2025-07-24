<template>
  <div class="user-info-container">
    <div class="user-info-box">
      <h2>👤 내 정보</h2>

      <div class="info-group">
        <label>닉네임</label>
        <div class="nickname-display">{{ nickname }}</div>
      </div>

      <div class="info-group">
        <label for="profileImage">프로필 이미지 변경</label>
        <input id="profileImage" type="file" @change="onImageChange" />
        <img v-if="previewImage" :src="previewImage" alt="미리보기" />
      </div>

      <button @click="saveChanges">저장</button>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const nickname = ref('')
const previewImage = ref(null)
const imageFile = ref(null)

const fetchUserInfo = async () => {
  try {
    const res = await axios.get('/api/user/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    })
    nickname.value = res.data.nickname
    previewImage.value = res.data.profileImageUrl // URL 제공 시
  } catch (err) {
    console.error('사용자 정보 조회 실패:', err)
  }
}

const onImageChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    imageFile.value = file
    previewImage.value = URL.createObjectURL(file)
  }
}

const saveChanges = async () => {
  const formData = new FormData()
  if (imageFile.value) formData.append('profileImage', imageFile.value)

  await axios.put('/api/user/update-image', formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}

onMounted(fetchUserInfo)
</script>


<style scoped>
.user-info-container {
  background: url('/assets/bg-dark.jpg') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-info-box {
  background-color: rgba(10, 10, 10, 0.95);
  color: #f5f5f5;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 0 30px rgba(255, 0, 0, 0.5);
  border: 2px solid #ff3c3c;
}

.user-info-box h2 {
  text-align: center;
  color: #ff3c3c;
  font-family: 'Creepster', cursive;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.info-group {
  margin-bottom: 1.5rem;
}

.nickname-display {
  background-color: #1a1a1a;
  padding: 0.8rem;
  border-radius: 5px;
  border: 1px solid #ff3c3c;
  color: #fff;
}

input[type="file"] {
  width: 100%;
  padding: 0.5rem;
  background-color: #1a1a1a;
  border: 1px solid #ff3c3c;
  border-radius: 5px;
  color: #fff;
  margin-top: 0.5rem;
}

img {
  max-width: 100%;
  border-radius: 5px;
  margin-top: 1rem;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.4);
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
