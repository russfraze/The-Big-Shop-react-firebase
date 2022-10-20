import {useState, useEffect} from 'react'
import {getAuth} from 'firebase/auth'
import {Navigate, useNavigate} from 'react-router-dom'
import {FaSignOutAlt} from 'react-icons/fa'

function Profile() {
    const auth = getAuth()

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    const {name, email} = userData

    const logOut = () => {
        auth.signOut()
        navigate('/')
    }

    return (
        <div>
            Profile Page
            <h2>Welcome {name}</h2>
            <FaSignOutAlt onClick={logOut} />Sign Out
        </div>
    )
}

export default Profile
