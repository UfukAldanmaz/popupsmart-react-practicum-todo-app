import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Todos from './components/Todos';
import Login from './components/Login';
import { ThemeProvider } from './contexts/ThemeContext';


function App() {

  return (
    <div className='App'>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/todos" element={<Todos />} />
          </Routes>
        </BrowserRouter>

      </ThemeProvider>

    </div>
  );
}

export default App;
