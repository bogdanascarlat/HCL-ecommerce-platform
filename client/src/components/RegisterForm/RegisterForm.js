/* eslint-disable jsx-a11y/anchor-is-valid */
//Bogdan
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from "../../graphql/mutation";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [signupFunction, {error, loading}] = useMutation(SIGNUP_MUTATION);
  


  const navigate = useNavigate()
  if (loading) return <h1>Loading...</h1>

  const handleSignup = (signupFormData) => {
    const onCompleted = () => {navigate('/login')}
    const {check, confirmPassword, ...signupData} = signupFormData
    console.log(signupData)
    signupFunction({variables:{
      signupData
      }, onCompleted})
      console.log(signupData.email)
  }

  const errorForElement = (element) =>
    errors[element] && (
      <div className="fw-bold fs-6 invalid-feedback">{errors[element].message}</div>
    
    )

  return (
    <div>
    <form
      className="d-flex row g-2 pe-5 ps-5 pt-3 input-group input-group-lg needs-validation"
      onSubmit={handleSubmit(handleSignup)}
      noValidate
    >
      
        <label htmlFor="inputFirstName" className="text-secondary fw-bold fs-5">
        First Name
        </label>
        <input
          {...register("firstName", {
            required: "Required",
            pattern: { value: /^([^0-9]*)$/, message: "Numbers not alowed" },
          })}
          type="text"
          className={"rounded-2 form-control " + (errors.firstName && "is-invalid")}
          id="inputFirstName"
          placeholder="First name"
        />
        {errorForElement("firstName")}
      
      
        <label htmlFor="inputLastName" className="text-secondary fw-bold fs-5 pt-2">
          Last Name
        </label>
        <input
          {...register("lastName", {
            required: "Required",
            pattern: { value: /^([^0-9]*)$/, message: "Numbers not alowed" },
          })}
          type="text"
          className={"rounded-2 form-control " + (errors.lastName && "is-invalid")}
          id="inputLastName"
          placeholder="Last name"
        />
        {errorForElement("lastName")}
     
      
        <label htmlFor="inputEmail" className="text-secondary fw-bold fs-5 pt-2">
          Email
        </label>
        <input
          {...register("email", {
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
          type="email"
          className={"rounded-2 form-control " + ((errors?.email || error?.message) && 'is-invalid')}
          id="inputEmail"
          placeholder="Email"
        />
        <div className='fw-bold fs-6 invalid-feedback'>{errors.email?.message || error?.message}</div>
     
      
        <label htmlFor="inputPassword" className="text-secondary fw-bold fs-5 pt-2">
          Password
        </label>
        <input
          {...register("password", {
            required: "Required",
            minLength: { value: 8, message: "Password length is less than 8" },
            pattern: {
              value:
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              message:
                "At least one upper case, one lower case, one number and one special character",
            },
          })}
          type="password"
          className={"rounded-2 form-control " + (errors.password && "is-invalid")}
          id="inputPassword"
          placeholder="Password"
        />
        {errorForElement("password")}
     
      
        <label htmlFor="inputConfirmPassword" className="text-secondary fw-bold fs-5 pt-2">
          Confirm Password
        </label>
        <input
          {...register("confirmPassword", {
            required: "Required",
            validate: (val) =>
              watch("password") !== val ? "Your passwords don't match" : null,
          })}
          type="password"
          className={"rounded-2 form-control " + (errors.confirmPassword && "is-invalid")}
          id="inputConfirmPassword"
          placeholder="Confirm password"
        />
        {errorForElement("confirmPassword")}
     
      
       
     
      
        <div className="form-check pt-2 pb-2">
          <input
            className={"form-check-input " + (errors.check && "is-invalid")}
            type="checkbox"
            id="gridCheck"
            {...register("check", { required: "You need to agree before continue" })}
          />
          <label className="text-secondary fw-bold fs-5" htmlFor="gridCheck">
            I agree to the <a href="#" className="lfw-bold text-decoration-none">terms and condition</a> and <a href="#" className="fw-bold text-decoration-none">privacy policy</a>
          </label>
          {errorForElement("check")} 
        </div>
      
        <input className='fw-bold rounded-2 btn btn-primary btn-lg mb-2 mt-2' type='submit' value='Sign up' style={{backgroundColor:"#0066AE", borderColor:"#0066AE"}}></input>

      <div className="fw-bold d-flex justify-content-center pt-3">Already have an account? <Link to='/login' className="fw-bold text-decoration-none ms-2"> Login</Link> </div>
    </form>
    </div>
  )
}

export default RegisterForm