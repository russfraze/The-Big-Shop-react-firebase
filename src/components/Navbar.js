import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getAuth } from 'firebase/auth'

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
    console.log(navIsOpen)

    return (
        <nav className='navigation'>

            <div className='logo'>
                <h1>BIGSHOP</h1>
            </div>

            <div className='burger' onClick={() => setNavIsOpen(!navIsOpen)}>
                <div className='line1'></div>
                <div className='line2'></div>
                <div className='line3'></div>
            </div>

            <div className={navIsOpen ? 'navigation-menu expanded' : 'navigation-menu'}>
                <ul>

                    <li onClick={() => navigate('/')}>
                        <p className={pathMatchRoute('/') ? 'navbar-active' : ''} >Home</p>
                    </li>


                    {!auth.currentUser &&
                        <li onClick={() => navigate('/register')}>
                            <p className={pathMatchRoute('/register') ? 'navbar-active' : ''}>Register</p>
                        </li>}

                    {!auth.currentUser &&
                        <li onClick={() => navigate('/sign-in')}>
                            <p className={pathMatchRoute('/sign-in') ? 'navbar-active' : ''}>Sign in</p>
                        </li>}

                    {auth.currentUser &&
                        <li onClick={() => navigate('/recipe-book')}>
                            <p className={pathMatchRoute('/recipe-book') ? 'navbar-active' : ''}>Recipe Book</p>
                        </li>}

                    {auth.currentUser &&
                        <li onClick={() => navigate('/shopping-list')}>
                            <p className={pathMatchRoute('/shopping-list') ? 'navbar-active' : ''}>Shopping list</p>
                        </li>}


                    <li onClick={() => navigate('/profile')}>
                        <p className={pathMatchRoute('/profile') ? 'navbar-active' : ''}>Profile</p>
                    </li>

                </ul>
            </div>



        </nav>
    )
}

export default Navbar
