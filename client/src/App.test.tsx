import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders Puppies header', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Puppies/i)
  expect(linkElement).toBeInTheDocument()
})
