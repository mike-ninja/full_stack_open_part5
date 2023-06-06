import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Michel Edubas',
    url: 'Some link',
    likes: 5,
    user: {
      name: 'mike'
    }
  }

  const loggedUser = {
    username: 'mike-ninja',
    name: 'mike'
  }

  const { container } = render(<Blog blog={blog} loggedUser={loggedUser} />)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})


