const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('author with most blogs', () => {
  test('when list has zero blogs, equals null', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, null)
  })

  test('when list has only one blog, equals author of that blog', () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('when list has more than one blog, equals author with most blogs', () => {
    const result = listHelper.mostBlogs(helper.listWithManyBlogs)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })
})
