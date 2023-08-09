import Form from 'react-bootstrap/Form';
import "../Stylesheets/Signup.css"
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { useRef, useEffect } from 'react';
import {useSignupMutation} from "../ReduxState/appApi"

function Signup() {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const password = useRef("");
    password.current = watch("password");

    useEffect(() => {
        reset();
    }, [isSubmitSuccessful, reset]);


    const validation = {
        username: {
            required: {
                value: true,
                message: "Enter username",
            },
        },
        email: {
            required: {
                value: true,
                message: "Enter Email",
            },
            pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Enter valid Email address",
            },
        },
        password: {
            required: {
                value: true,
                message: "Enter Password",
            },
            minLength: {
                value: 6,
                message: "Your password should contain atleast 6 characters",
            },
        },
        confirm: {
            required: {
                value: true,
                message: "Confirm Password",
            },
            minLength: {
                value: 6,
                message: "Your password should contain atleast 6 characters",
            },
            validate: (value) => {
                if (value !== password.current) {
                    return "The passwords doesn't match";
                }
            },
        },
    }

    const [signup, {isError, error, isLoading}] = useSignupMutation()
    return (
        <div className='loginContainer'>
            <div className='formlog'>
                <h3>Sign Up</h3>
                <form onSubmit={handleSubmit(async (data, e)=>{
                    e.preventDefault();
                    const username = data.username;
                    const email = data.email;
                    const password = data.password;
                    signup({username, email, password})
                    
                })}>
                    {isError && <p className='errormsg'>{error.data}</p>}
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="username"
                            type="text"
                            placeholder="Username"
                            name='username'
                            {...register("username", validation.username)}

                        />
                        <label htmlFor="username">Username</label>
                        <p className="errormsg">
                            {errors.username && errors.username.message}
                        </p>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="email"
                            placeholder="name@example.com"
                            name='email'
                            {...register("email", validation.email)}

                        />
                        <label htmlFor="floatingInputCustom">Email address</label>
                        <p className="errormsg">
                            {errors.email && errors.email.message}
                        </p>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="password"
                            type="password"
                            placeholder="Password"
                            name='password'
                            {...register("password", validation.password)}

                        />
                        <label htmlFor="password">Password</label>
                        <p className="errormsg">
                            {errors.password && errors.password.message}
                        </p>
                    </Form.Floating>
                    <Form.Floating className="mb-4">
                        <Form.Control
                            id="confirm"
                            type="password"
                            placeholder="Confirm Password"
                            name='confirm'
                            {...register("confirm", validation.confirm)}
                        />
                        <label htmlFor="confirm">Confirm Password</label>
                        <p className="errormsg">
                            {errors.confirm && errors.confirm.message}
                        </p>
                    </Form.Floating>
                    <Button type="submit" variant="primary" className='me-2' disabled={isLoading}>Submit</Button>
                    <Button type="reset" variant="secondary">Reset</Button>
                    <p className='mt-2'>Have an account? <Link to="/login">Click here to Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signup