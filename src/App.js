import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/footer';
function App() {
  return (
    <>
       <BrowserRouter>
       <Navbar/>

       <Footer/>
        </BrowserRouter>
    </>
  );
}

export default App;
