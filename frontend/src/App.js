import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import 'react-toastify/ReactToastify.css'
import Register from './pages/Register'
import Posts from './pages/Posts'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/posts' element={<Posts/>}/>
      <Route path='/profile/:userId' element={<Profile/>}/>
      <Route path='/*' element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
