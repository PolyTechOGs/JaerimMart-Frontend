<template>
  <div class="notice-board">
    <h2>📢 공지사항</h2>

    <div class="notice-cards">
      <div
        v-for="notice in paginatedNotices"
        :key="notice.id"
        class="notice-card"
        @click="goToDetail(notice.id)">

        <h3>{{ notice.title }}</h3>
        <p>{{ notice.content }}</p>
        <small>{{ formatDate(notice.createdAt) }} | 작성자: {{ notice.authorNickname }}</small>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <div class="pagination">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchNoticePosts } from '@/api/post'
import { useRouter } from 'vue-router'
const router = useRouter()

function goToDetail(id) {
  router.push({ name: 'NoticeDetail', params: { id } })
}

const notices = ref([])
const currentPage = ref(1)
const pageSize = 4 // 한 페이지에 4개씩

onMounted(async () => {
  try {
    const response = await fetchNoticePosts()
    notices.value = response.data
  } catch (error) {
    console.error('공지사항 불러오기 실패:', error)
  }
})

const paginatedNotices = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return notices.value.slice(start, start + pageSize)
})

const totalPages = computed(() => {
  return Math.ceil(notices.value.length / pageSize)
})

function goToPage(page) {
  currentPage.value = page
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}
</script>

<style scoped>
.notice-board {
  margin-top: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.notice-board h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.notice-cards {
  display: grid;
  grid-template-columns: repeat(2, 280px);
  gap: 1rem;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;
}

.notice-card {
  background-color: #2a0e0e;
  border: 1px solid #5c1a1a;
  padding: 1rem;
  border-radius: 8px;
  color: #f8dada;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  transition: transform 0.3s;
}

.notice-card:hover {
  transform: scale(1.03);
}

.pagination {
  margin-top: 1rem;
}

.pagination button {
  background-color: #5c1a1a;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button.active {
  background-color: #a30000;
  font-weight: bold;
}

/* 반응형 대응 */
@media (max-width: 640px) {
  .notice-cards {
    grid-template-columns: 1fr;
    max-width: 100%;
  }

  .notice-card {
    width: 100%;
  }
}
</style>
