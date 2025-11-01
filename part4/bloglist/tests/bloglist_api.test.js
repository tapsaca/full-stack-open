const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.listWithManyBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
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
  test('blog is correctly added to the database', async () => {
    const newBlog = {
      title: 'Title',
      author: 'Author',
      url: 'http://url.com',
      likes: 1
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
  })

  test('blog with missing likes property defaults to 0', async () => {
    const newBlog = {
      title: 'No Likes',
      author: 'Disliked',
      url: 'http://meh.com'
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
    const newBlog = {
      author: 'Untitled',
      url: 'http://untitled.com',
      likes: 1
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
  })

  test('url missing results in bad request', async () => {
    const newBlog = {
      title: 'No URL',
      author: 'Urless',
      likes: 1
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
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
})

after(async () => {
  await mongoose.connection.close()
})
