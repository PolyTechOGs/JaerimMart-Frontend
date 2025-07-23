import axios from 'axios'

export async function fetchNoticePosts() {
  return axios.get('/api/posts?boardType=NOTICE')
}
