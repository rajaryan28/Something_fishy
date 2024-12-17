import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/footer';
function App() {
  return (
    <>
       <BrowserRouter>
       <Navbar/>
        <center>Hello this is Raj aryan</center>
       <Footer/>
        </BrowserRouter>
    </>
  );
}

export default App;
