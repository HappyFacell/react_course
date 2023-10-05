const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let maxLikes = -1
  let favorite = null

  for (const blog of blogs) {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
      favorite = blog
    }
  }

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blogCounts = {}
  let maxAuthor = ''
  let maxBlogs = 0

  for (const blog of blogs) {
    const author = blog.author
    blogCounts[author] = (blogCounts[author] || 0) + 1

    if (blogCounts[author] > maxBlogs) {
      maxAuthor = author
      maxBlogs = blogCounts[author]
    }
  }

  return {
    author: maxAuthor,
    blogs: maxBlogs,
  }
}


const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorLikes = {}

  for (const blog of blogs) {
    const author = blog.author
    const likes = blog.likes
    authorLikes[author] = (authorLikes[author] || 0) + likes
  }

  const maxAuthor = Object.keys(authorLikes).reduce((a, b) => authorLikes[a] > authorLikes[b] ? a : b)

  return {
    author: maxAuthor,
    likes: authorLikes[maxAuthor],
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
