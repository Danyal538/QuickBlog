import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/Admin/Layout'
import AddBlog from './pages/Admin/AddBlog'
import ListBlog from './pages/Admin/ListBlog'
import Dashboard from './pages/Admin/Dashboard'
import Login from './components/Admin/Login'
import Comments from './pages/Admin/Comments'
import 'quill/dist/quill.snow.css'
import { Toaster } from "react-hot-toast"
import { useAppContext } from './Context/AppContext'

const App = () => {
  const { token } = useAppContext();
  return (
    <div>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:blogId' element={<Blog />} />
        <Route path='/admin' element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path='listBlog' element={<ListBlog />} />
          <Route path='comments' element={<Comments />} />
          <Route path='addBlog' element={<AddBlog />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App