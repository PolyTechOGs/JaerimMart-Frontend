<!-- src/views/FreePage.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const posts = ref([])
const currentPage = ref(1)
const postsPerPage = 4
const isAdmin = ref(false)
const router = useRouter()

const fetchPosts = async () => {
  const response = await axios.get('/api/posts?boardType=FREE')
  posts.value = response.data
}

const checkAdmin = () => {
  const token = localStorage.getItem('jwtToken')
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      isAdmin.value = payload.role === 'ADMIN'
    } catch (e) {
      console.error('JWT 디코딩 오류:', e)
    }
  }
}

const goToWrite = () => {
  router.push('/board/free/write')
}

onMounted(() => {
  fetchPosts()
  checkAdmin()
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  return posts.value.slice(start, start + postsPerPage)
})
const totalPages = computed(() => Math.ceil(posts.value.length / postsPerPage))

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<template>
  <div class="free-container">
    <h2>자유게시판</h2>

    <div v-if="isAdmin" class="write-button">
      <button @click="goToWrite">글 작성</button>
    </div>

    <div class="scroll-area">
      <div class="post-grid">
        <div v-for="post in paginatedPosts" :key="post.id" class="post-card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
          <small>{{ post.createdAt }} | 작성자: {{ post.authorNickname }}</small>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">&lt;</button>
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </button>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">&gt;</button>
    </div>
  </div>
</template>

<style scoped>
:global(html),
:global(body) {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #000;
  overflow-x: hidden;
}

.free-container {
  width: 100vw;
  min-height: 100vh;
  padding: 2rem;
  background-image: linear-gradient(rgba(0,0,0,0.8), rgba(30,0,0,0.9)), url('/bg-horror.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: #f8dada;
  backdrop-filter: blur(2px);
}

.free-container h2 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #8b0000;
  padding-bottom: 0.5rem;
  text-shadow: 0 0 6px rgba(255, 0, 0, 0.5);
}

.write-button {
  text-align: right;
  margin-bottom: 1rem;
}

.write-button button {
  background-color: #8b0000;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.4);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.write-button button:hover {
  background-color: #a30000;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.8);
}

.scroll-area {
  max-height: 600px;
  overflow-y: auto;
  padding-right: 1rem;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.post-card {
  background-color: rgba(42, 14, 14, 0.95);
  border: 1px solid #5c1a1a;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(120, 0, 0, 0.6);
  color: #f8dada;
  transition: transform 0.2s ease;
  text-shadow: 0 0 4px rgba(255, 0, 0, 0.3);
}

.post-card:hover {
  transform: scale(1.02);
}

.post-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #ff6666;
}

.post-card p {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.post-card small {
  font-size: 0.8rem;
  color: #ffaaaa;
}

.pagination {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.pagination button {
  background-color: #3a1a1a;
  color: #f2f2f2;
  border: 1px solid #5c1a1a;
  padding: 0.5rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 0 6px rgba(255, 0, 0, 0.3);
}

.pagination button.active {
  background-color: #8b0000;
  color: white;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.6);
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 반응형 */
@media (max-width: 768px) {
  .free-container {
    padding: 1rem;
  }

  .post-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .write-button {
    text-align: center;
    margin-bottom: 1rem;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 0.3rem;
  }
}

</style>
