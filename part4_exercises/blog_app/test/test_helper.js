const Blog = require('../models/blogs')

const initialBlogs = [
  {
    title: 'Prueba blog1',
    author: 'Prueba Autor1',
    url: 'Prueba URL',
    likes: 9
  },
  {
    title: 'Prueba blog2',
    author: 'Prueba Autor2',
    url: 'Prueba URL',
    likes: 12
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'test:url' })
  await blog.save()
  await blog.deleteOne({ title: 'willremovethissoon' })

  return blog._id.toString()
}

const blogInDb = async () => {
  const blog = await Blog.find({})
  return blog.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogInDb: blogInDb
}