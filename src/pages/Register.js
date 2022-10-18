import {useState} from 'react'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {Link, useNavigate} from 'react-router-dom'
import { serverTimestamp, setDoc, doc } from 'firebase/firestore'
import {db} from '../firebase.config'
import {FaEye} from 'react-icons/fa'


function Register() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',

    })

    const {email, name, password} = formData

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
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
            const userDataCopy = {...formData}
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
        <>
        <form onSubmit={handleSubmit}>
            <input type='email' name='email' placeholder='enter email' onChange={handleChange}/>
            <input type='text' name='name' placeholder='enter name' onChange={handleChange}/>
            <input type='text' name='password' placeholder='enter password' onChange={handleChange}/>
            <FaEye />
            <button>Submit</button>
        </form>
        <Link to='/forgot-password'>Forgot password</Link>
        <Link to='/sign-in' >Sign in</Link>
        </>

    
    )
}

export default Register
