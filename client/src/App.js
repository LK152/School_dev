import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import Results from './components/Results';
import Navbar from './components/Navbar';
import Edit from './components/Edit';
import Footer from './components/Footer';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import MobileNavbar from './mobile/components/MobileNavbar';
import { useModalContext } from './context/ModalContext';
import useViewport from './hooks/useViewport';

const App = () => {
	const { infoObj, boolObj, adminObj } = useModalContext();
	const [info] = infoObj;
	const [isUser] = boolObj;
	const [isAdmin] = adminObj;
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
				<Route path='/user-login' element={!info && <Login />} />
				<Route path='/dashboard' element={isUser && <Dashboard />} />
				<Route path='/users' element={isAdmin && <Users />} />
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;
