import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormBlog from './FormBlog'
import { expect } from 'vitest'

test('The submit controller receives the data from the new blog', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()
  const { container } = render(<FormBlog createBlog={createBlog} />)
  const inputTitle = container.querySelector('#input-title')
  const inputAuthor = container.querySelector('#input-author')
  const inputUrl = container.querySelector('#input-url')
  const btnSubmit = container.querySelector('#submit-blog')

  await user.type(inputTitle, 'Blog test')
  await user.type(inputAuthor, 'Alberto')
  await user.type(inputUrl, 'test.com')

  await user.click(btnSubmit)
  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Blog test',
    author: 'Alberto',
    url: 'http://test.com',
    likes: 0
  })
})
