import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import PostState from "./Context/notes/PostState";
function App() {
  return (
    <>
      <PostState>
        <BrowserRouter>
          <Navbar />

          <Footer />
        </BrowserRouter>
      </PostState>
    </>
  );
}

export default App;
