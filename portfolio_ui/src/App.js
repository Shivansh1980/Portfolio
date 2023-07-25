import logo from './logo.svg';
import './App.css';
import AIModels from './components/ai/AIModels';
import Header from './components/Header';
import Projects from './components/projects/Projects'
import Portfolio from './components/portfolio/Portfolio'
import './common.css'
import 'animate.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter container>
        <Header/>
        <Routes>
          <Route path='/' element={<Portfolio/>}/>
          <Route path='ai_models/' element={<AIModels/>}/>
          <Route path='projects/' element={<Projects/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
