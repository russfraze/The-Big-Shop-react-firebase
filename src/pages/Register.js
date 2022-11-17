import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { serverTimestamp, setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { FaEye } from 'react-icons/fa'
import '../styles/register.css'


function Register() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',

    })

    const { email, name, password } = formData

    const [showPassword, setShowPassword] = useState(false)
    
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            //get auth value
            const auth = getAuth()
            //register user and store in variable 
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            //get the user
            const user = userCredential.user
            //update display name
            updateProfile(auth.currentUser, {
                displayName: name
            })
            //Make a copy of the user data from state and delete the password
            const userDataCopy = { ...formData }
            delete userDataCopy.password
            //add timestamp property with the timestamp function 
            userDataCopy.timestamp = serverTimestamp()
            //update the database adding user to users collection
            await setDoc(doc(db, 'users', user.uid), userDataCopy)

            //redirect
            navigate('/')

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className={'registerDiv'}>

            <h1 className={'registerHead'}>Register</h1>

            <form className={'registerForm'} onSubmit={handleSubmit}>
                <div className={'registerInputs'}>
                    <input type='email' name='email' placeholder='enter email' onChange={handleChange} />
                    <input type='text' name='name' placeholder='enter name' onChange={handleChange} />
                    <input type={showPassword ? 'text' : 'password'} name='password' placeholder='enter password' onChange={handleChange} />


                    <div className={'registerButtons'}>
                        <FaEye className='registerEye' onClick={() => setShowPassword(!showPassword)} />
                        <div className={'registerSubBtn'}>
                            <button className='button-main'>Submit</button>
                        </div>
                        <Link className={'registerTextLink'} to='/forgot-password'>
                            <p>Forgot password?</p>
                        </Link>
                        <Link className={'registerTextLink'} to='/sign-in' >
                            <p>Sign in</p>
                        </Link>
                    </div>
                </div>

            </form>



        </div>


    )
}

export default Register
