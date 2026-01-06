import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

const dataBlog = {
  title: 'Test with vite',
  author: 'Alberto',
  url: 'http://testwithvite.com',
  likes: 1
}

test('It displays the title and author by default', () => {
  const { container } = render(<Blog blog={dataBlog} />)
  const title = container.querySelector('.title h4')
  const likes = container.querySelector('.likes')
  const url = container.querySelector('.url')

  expect(title).toHaveTextContent(`${dataBlog.title} - ${dataBlog.author}`)
  expect(likes).toBeNull()
  expect(url).toBeNull()
})

test('The URL and likes are displayed when showing details', async () => {
  const user = userEvent.setup()
  const { container } = render(<Blog blog={dataBlog} />)

  const btnView = screen.getByText('view')
  await user.click(btnView)
  const url = container.querySelector('.url')
  const likes = container.querySelector('.likes')

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('The likes controller must be called twice', async () => {
  const updateLike = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<Blog blog={dataBlog} updateLike={updateLike}/>)
  const btnView = container.querySelector('.title button')
  await user.click(btnView)
  const btnLike = container.querySelector('.likes button')
  await user.dblClick(btnLike)
  console.log(updateLike.mock.calls)

  expect(updateLike.mock.calls).toHaveLength(2)
})