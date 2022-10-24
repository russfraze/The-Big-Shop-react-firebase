import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()

    return (
        <div>
            <div className='navbar sticky'>

                <ul className='nav-links'>
                    <li onClick={() => navigate('/')}>
                        <p>Home</p>
                    </li>
                    <li onClick={() => navigate('/register')}>
                        <p>Register</p>
                    </li>
                    <li onClick={() => navigate('/sign-in')}>
                        <p>Sign in</p>
                    </li>
                    <li onClick={() => navigate('/recipe-book')}>
                        <p>Recipe Book</p>
                    </li>
                    <li onClick={() => navigate('/shopping-list')}>
                        <p>Shopping list</p>
                    </li>
                    <li onClick={() => navigate('/profile')}>
                        <p>Profile</p>
                    </li>
                </ul>

            </div>
        </div>
    )
}

export default Navbar
