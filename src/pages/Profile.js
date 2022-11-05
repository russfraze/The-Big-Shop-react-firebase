import { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { Navigate, useNavigate } from 'react-router-dom'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import profile from '../styles/profile.module.css'
import { FaSignOutAlt } from 'react-icons/fa'

function Profile() {

    const [changeDetails, setChangeDetails] = useState(false)

    const auth = getAuth()

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    const { name, email } = userData

    const logOut = () => {
        auth.signOut()
        navigate('/')
    }

    function handleChange(e) {
        setUserData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = async () => {
        try {
            if (name !== auth.currentUser.displayName) {
                await updateProfile(auth.currentUser, {
                    displayName: name
                })

                const userRef = doc(db, 'users', auth.currentUser.uid)
                await updateDoc(userRef, {
                    name
                })
            }
        } catch (error) {

        }
    }

    return (
        <div className={profile.profileDiv}>
            <h1>Profile</h1>

            <div className={profile.detailsPanel}>

                <h2>Welcome {name}</h2>

                <h3>Personal details</h3>
                <form>
                    <input
                        className={!changeDetails ? 'input-active' : 'input-disabled'}
                        type='text'
                        value={name}
                        id='name'
                        disabled={!changeDetails}
                        onChange={handleChange}
                    />
                    <input
                        className={!changeDetails ? 'input-active' : 'input-disabled'}
                        type='email'
                        value={email}
                        id='email'
                        disabled={!changeDetails}
                        onChange={handleChange}
                    />
                </form>
                <p className='change-details-btn' onClick={() => {
                    changeDetails && onSubmit()
                    setChangeDetails((prevState) => !prevState)
                }}>{changeDetails ? 'done' : 'change'}</p>

                <div className={profile.signOut} >
                    <FaSignOutAlt onClick={logOut} />
                    <p>Sign out</p>
                </div>

            </div>


        </div>
    )
}

export default Profile
