import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Feed from './pages/Feed.tsx'
import Upload from './pages/Upload.tsx'
import Profile from './pages/Profile.tsx'
import Post from './pages/Post.tsx'
import ProtectedRoutes from './components/ProtectedRoutes.tsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><Feed /></ProtectedRoutes>
  },
  {
    path: "/upload",
    element: <ProtectedRoutes><Upload /></ProtectedRoutes>
  },
  {
    path: "/post",
    element: <ProtectedRoutes><Post /></ProtectedRoutes>
  },
  {
    path: "/profile",
    element: <ProtectedRoutes><Profile /></ProtectedRoutes>
  },
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
    <App />
  </>
)
