import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/sign-in' element={<SignIn />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
