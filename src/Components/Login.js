import Form from 'react-bootstrap/Form';
import "../Stylesheets/Signup.css"
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { useEffect } from 'react';
import { useLoginMutation } from "../ReduxState/appApi"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

function Login() {
    const { register, handleSubmit, reset, formState: { isSubmitSuccessful, errors } } = useForm()

    const validation = {
        email: {
            required: {
                value: true, message: "Email required"
            },
            pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Enter valid Email address",
            },
        },
        password: {
            required: {
                value: true, message: "Email required"
            },
            minLength: {
                value: 6,
                message: "Your password should contain atleast 6 characters",
            },
        }
    }
    useEffect(() => {
        reset()
    }, [isSubmitSuccessful, reset])

    const [login, { isLoading, isError, error }] = useLoginMutation()

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Test Credentials</Popover.Header>
            <Popover.Body>
                <p><strong>Email:</strong> gokul@test.com</p>
                <p><strong>Password:</strong> Gokul!123</p>
            </Popover.Body>
        </Popover>
    )

    return (
        <div className='loginContainer'>
            <div className='formlog'>
                <h3>Login</h3>
                {isError && <Alert variant='danger'>{error.data}</Alert>}
                <form onSubmit={handleSubmit(async (data, e) => {
                    e.preventDefault()
                    const email = data.email;
                    const password = data.password;
                    login({ email, password })
                })}>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="email"
                            placeholder="name@example.com"
                            name='email'
                            {...register("email", validation.email)}
                        />
                        <label htmlFor="floatingInputCustom">Email address</label>
                        <p className='errormsg'>{errors.email && errors.email.message}</p>
                    </Form.Floating>
                    <Form.Floating>
                        <Form.Control
                            id="floatingPasswordCustom"
                            type="password"
                            placeholder="Password"
                            name='password'
                            {...register("password", validation.password)}
                        />
                        <label htmlFor="floatingPasswordCustom">Password</label>
                        <p className='errormsg'>{errors.password && errors.password.message}</p>
                    </Form.Floating>
                    <Button type="submit" variant="primary" style={{ marginRight: "20px" }}>Submit</Button>
                    <Button type="reset" variant="secondary">Reset</Button>
                    <p style={{ marginTop: "20px" }}>New to iBlog? <Link to="/register">Click here to Register</Link></p>
                </form>
                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                    <Button variant="success">View Test Credentials</Button>
                </OverlayTrigger>
            </div>
        </div>
    )
}

export default Login