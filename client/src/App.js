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
import MobileNavbar from './mobile/components/MobileNavbar';
import lsshStar from './images/lsshStar.png';
import { useModalContext } from './context/ModalContext';
import useViewport from './hooks/useViewport';

const App = () => {
    const { infoObj, authObj } = useModalContext();
    const [info] = infoObj;
    const [authState] = authObj;
    const { width } = useViewport();
    const breakpoint = 441;
    const img1BP = 880;
    const img2BP = 630;

    const renderBG = () => {
        return width > img1BP ? (
            <img
                alt="麗山之星"
                src={lsshStar}
                style={{
                    position: 'fixed',
                    bottom: '50%',
                    right: '50%',
                    zIndex: -1,
                    transform: 'translate(50%, 50%)',
                }}
            />
        ) : width > img2BP ? (
            <img
                alt="麗山之星"
                src={lsshStar}
                style={{
                    position: 'fixed',
                    bottom: '50%',
                    right: '50%',
                    zIndex: -1,
                    transform: 'translate(50%, 50%)',
                    width: 500,
                }}
            />
        ) : (
            <img
                alt="麗山之星"
                src={lsshStar}
                style={{
                    position: 'fixed',
                    bottom: '50%',
                    right: '50%',
                    zIndex: -1,
                    transform: 'translate(50%, 50%)',
                    width: 300,
                }}
            />
        );
    };

    return (
        <Router>
            {renderBG()}
            {width > breakpoint ? <Navbar /> : <MobileNavbar />}
            <Routes>
                <Route exact path="*" element={<PageNotFound />} />
                <Route exact path="/" element={<Home />} />
                <Route
                    path="/self-learning-form"
                    element={info ? <Form /> : <Home />}
                />
                <Route
                    path="/self-learning-results"
                    element={info ? <Results /> : <Home />}
                />
                <Route
                    path="/self-learning-edit"
                    element={info ? <Edit /> : <Home />}
                />
                <Route
                    path="/dashboard"
                    element={
                        authState.isUser || authState.isAdmin ? (
                            <Dashboard />
                        ) : (
                            <PageNotAuthorized />
                        )
                    }
                />
                <Route
                    path="/users"
                    element={
                        authState.isAdmin && !authState.isUser ? (
                            <Users />
                        ) : (
                            <PageNotAuthorized />
                        )
                    }
                />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
