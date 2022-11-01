import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'react-toastify'

function ForgotPassword() {
    const [email, setEmail] = useState('')


    const onChange = (e) => {
        setEmail(e.target.value)
    }


    const onSubmit = async (e) => {
        e.preventDefault()

        const auth = getAuth()
        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
            toast.success('An email was sent to your account')
        } catch (error) {
            toast.error('Could not send reset email')
        }

    }

    return (
        <div>
            <h2>Forgot password</h2>


            <form onClick={onSubmit}>
                <p>Email</p>
                <input
                    id='email'
                    type='email'
                    value={email}
                    onChange={onChange}
                />
                <br></br>
                <br></br>
                <br></br>
                <button>Send reset email</button>
            </form>
        </div>
    )
}

export default ForgotPassword
