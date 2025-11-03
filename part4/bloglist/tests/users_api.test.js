const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('password', 10)
  const user = new User({ username: 'root', name: 'superuser', passwordHash })
  await user.save()
})

describe('GET', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('passwordHash is not defined', async () => {
    const response = await api.get('/api/users')
    assert.ok(!('passwordHash' in response.body[0]))
  })
})

describe('POST', () => {
  test('new user can be created', async () => {
    const usersAtStart = await helper.usersInDatabase()
    const newUser = {
      username: 'abc',
      password: 'abc'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDatabase()
    const usernames = usersAtEnd.map((user) => user.username)
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    assert(usernames.includes(newUser.username))
  })

  test('results in 400 if password is missing', async () => {
    const usersAtStart = await helper.usersInDatabase()
    await api
      .post('/api/users')
      .send({ username: 'username' })
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDatabase()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('results in 400 if password is shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDatabase()
    await api
      .post('/api/users')
      .send({ username: 'username', password: 'ab' })
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDatabase()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
