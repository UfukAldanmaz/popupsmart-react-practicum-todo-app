import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Todos from './components/Todos';
import Login from './components/Login';
import { ThemeProvider } from './contexts/ThemeContext';


function App() {

  return (
    <div className='App'>
      <ThemeProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/todos" element={<Todos />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
