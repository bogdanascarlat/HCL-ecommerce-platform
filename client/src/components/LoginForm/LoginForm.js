import React from 'react'
import { useForm } from "react-hook-form"
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutation.js'
import { Link, useNavigate } from 'react-router-dom';

import {  useDispatch } from 'react-redux';
import { login as loginAction } from '../../features/user/authSlice.js';

const LoginForm = () => {



    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [loginFunction, {error}] = useMutation(LOGIN_MUTATION);
    const navigate = useNavigate()

    const handleLogin = (loginData) => {
        const onCompleted = (data) => {

            const {login} = data
            dispatch(loginAction(login))
            navigate('/')
        }

        loginFunction({variables:{loginData}, onCompleted})
    }


    return (
        <div >
        <form className='d-flex row g-2 pe-5 ps-5 pt-5 input-group input-group-lg needs-validations' onSubmit={handleSubmit(handleLogin)}>
            <label className='text-secondary fw-bold fs-5'>Email</label>
            <input className={'rounded-2 form-control ' + ((errors.email || error?.message.includes('User not found')) && 'is-invalid')} {...register('email', { required: 'Email is required!', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Email is invalid! Please correct and try again!' } })} type='text' placeholder='Enter your email'></input>
            <div className='fw-bold fs-6 invalid-feedback'>{errors.email?.message || error?.message}</div>
            
            <label className='text-secondary fw-bold fs-5'>Password</label>
            <input className={'rounded-2 form-control ' + ((errors.password || error?.message.includes('Password is incorrect')) && 'is-invalid')} {...register('password', { required: 'Password is required!' })} type='password' placeholder='Enter your password'></input>
            <div className=' fw-bold fs-6 invalid-feedback'>{errors.password?.message || (!error?.message.includes('User not found') && error?.message)}</div>

            <div className='d-flex justify-content-end'>
                <Link className='fw-bold text-decoration-none'>Forgot password?</Link>
            </div>

            <input className='fw-bold rounded-2 btn btn-primary btn-lg mb-2 mt-2' type='submit' value='Login' style={{backgroundColor:"#0066AE", borderColor:"#0066AE"}}></input>


            <div className='d-flex column align-items-center justify-content-center mt-2 mb-2'>

                <div className='w-100 ps-5 pe-5 pt-3'>
                    <hr className='border border-dark border-2' />
                </div>

                <div className='fw-bold text-secondary fs-5 text-align-center pt-3'>
                    OR
                </div>

                <div className='w-100 ps-5 pe-5 pt-3'>
                    <hr className='border border-dark border-2' />
                </div>

            </div>

            <div style={{height: 'var(--mobile-height-100)', marginTop: 'var(--mobile-margin-top-1)'}} className='d-flex flex-column  flex-md-row justify-content-between'>
                <div className="align-self-md-start">
                    <button type='button' style={{color: "#3b5998", borderColor: "#3b5998", width: '100%'}} className='fw-bold rounded-2 btn btn-clear btn-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill='#3b5998' x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24"><path d="M16.403,9H14V7c0-1.032,0.084-1.682,1.563-1.682h0.868c0.552,0,1-0.448,1-1V3.064c0-0.523-0.401-0.97-0.923-1.005C15.904,2.018,15.299,1.999,14.693,2C11.98,2,10,3.657,10,6.699V9H8c-0.552,0-1,0.448-1,1v2c0,0.552,0.448,1,1,1l2-0.001V21c0,0.552,0.448,1,1,1h2c0.552,0,1-0.448,1-1v-8.003l2.174-0.001c0.508,0,0.935-0.381,0.993-0.886l0.229-1.996C17.465,9.521,17.001,9,16.403,9z"></path></svg>
                        Facebook Login
                    </button>
                </div>

                <div className="align-self-md-end">
                    <button type='button' style={{color: "#00acee", borderColor: "#00acee",  width: '100%'}} className='fw-bold rounded-2 btn btn-clear btn-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill='#00acee' x="0px" y="0px" width="24" height="24" viewBox="0 0 30 30"><path d="M28,6.937c-0.957,0.425-1.985,0.711-3.064,0.84c1.102-0.66,1.947-1.705,2.345-2.951c-1.03,0.611-2.172,1.055-3.388,1.295 c-0.973-1.037-2.359-1.685-3.893-1.685c-2.946,0-5.334,2.389-5.334,5.334c0,0.418,0.048,0.826,0.138,1.215 c-4.433-0.222-8.363-2.346-10.995-5.574C3.351,6.199,3.088,7.115,3.088,8.094c0,1.85,0.941,3.483,2.372,4.439 c-0.874-0.028-1.697-0.268-2.416-0.667c0,0.023,0,0.044,0,0.067c0,2.585,1.838,4.741,4.279,5.23 c-0.447,0.122-0.919,0.187-1.406,0.187c-0.343,0-0.678-0.034-1.003-0.095c0.679,2.119,2.649,3.662,4.983,3.705 c-1.825,1.431-4.125,2.284-6.625,2.284c-0.43,0-0.855-0.025-1.273-0.075c2.361,1.513,5.164,2.396,8.177,2.396 c9.812,0,15.176-8.128,15.176-15.177c0-0.231-0.005-0.461-0.015-0.69C26.38,8.945,27.285,8.006,28,6.937z"></path></svg>
                        Twitter Login
                    </button>
                </div>
            </div>

            <div style={{marginTop: 70}} className='d-flex justify-content-center fw-bold'>
                New Here? 
                <Link to='/register' className='fw-bold text-decoration-none ms-2'>Create Account</Link>
            </div>
        </form>
        </div>
    )
}

export default LoginForm