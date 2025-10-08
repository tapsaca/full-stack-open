import axios from 'axios'

const baseURL = '/api/persons'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const create = async (person) => {
  const response = await axios.post(baseURL, person)
  return response.data
}

const deletePerson = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`)
  return response.data
}

const update = async (id, person) => {
  const response = await axios.put(`${baseURL}/${id}`, person)
  return response.data
}

export default { getAll, create, deletePerson, update }
