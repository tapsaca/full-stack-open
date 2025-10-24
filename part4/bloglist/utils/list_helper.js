const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  return blogs.reduce((favorite, blog) => {
    return favorite.likes > blog.likes ? favorite : blog
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const blogsByAuthor = _.countBy(blogs, 'author')
  const mostBlogs = _.max(Object.values(blogsByAuthor))
  return {
    author: _.find(Object.keys(blogsByAuthor), (author) => { return blogsByAuthor[author] === mostBlogs }),
    blogs: mostBlogs
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
