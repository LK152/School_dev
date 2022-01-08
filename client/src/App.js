import './App.css';
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import Results from './components/Results';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Edit from './components/Edit';
import MobileNavbar from './mobile/components/MobileNavbar';
import { ModalContext } from './context/ModalContext';
import useViewport from './hooks/useViewport';

const App = () => {
	const { infoObj } = useContext(ModalContext);
	const [info] = infoObj;
	const { width } = useViewport();
	const breakpoint = 441;

	return (
		<Router>
			{width > breakpoint ? <Navbar /> : <MobileNavbar />}
			<Routes>
				<Route exact path='/' element={info ? <Home /> : <Login />} />
				<Route
					path='/self-learning-form'
					element={info ? <Form /> : <Login />}
				/>
				<Route
					path='/self-learning-results'
					element={info ? <Results /> : <Login />}
				/>
				<Route
					path='/self-learning-edit'
					element={info ? <Edit /> : <Login />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
