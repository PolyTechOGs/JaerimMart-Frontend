<template>
  <div class="board-container">
    <h2>공지사항</h2>

    <div v-if="isAdmin">
      <button @click="goToCreate">공지 작성</button>
    </div>

    <ul>
      <li v-for="post in posts" :key="post.id" class="post-item">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <small>작성자: {{ post.writer }}</small>
        <button v-if="isWriter(post.writer)" @click="deletePost(post.id)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const posts = ref([])
const router = useRouter()

// 예시: 로그인 사용자 정보
const currentUser = ref('admin') // JWT에서 추출 예정
const isAdmin = ref(currentUser.value === 'admin')

const fetchPosts = async () => {
  try {
    const response = await axios.get('/api/boards?type=NOTICE')
    posts.value = response.data
  } catch (error) {
    console.error('게시글 불러오기 실패:', error)
  }
}

const deletePost = async (id) => {
  try {
    await axios.delete(`/api/boards/${id}`)
    posts.value = posts.value.filter(post => post.id !== id)
  } catch (error) {
    console.error('삭제 실패:', error)
  }
}

const isWriter = (writer) => writer === currentUser.value

const goToCreate = () => {
  router.push('/board/notice/create') // 작성 페이지로 이동
}

onMounted(fetchPosts)
</script>

<style scoped>
.board-container {
  padding: 2rem;
  background-color: rgba(42, 14, 14, 0.9);
  color: #f8dada;
}

.post-item {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #5c1a1a;
  background-color: #3a1a1a;
  border-radius: 6px;
}
</style>
