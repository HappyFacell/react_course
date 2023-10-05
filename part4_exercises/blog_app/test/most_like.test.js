const listHelper = require('../utils/list_helpers')

describe('most likes', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBeNull()
  })

  test('when list has one blog, equals that author', () => {
    const singleBlogList = [
      {
        _id: '1',
        title: 'Blog 1',
        author: 'Author 1',
        likes: 5,
        __v: 0,
      },
    ]
    const result = listHelper.mostLikes(singleBlogList)
    const expected = {
      author: 'Author 1',
      likes: 5,
    }
    expect(result).toEqual(expected)
  })

  test('of a list is the author with most likes', () => {
    const blogs = [
      {
        _id: '1',
        title: 'Blog 1',
        author: 'Author 1',
        likes: 5,
        __v: 0,
      },
      {
        _id: '2',
        title: 'Blog 2',
        author: 'Author 2',
        likes: 10,
        __v: 0,
      },
      {
        _id: '3',
        title: 'Blog 3',
        author: 'Author 1',
        likes: 12,
        __v: 0,
      },
    ]

    const result = listHelper.mostLikes(blogs)
    const expected = {
      author: 'Author 1',
      likes: 17,
    }
    expect(result).toEqual(expected)
  })
})
