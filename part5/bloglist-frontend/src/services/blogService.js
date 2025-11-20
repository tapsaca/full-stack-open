import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blog, token) => {
  const response = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

const updateBlog = async (blog, token) => {
  console.log(blog.id)
  const response = await axios.put(`${baseUrl}/${blog.id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export default { getAll, createBlog, updateBlog }
