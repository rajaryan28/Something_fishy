import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PostState from "./Context/notes/PostState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Profile from "./components/Profile";
import About from "./components/About";
import FuturePanel from "./components/FuturePanel";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Addpost from "./components/Addpost";
function App() {
  
  return (
    <>
      <PostState>
        <BrowserRouter>
          <Navbar />
          <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/futurepanel" element={<FuturePanel/>} />
          <Route exact path="/forgot-password" element={<ForgotPassword/>} />
          <Route exact path="/resetpassword/:token" element={<ResetPassword/>} />

          <Route exact path="/addpost" element={<Addpost />} />
          <Route exact path="/profile" element={<Profile />} />
          </Routes>
          
        </BrowserRouter>
      </PostState>
    </>
  );
}

export default App;
