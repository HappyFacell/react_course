const listHelper = require('../utils/list_helpers')

describe('most blogs', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBeNull()
  })

  test('when list has one blog, equals that author', () => {
    const singleBlogList = [
      {
        title: 'Blog 1',
        author: 'Author 1',
      }
    ]
    const result = listHelper.mostBlogs(singleBlogList)
    const expected = {
      author: 'Author 1',
      blogs: 1,
    }
    expect(result).toEqual(expected)
  })

  test('of a list is the author with most blogs', () => {
    const blogs = [
      {
        title: 'Blog 1',
        author: 'Author 1',
      },
      {
        title: 'Blog 2',
        author: 'Author 2',
      },
      {
        title: 'Blog 3',
        author: 'Author 1',
      },
    ]
    const result = listHelper.mostBlogs(blogs)
    const expected = {
      author: 'Author 1',
      blogs: 2,
    }
    expect(result).toEqual(expected)
  })
})

test('of a list is the lot of authors with most blogs', () => {
  const blogs = [
    {
      title: 'Blog 1',
      author: 'Author 1',
    },
    {
      title: 'Blog 2',
      author: 'Author 2',
    },
    {
      title: 'Blog 3',
      author: 'Author 1',
    },
    {
      title: 'Blog 4',
      author: 'Author 1',
    },
    {
      title: 'Blog 5',
      author: 'Author 2',
    },
    {
      title: 'Blog 6',
      author: 'Author 2',
    },
  ]
  const result = listHelper.mostBlogs(blogs)
  const expected = {
    author: 'Author 1',
    blogs: 3,
  }
  expect(result).toEqual(expected)
})
