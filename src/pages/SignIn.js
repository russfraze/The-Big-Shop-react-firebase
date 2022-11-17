import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import '../styles/signIn.css'


function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',

    })

    const { email, password } = formData
    
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

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
            //sign in user
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            //get the user
            const user = userCredential.user

            if (userCredential.user) {
                navigate('/')
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className={'signInDiv'}>

            <h1 className={'signHead'}>Sign In</h1>

            <div className={'signInForm'}>
                <form className={'signInInputs'} onSubmit={handleSubmit}>
                    <input type='email' name='email' placeholder='enter email' onChange={handleChange} />
                    <input type={showPassword ? 'text' : 'password'} name='password' placeholder='enter password' onChange={handleChange} />
                    <FaEye className={'signInEye'} onClick={() => setShowPassword(!showPassword)} />
                    <button className='button-main signBtn'>Submit</button>
                </form>

                <Link className='text-link' to='/forgot-password'>
                    <p>Forgot password?</p>
                </Link>
            </div>
        </div>

    )
}

export default SignIn

