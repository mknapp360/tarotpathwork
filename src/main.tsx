import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Readings from './pages/Readings'
import BlogIndex from './pages/BlogIndex'
import Contact from './pages/Contact'
import Kabbalah from './pages/Kabbalah'
import ShemAngels from './pages/ShemAngels'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'readings', element: <Readings /> },
      { path: 'blog', element: <BlogIndex /> },
      { path: 'contact', element: <Contact /> },
      { path: 'kabbalah', element: <Kabbalah /> },
      { path: 'shem-angels', element: <ShemAngels /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
