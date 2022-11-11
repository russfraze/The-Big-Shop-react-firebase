import {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import FullRecipe from './pages/FullRecipe'
import ShoppingList from './pages/ShoppingList';
import RecipeBook from './pages/RecipeBook';
import PrivateRoute from './components/PrivateRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  const [ usersRecipes, setUsersRecipes] = useState('nothing yet')



  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/:recipeId' element={<PrivateRoute />} >
            <Route path='/:recipeId' element={<FullRecipe savedRecipes={usersRecipes}/>}></Route>
          </Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/sign-in' element={<SignIn />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>

          <Route path='profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />}></Route>
          </Route>

          <Route path='shopping-list' element={<PrivateRoute />}>
            <Route path='/shopping-list' element={<ShoppingList />}></Route>
          </Route>
          
          <Route path='recipe-book' element={<PrivateRoute />}>
            <Route path='/recipe-book' element={<RecipeBook liftUsersRecipes={setUsersRecipes}/>}></Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer />


    </>
    
  );
}

export default App;
