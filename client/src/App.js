import './App.css';
import Home from './components/Home';
import Form from './components/Form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/self-learning-form" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
