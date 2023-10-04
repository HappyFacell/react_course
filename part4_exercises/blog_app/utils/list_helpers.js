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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
