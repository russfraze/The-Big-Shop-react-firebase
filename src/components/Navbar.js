import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import './styles/navbar.css'

function Navbar() {
    const [navIsOpen, setNavIsOpen] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    const auth = getAuth()


    const pathMatchRoute = (route) => {
        if (route === location.pathname) {
            return true
        }
    }
    // console.log(navIsOpen)

    return (
        <nav className='navigation' onClick={navIsOpen ? () => setNavIsOpen(!navIsOpen) : null}>


            <div className='burger' onClick={() => setNavIsOpen(!navIsOpen)}>
                <div className='line-1'></div>
                <div className='line-2'></div>
                <div className='line-3'></div>
            </div>

            <div className={navIsOpen ? 'navigation-menu expanded' : 'navigation-menu'}>
                <ul>

                    <li onClick={() => navigate('/')}>
                        <p className={pathMatchRoute('/') ? 'navbar-active' : 'navbar-inactive'} >Home</p>
                    </li>


                    {!auth.currentUser &&
                        <li onClick={() => navigate('/register')}>
                            <p className={pathMatchRoute('/register') ? 'navbar-active' : 'navbar-inactive'}>Register</p>
                        </li>}

                    {!auth.currentUser &&
                        <li onClick={() => navigate('/sign-in')}>
                            <p className={pathMatchRoute('/sign-in') ? 'navbar-active' : 'navbar-inactive'}>Sign in</p>
                        </li>}

                    {auth.currentUser &&
                        <li onClick={() => navigate('/recipe-book')}>
                            <p className={pathMatchRoute('/recipe-book') ? 'navbar-active' : 'navbar-inactive'}>Recipe Book</p>
                        </li>}

                    {auth.currentUser &&
                        <li onClick={() => navigate('/shopping-list')}>
                            <p className={pathMatchRoute('/shopping-list') ? 'navbar-active' : 'navbar-inactive'}>Shopping list</p>
                        </li>}


                    <li onClick={() => navigate('/profile')}>
                        <p className={pathMatchRoute('/profile') ? 'navbar-active' : 'navbar-inactive'}>Profile</p>
                    </li>

                </ul>
            </div>



        </nav>
    )
}

export default Navbar
