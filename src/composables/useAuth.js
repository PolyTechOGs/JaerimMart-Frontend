import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'

const isAuthenticated = ref(false)

export function useAuth() {
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userNickname')
    localStorage.removeItem('userRole')
    isAuthenticated.value = false
    router.push('/login')
  }

  const checkToken = () => {
    const token = localStorage.getItem('jwtToken')
    if (!token) {
      isAuthenticated.value = false
      return
    }

    try {
      const decoded = jwtDecode(token)
      const currentTime = Date.now() / 1000

      if (decoded.exp < currentTime) {
        console.warn('토큰 만료됨, 자동 로그아웃')
        logout()
      } else {
        isAuthenticated.value = true
        // ⏱️ 자동 로그아웃 타이머 설정
        const timeout = (decoded.exp - currentTime) * 1000
        setTimeout(() => {
          console.warn('토큰 만료로 자동 로그아웃')
          logout()
        }, timeout)
      }
    } catch (e) {
      console.error('토큰 디코딩 실패:', e)
      logout()
    }
  }

  onMounted(() => {
    checkToken()
  })

  return {
    isAuthenticated,
    logout,
    checkToken
  }
}
