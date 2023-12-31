const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogs')
const User = require('../models/users')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there is initially some notes saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map((r) => r.title)

    expect(contents).toContain('Prueba blog2')
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)

  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    // console.log(validNonexistingId)

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })

})


describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Prueba blog3',
      author: 'Prueba Autor3',
      url: 'Prueba URL',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'Prueba blog3'
    )
  })

  test('succeeds with status code 201 if likes is missing', async () => {
    const newBlog = {
      title: 'Prueba blog3',
      author: 'Prueba Autor3',
      url: 'Prueba URL',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'Prueba blog3'
    )
  })


  test('fails with status code 400 if title is missing', async () => {
    const newBlog = {
      author: 'Prueba Autor3',
      url: 'Prueba URL',
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const blogsAtEnd = await helper.blogInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails with status code 400 if url is missing', async () => {
    const newBlog = {
      title: 'Prueba blog3',
      author: 'Prueba Autor3',
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const blogsAtEnd = await helper.blogInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog' , () => {
  test('succeed with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const title = blogsAtEnd.map((r) => r.title)

    expect(title).not.toContain(blogToDelete.title)
  })
})


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})