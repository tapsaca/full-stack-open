const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('author with most likes', () => {
  test('when list has zero blogs, equals null', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, null)
  })

  test('when list has only one blog, equals author of that blog', () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test('when list has more than one blog, equals author with most likes', () => {
    const result = listHelper.mostLikes(helper.listWithManyBlogs)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
  })
})
