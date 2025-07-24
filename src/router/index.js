import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomePage from '../views/HomePage.vue'
import NoticeDetail from '../views/NoticeDetail.vue' // 상세 페이지 컴포넌트 추가
import FreePage from '@/views/FreePage.vue'
import NoticePage from '@/views/NoticePage.vue'
import TipPage from '@/views/TipPage.vue'
import BoardWrite from '@/views/BoardWrite.vue'
import MyPageView from '@/views/MyPageView.vue'
import CharactersPage from '@/views/CharactersPage.vue'

const routes = [
  { path: '/', component: HomePage }, // 홈페이지
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/notice/:id', name: 'NoticeDetail', component: NoticeDetail }, // 공지사항 상세 페이지
  { path: '/board/notice', name: 'NoticePage', component: NoticePage },
  { path: '/board/tip', name: 'TipPage', component: TipPage },
  { path: '/board/free', name: 'FreePage', component: FreePage },
  { path: '/board/:boardType/write', name: 'BoardWrite', component: BoardWrite },
  { path: '/mypage', component: MyPageView },
  { path: '/Characters', component: CharactersPage }


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
