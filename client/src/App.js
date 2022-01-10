import './App.css';
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import Results from './components/Results';
import Navbar from './components/Navbar';
import Edit from './components/Edit';
import Footer from './components/Footer';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MobileNavbar from './mobile/components/MobileNavbar';
import { ModalContext } from './context/ModalContext';
import useViewport from './hooks/useViewport';

const App = () => {
	const { infoObj, userObj } = useContext(ModalContext);
	const [info] = infoObj;
	const [user] = userObj;
	const { width } = useViewport();
	const breakpoint = 441;

	return (
		<Router>
			{width > breakpoint ? <Navbar /> : <MobileNavbar />}
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route
					path='/self-learning-form'
					element={info ? <Form /> : <Home />}
				/>
				<Route
					path='/self-learning-results'
					element={info ? <Results /> : <Home />}
				/>
				<Route
					path='/self-learning-edit'
					element={info ? <Edit /> : <Home />}
				/>
				<Route 
					path='/user-login' 
					element={<Login />} 
				/>
				<Route
					path='/dashboard'
					element={info ? !info.emailVerified && <Dashboard /> : <Home />} 
				/>
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;
