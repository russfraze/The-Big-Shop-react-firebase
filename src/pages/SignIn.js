import {useState} from 'react'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {Link, useNavigate} from 'react-router-dom'
import {FaEye} from 'react-icons/fa'


function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',

    })

    const {email, password} = formData

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
            //sign in user
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            //get the user
            const user = userCredential.user
        
            if(userCredential.user){
                navigate('/')
            }

        } catch (error) {
            console.log(error)
        }
      
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type='email' name='email' placeholder='enter email' onChange={handleChange}/>
            <input type='text' name='password' placeholder='enter password' onChange={handleChange}/>
            <FaEye />
            <button>Submit</button>
        </form>
        <Link className='text-link' to='/forgot-password'>
        <p>Forgot password?</p>
        </Link>
        </>

    
    )
}

export default SignIn

