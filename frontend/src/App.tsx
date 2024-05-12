import { Route, Routes, createBrowserRouter } from "react-router-dom"
import AuthModal from "./modals/AuthModal"
import Feed from './pages/Feed.tsx'
import Upload from './pages/Upload.tsx'
import Profile from './pages/Profile.tsx'
import Post from './pages/Post.tsx'
import ProtectedRoutes from './components/ProtectedRoutes.tsx';
import MainLayout from "./layout/MainLayout.tsx"
function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <ProtectedRoutes><Feed /></ProtectedRoutes>
  //   },
  //   {
  //     path: "/upload",
  //     element: <ProtectedRoutes><Upload /></ProtectedRoutes>
  //   },
  //   {
  //     path: "/post",
  //     element: <ProtectedRoutes><Post /></ProtectedRoutes>
  //   },
  //   {
  //     path: "/profile",
  //     element: <ProtectedRoutes><Profile /></ProtectedRoutes>
  //   },
  // ])
  return (
    <div>
      <MainLayout>
        <Routes>
          <Route path="/" element={<ProtectedRoutes><Feed /></ProtectedRoutes>}></Route>
          <Route path="/upload" element={<ProtectedRoutes><Upload /></ProtectedRoutes>}></Route>
          <Route path="/post" element={<ProtectedRoutes><Post /></ProtectedRoutes>}></Route>
          <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>}></Route>
        </Routes>
        <AuthModal />
      </MainLayout>
    </div>
  )
}

export default App
