<template>
  <div class="notice-detail" v-if="notice">
    <h1>{{ notice.title }}</h1>
    <p class="content">{{ notice.content }}</p>
    <small class="meta">
      작성일: {{ formatDate(notice.createdAt) }} | 작성자: {{ notice.authorNickname }}
    </small>
  </div>
  <div v-else class="error-message">
    <p>공지사항을 불러올 수 없습니다.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const notice = ref(null)

onMounted(async () => {
  try {
    const id = route.params.id
    const token = localStorage.getItem('jwtToken')

    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {} // 토큰 없으면 빈 헤더

    const response = await axios.get(`/api/posts/${id}`, { headers })
    notice.value = response.data
  } catch (error) {
    console.error('공지사항 상세 불러오기 실패:', error)
  }
})

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}
</script>

<style scoped>
.notice-detail {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #1a0a0a;
  border: 1px solid #5c1a1a;
  border-radius: 8px;
  color: #f8dada;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
}

.notice-detail h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #ffcccc;
}

.notice-detail .content {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.notice-detail .meta {
  font-size: 0.85rem;
  color: #caa;
}

.error-message {
  text-align: center;
  margin-top: 2rem;
  color: #ff9999;
}
</style>
