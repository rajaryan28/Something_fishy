import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import PostState from "./Context/notes/PostState";
import Posts from "./components/Post";
function App() {
  return (
    <>
      <PostState>
        <BrowserRouter>
          <Navbar />
          <Posts/>
          <Footer />
        </BrowserRouter>
      </PostState>
    </>
  );
}

export default App;
