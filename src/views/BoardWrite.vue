<!-- src/views/BoardWrite.vue -->
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const boardType = route.params.boardType?.toUpperCase() || 'FREE'
const title = ref('')
const content = ref('')

const boardTitleMap = {
  NOTICE: '공지사항',
  TIP: '팁 게시판',
  FREE: '자유게시판'
}

const boardTitle = boardTitleMap[boardType] || '게시판'

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem('jwtToken')
    await axios.post('/api/posts', {
      title: title.value,
      content: content.value,
      boardType
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    alert(`${boardTitle}에 글이 등록되었습니다!`)
    router.push(`/board/${boardType.toLowerCase()}`)
  } catch (error) {
    console.error('글 작성 실패:', error)
    alert('글 작성 중 오류가 발생했습니다.')
  }
}
</script>

<template>
  <div class="write-wrapper">
    <h2>{{ boardTitle }} 글 작성</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="title" type="text" placeholder="제목" required />
      <textarea v-model="content" placeholder="내용을 입력하세요" required></textarea>
      <button type="submit">등록</button>
    </form>
  </div>
</template>

<style scoped>
.write-wrapper {
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: rgba(42, 14, 14, 0.95);
  border: 1px solid #5c1a1a;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(120, 0, 0, 0.7);
  color: #f8dada;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input,
textarea,
button {
  width: 100%;
  padding: 1rem;
  border-radius: 6px;
  font-size: 1.1rem;
  box-sizing: border-box;
}

input,
textarea {
  border: 1px solid #5c1a1a;
  background-color: #3a1a1a;
  color: #f2f2f2;
}

textarea {
  min-height: 200px;
  resize: vertical;
}

input::placeholder,
textarea::placeholder {
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
</style>
