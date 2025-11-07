const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await Blog.insertMany(helper.listWithManyBlogs)
})

describe('GET', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.listWithManyBlogs.length)
  })

  test('blogs have a property named id', async () => {
    const response = await api.get('/api/blogs')
    assert.ok('id' in response.body[0])
  })
})

describe('POST', () => {
  beforeEach(async () => {
    const user = {
      username: 'root',
      name: 'Superuser',
      password: 'password'
    }
    await api
      .post('/api/users')
      .send(user)
  })

  test('blog is correctly added to the database', async () => {
    const usersAtStart = await helper.usersInDatabase()
    const newBlog = {
      title: 'Title',
      author: 'Author',
      url: 'http://url.com',
      likes: 1,
      user: usersAtStart[0].id
    }
    const blogsAtStart = await helper.blogsInDatabase()
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDatabase()
    const addedBlog = blogsAtEnd.find((blog) => blog.title === newBlog.title)
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)
    assert.ok('id' in addedBlog)
    assert.strictEqual(addedBlog.author, newBlog.author)
    assert.strictEqual(addedBlog.url, newBlog.url)
    assert.strictEqual(addedBlog.likes, newBlog.likes)
    assert.strictEqual(addedBlog.user.toString(), usersAtStart[0].id)
  })

  test('blog with missing likes property defaults to 0', async () => {
    const usersAtStart = await helper.usersInDatabase()
    const newBlog = {
      title: 'No Likes',
      author: 'Disliked',
      url: 'http://meh.com',
      user: usersAtStart[0].id
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDatabase()
    const addedBlog = blogsAtEnd.find((blog) => blog.title === 'No Likes')
    assert.strictEqual(addedBlog.likes, 0)
  })

  test('title missing results in bad request', async () => {
    const usersAtStart = await helper.usersInDatabase()
    const newBlog = {
      author: 'Untitled',
      url: 'http://untitled.com',
      likes: 1,
      user: usersAtStart[0].id
    }
    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    assert(result.body.error.includes('title is required'))
  })

  test('url missing results in bad request', async () => {
    const usersAtStart = await helper.usersInDatabase()
    const newBlog = {
      title: 'No URL',
      author: 'Urless',
      likes: 1,
      user: usersAtStart[0].id
    }
    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    assert(result.body.error.includes('url is required'))
  })
})

describe('DELETE', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDatabase()
    const blogToDelete = blogsAtStart[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    const blogsAtEnd = await helper.blogsInDatabase()
    const titles = blogsAtEnd.map((blog) => blog.title)
    assert(!titles.includes(blogToDelete.title))
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })
})

describe('PUT', () => {
  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDatabase()
    await api
      .put(`/api/blogs/${blogsAtStart[0].id}`)
      .send({ ...blogsAtStart[0], likes: blogsAtStart[0].likes + 1 })
      .expect(200)
    const blogsAtEnd = await helper.blogsInDatabase()
    const updatedBlog = blogsAtEnd.find((blog) => blog.id === blogsAtStart[0].id)
    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
    assert.strictEqual(updatedBlog.title, blogsAtStart[0].title)
    assert.strictEqual(updatedBlog.author, blogsAtStart[0].author)
    assert.strictEqual(updatedBlog.url, blogsAtStart[0].url)
    assert.strictEqual(updatedBlog.likes, blogsAtStart[0].likes + 1)
  })

  test('updating nonexistant blog results in not found', async () => {
    const deletedBlog = await helper.deletedBlog()
    await api
      .put(`/api/blogs/${deletedBlog.id}`)
      .send({ ...deletedBlog, likes: deletedBlog.likes + 1 })
      .expect(404)
  })
})

after(async () => {
  await mongoose.connection.close()
})
