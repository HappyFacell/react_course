const listHelper = require('../utils/list_helpers')

describe('total likes', () => {
  const emptyList = []
  const singleBlogList = [
    {
      title: 'Blog 1',
      author: 'Author 1',
      likes: 5,
    },
  ]
  const multipleBlogsList = [
    {
      title: 'Blog 1',
      author: 'Author 1',
      likes: 5,
    },
    {
      title: 'Blog 2',
      author: 'Author 2',
      likes: 10,
    },
    {
      title: 'Blog 3',
      author: 'Author 3',
      likes: 15,
    },
  ]

  test('of empty list is 0', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that blog', () => {
    const result = listHelper.totalLikes(singleBlogList)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated correctly', () => {
    const result = listHelper.totalLikes(multipleBlogsList)
    expect(result).toBe(30)
  })
})