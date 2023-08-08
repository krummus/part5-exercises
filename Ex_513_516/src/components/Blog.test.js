import React from 'react'
import { useState } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlog from './CreateBlog'

test ('rendered blog', () => {
    const blog = {
        'id': '61e0a7a4b731860c76aa9a10',
        'title': 'How to make a cake',
        'author': 'Martha Stewart',
        'url': 'http://makecake.com',
        'likes': 10,
        'users': ['620e4a6ddfa39b9c0639df9f']
    }
    console.log(blog)

    render(<Blog id={blog.id} blog={blog} />)

    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug()

    const elementTitle = screen.queryByText('How to make a cake')
    const elementAuthor = screen.queryByText('Martha Stewart')
    const elementLikes = screen.getByTestId('togglableContent')
    
    expect(elementTitle).toBeDefined()
    expect(elementAuthor).toBeDefined()
    expect(elementLikes).toHaveStyle('display: none')
})

test ('renderd content, when button pressed', async () => {
    const blog = {
        'id': '61e0a7a4b731860c76aa9a10',
        'title': 'How to make a cake',
        'author': 'Martha Stewart',
        'url': 'http://makecake.com',
        'likes': 10,
        'users': ['620e4a6ddfa39b9c0639df9f']
    }

    const mockHandler = jest.fn()

    render(<Blog id={blog.id} blog={blog} />)

    const elementLikes = screen.getByTestId('togglableContent')
    expect(elementLikes).toHaveStyle('display: none')
    
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const elementURL = screen.queryByText('How to make a cake')
    const elementLikes2 = screen.getByTestId('togglableContent')
    expect(elementLikes2).not.toHaveStyle('display: none')

    expect(elementURL).toBeDefined()
})

test ('event handler called twice', async () => {
    const blog = {
        'id': '61e0a7a4b731860c76aa9a10',
        'title': 'How to make a cake',
        'author': 'Martha Stewart',
        'url': 'http://makecake.com',
        'likes': 10,
        'users': ['620e4a6ddfa39b9c0639df9f']
    }

    const mockHandler = jest.fn()
    const user = userEvent.setup()

    render(<Blog id={blog.id} blog={blog} handleAddLike={mockHandler}/>)

    const elementLikes = screen.getByTestId('togglableContent')
    expect(elementLikes).toHaveStyle('display: none')
    
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
})

test ('submit form functions', async () => {

    const mockHandler = jest.fn()
    const user = userEvent.setup()

    render(<CreateBlog handleCreateBlog={mockHandler}/>)
    
    const button = screen.getByText('create')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})

