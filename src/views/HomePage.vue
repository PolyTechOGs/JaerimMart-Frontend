<template>
  <div class="home-wrapper">
    <nav class="navbar">
      <router-link to="/">홈</router-link>
      <div class="dropdown">
        <span>게시판 ▾</span>
        <div class="dropdown-content">
          <router-link to="/board/notice">공지사항</router-link>
          <router-link to="/board/tip">팁 게시판</router-link>
          <router-link to="/board/free">자유게시판</router-link>
        </div>
      </div>
      <router-link to="/worldview">게임 세계관</router-link>
      <router-link to="/characters">캐릭터 소개</router-link>
      <router-link to="/mypage">마이페이지</router-link>

      <!-- 로그인/회원가입/게임시작 버튼 -->
      <div class="auth-buttons">
        <template v-if="isAuthenticated">
            <button class="auth-btn" @click="logout">로그아웃</button>
            <router-link to="/game" class="auth-btn game-btn">게임 시작</router-link>
        </template>
        <template v-else>
            <router-link to="/login" class="auth-btn">로그인</router-link>
            <router-link to="/register" class="auth-btn">회원가입</router-link>
            <router-link to="/game" class="auth-btn game-btn">게임 시작</router-link>
        </template>
        </div>

    </nav>

    <main class="main-content">
      <h1>재림마트에 오신 것을 환영합니다</h1>
      <p>귀하는 현재 대한민국의 영토가 아닌 인외마경에 위치해있습니다.</p>
      <p>여러분들만의 수칙서를 확인하고, 자유롭게 의견을 나눠보세요.</p>

      <NoticeBoard />
    </main>

    <footer class="footer">
      <p>© 2025 Jaerimmart Project</p>
      <p>문의: jaerimmart@gmail.com</p>
    </footer>
  </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth'
import NoticeBoard from '@/components/NoticeBoard.vue'

const { isAuthenticated, logout } = useAuth()

// 추후 로그인 여부에 따라 마이페이지 표시 제어 가능
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
  background-color: #000;
}

.home-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(rgba(0,0,0,0.8), rgba(30,0,0,0.9)), url('/bg-horror.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: #f8dada;
  backdrop-filter: blur(2px);
}

.navbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background-color: rgba(20, 0, 0, 0.85);
  border-bottom: 1px solid #5c1a1a;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
}

.navbar a {
  display: inline-flex;
  align-items: center;
  color: #ff6666;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s, box-shadow 0.3s;
  text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}

.navbar a:hover {
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 8px rgba(255, 0, 0, 0.4);
}

.dropdown {
  position: relative;
  cursor: pointer;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #3a1a1a;
  display: none;
  flex-direction: column;
  padding: 0.5rem;
  border: 1px solid #5c1a1a;
  z-index: 200;
  width: 150px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.5);
}

.dropdown:hover .dropdown-content {
  display: flex;
}

.auth-buttons {
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
}

.auth-btn {
  background-color: #5c1a1a;
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  text-decoration: none;
  box-shadow: 0 0 6px rgba(255, 0, 0, 0.3);
}

.auth-btn:hover {
  background-color: #7a2a2a;
  box-shadow: 0 0 12px rgba(255, 0, 0, 0.5);
}

.game-btn {
  background-color: #8b0000;
  font-weight: bold;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.6);
}

.game-btn:hover {
  background-color: #a30000;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.8);
}

.main-content {
  flex: 1;
  padding: 2rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.6);
  max-width: 800px;
  margin: 2rem auto;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.2);
  color: #f8dada;
  text-shadow: 0 0 4px rgba(255, 0, 0, 0.3);
}

.main-content h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #8b0000;
  padding-bottom: 0.5rem;
}

.main-content p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.footer {
  text-align: center;
  padding: 1rem;
  background-color: rgba(42, 14, 14, 0.95);
  border-top: 1px solid #5c1a1a;
  font-size: 0.9rem;
  color: #ffaaaa;
}

/* 반응형 */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar a,
  .dropdown > span {
    width: 100%;
    padding: 0.5rem 0;
  }

  .dropdown-content {
    position: static;
    box-shadow: none;
    border: none;
    background-color: transparent;
    padding: 0;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .auth-buttons {
    width: 100%;
    justify-content: flex-start;
    margin-top: 0.5rem;
    flex-direction: column;
  }

  .auth-btn {
    width: 100%;
    text-align: center;
  }

  .main-content {
    margin: 1rem;
    padding: 1rem;
    max-width: 100%;
    border-radius: 0;
  }

  .footer {
    font-size: 0.8rem;
    padding: 0.5rem;
  }
}

</style>
