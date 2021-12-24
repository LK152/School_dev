import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import Results from './components/Results';
import Navbar from './components/Navbar';
import Login from './components/Login';

const App = () => {
  const [isLoggedIn, setAuth] = useState(false);
  const [id, setId] = useState('');
  
  return (
    <Router>
      <Navbar auth={setAuth} id={setId} />
      <Routes>
        <Route exact path="/" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/self-learning-form" element={isLoggedIn ? <Form id={id} /> : <Login />} />
        <Route path="/self-learning-results" element={isLoggedIn ? <Results /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
