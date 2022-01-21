import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import Results from './components/Results';
import Navbar from './components/Navbar';
import Edit from './components/Edit';
import Footer from './components/Footer';
import PageNotFound from './components/PageNotFound';
import PageNotAuthorized from './components/PageNotAuthorized';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Developer from './components/Developer';
import MobileNavbar from './mobile/components/MobileNavbar';
import { useModalContext } from './context/ModalContext';
import useViewport from './hooks/useViewport';

const App = () => {
	const { infoObj, authObj } = useModalContext();
	const [info] = infoObj;
	const [authState] = authObj;
	const { width } = useViewport();
	const breakpoint = 441;

	return (
		<Router>
			<div className='minHeight'>
				{width > breakpoint ? <Navbar /> : <MobileNavbar />}
				<Routes>
					<Route exact path='*' element={<PageNotFound />} />
					<Route exact path='/' element={<Home />} />
					<Route exact path='/developer' element={<Developer />} />
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
						path='/dashboard'
						element={
							authState.isUser || authState.isAdmin ? (
								<Dashboard />
							) : (
								<PageNotAuthorized />
							)
						}
					/>
					<Route
						path='/users'
						element={
							authState.isAdmin && !authState.isUser ? (
								<Users />
							) : (
								<PageNotAuthorized />
							)
						}
					/>
				</Routes>
			</div>
			<Footer />
		</Router>
	);
};

export default App;
