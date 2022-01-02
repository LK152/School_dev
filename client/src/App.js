import './App.css';
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import Results from './components/Results';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Edit from './components/Edit';
import { ModalContext } from './context/ModalContext';

const App = () => {
	const { infoObj } = useContext(ModalContext);
	const [infoVal] = infoObj;

	return (
		<Router>
			<Navbar />
			<Routes>
				<Route
					exact
					path='/'
					element={infoVal.isLoggedIn ? <Home /> : <Login />}
				/>
				<Route
					path='/self-learning-form'
					element={infoVal.isLoggedIn ? <Form /> : <Login />}
				/>
				<Route
					path='/self-learning-results'
					element={infoVal.isLoggedIn ? <Results /> : <Login />}
				/>
				<Route
					path='/self-learning-edit'
					element={infoVal.isLoggedIn ? <Edit /> : <Login />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
