import Login from "./components/login";
import HomePage from "./canvas/HomePage";
import Image from "./images/image";
import Test from "./canvas/Test"
import Images from "./components/images"
import "./App.css";
import Navbar from './components/navbar';
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import React, { Component }  from 'react';

function App() {
  return (
    <BrowserRouter>
    
    {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/home" element={<Login />}></Route>
        <Route path="/image" element={<Image />}></Route>
        <Route path = "/images/:id" element = {<Images/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
