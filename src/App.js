//import logo from './logo.svg';
import './App.css';

import React, { useState,useEffect } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {  
  Routes, 
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const App =()=> {
  const pageSize=9;
  const apiKey=process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0)
  
    return (
      <>      
      <div>
     <Router>
     <Navbar/>       
     <LoadingBar
        color='red'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
        
      />
        <Routes >                              
        <Route exact path="/"  element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} category="general" country="in"/>}></Route>
        <Route exact path="/business"  element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} category="business" country="in"/>}></Route>
        <Route exact path="/entertainment"  element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} category="entertainment" country="in"/>}></Route>
        <Route exact path="/science"  element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="science" category="science" country="in"/>}></Route>
        <Route exact path="/health"  element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="health" category="health" country="in"/>}></Route>
        <Route exact path="/sports"  element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="sports" category="sports" country="in"/>}></Route>
        <Route exact path="/technology" key="technology" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} category="technology" country="in"/>}></Route>       
        </Routes>
        </Router>
          
      </div>
           

      </>

    )
  
}
export default App;
