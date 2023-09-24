import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Projects from './components/projects/Projects'
import Portfolio from './components/portfolio/Portfolio'
import './common.css'
import 'animate.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AIModelCardsView from './components/ai/AIModelCardsView';


function App() {
  return (
    <>
      <BrowserRouter container>
        <Header/>
        <Routes>
          <Route path='/' element={<Portfolio/>}/>
          <Route path='ai/' element={<AIModelCardsView/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
