import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Readings from './pages/Readings'
import BlogIndex from './pages/BlogIndexPublic'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Kabbalah from './pages/Kabbalah'
import ShemAngels from './pages/ShemAngels'
import AdminNewPost from './pages/AdminNewPost'
import AuthCallback from './pages/AuthCallback'
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import PostsListPage from './pages/PostsListPage';
import PublicPostPage from './pages/PublicPostPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'readings', element: <Readings /> },
      { path: 'blog', element: <BlogIndex /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'admin/new-post', element: <AdminNewPost /> },
      { path: 'auth/callback', element: <AuthCallback /> },
      { path: "/admin/posts", element: <PostsListPage /> },
      { path: "/admin/posts/new", element: <CreatePostPage /> },
      { path: "/admin/posts/:id/edit", element: <EditPostPage />},
      { path: "/blog/:slug", element: <PublicPostPage /> },
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
