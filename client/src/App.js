import './App.css';
import Home from './components/Home';
import Form from './components/Form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Results from './components/Results';
import Navbar from './components/Navbar';

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/self-learning-form" element={<Form />} />
          <Route path="/self-learning-results" element={<Results />} />
        </Routes>
      </Router>
  );
}

export default App;
