import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import PostState from "./Context/notes/PostState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
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
          </Routes>
          
          <Footer />
        </BrowserRouter>
      </PostState>
    </>
  );
}

export default App;
