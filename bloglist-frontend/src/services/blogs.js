import axios from 'axios'
const baseUrl = '/api/blogs'
const userUrl = '/api/users'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

// const updateBlog = async updatedBlog => {
//   const config = {
//     headers: { Authorization: token },
//   }
//
//   console.log('Update the Blog')
//   const response = await axios
//     .put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
//   return response.data
// }

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, create, update }
