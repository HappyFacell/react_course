import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { vi, expect, test } from 'vitest'

import Blog from './Blog'

const user = {
  name: 'John',
  username: 'John',
}

const blog = {
  title: 'Batman: Year One',
  author: 'Frank Miller',
  url: 'www.batmanone.com',
  likes: 78,
  user: {
    name: 'John',
    username: 'John',
  }
}

test('renders title and author', () => {

  const mockHandler = vi.fn()

  render(<Blog blog={blog} like={mockHandler} />)

  const div = screen.getByText(/Batman/i)

  expect(div.textContent).toBe('Batman: Year One Frank Miller')
  expect(div.textContent).not.toBe(blog.url)

})

test('url and likes show on button click', async () => {

  const mockHandler = vi.fn()

  render(<Blog blog={blog} like={mockHandler} user={user}/>)

  const button = screen.getByText('view')

  fireEvent.click(button)

  const div = screen.getByText(/www.batmanone.com/i)
  const like = screen.getByText(/78/i)

  expect(div.textContent).toBe(blog.url)
  expect(like.textContent).toBe('likes: ' + blog.likes)

})

// test('like button clicked calls handler', async () => {

//   const mockHandler = vi.fn()

//   render(<Blog blog={blog} like={mockHandler} />)

//   const button = screen.getByText('like')
//   fireEvent.click(button)

//   expect(mockHandler).toHaveBeenCalledTimes(1)

// })
// test('clicking like button twice, calls the handler twice', () => {
//   const btn = component.getByText('view')
//   fireEvent.click(btn)

//   const btnLikes = component.container.querySelector('.btnLikes')

//   for (let x = 0; x < 2; x++) {
//     fireEvent.click(btnLikes)
//   }

//   expect(mockHandler.mock.calls).toHaveLength(2)
// })