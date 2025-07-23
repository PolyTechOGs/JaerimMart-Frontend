<template>
  <ul>
    <li @click="goToNotice">공지사항</li>
  </ul>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goToNotice = () => {
  router.push({ name: 'NoticePage' })
}
</script>
