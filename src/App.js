import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Posts from './Components/Posts';
import Editpost from './Components/Editpost';
import Createpost from './Components/Createpost';
import Singlepost from './Components/Singlepost';
import Navbar from "./Components/Navbar"
import Profiles from "./Components/Profiles"
import Mypost from './Components/Mypost';

function App() {
  const user = useSelector((state) => state.user)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Posts />} />
        <Route path='*' element={<Posts />} />
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </>
        )}
        {user && (
          <>
            <Route path='/profile' element={<Profiles />} />
            <Route path='/myposts' element={<Mypost />} />
            <Route path='/create' element={<Createpost />} />
            <Route path='/post/:id' element={<Singlepost />} />
            <Route path='/edit/:id' element={<Editpost />} />
          </>
        )}



      </Routes>
    </BrowserRouter>
  );
}

export default App;
