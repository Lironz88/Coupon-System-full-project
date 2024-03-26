import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Layout/Header/Header';
import Side from './Components/Layout/Side/Side';
import Main from './Components/Layout/Main/Main';
import Footer from './Components/Layout/Footer/Footer';
import theme from './Service/Theme';
import { ThemeProvider } from '@emotion/react';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Header/>
      <Side/>
      <Main/>
      <Footer/>
    </div>
    </ThemeProvider>
  );
}

export default App;
