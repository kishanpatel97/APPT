import { useState, useEffect, useRef, FormEvent, ChangeEvent, KeyboardEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IUserReg } from '../../../shared/interfaces/user.interface';

const Register : React.FC = () => {
	const navigate = useNavigate();
	const emailField = useRef<HTMLInputElement>(null);
	const passwordField = useRef<HTMLInputElement>(null);
	const [user, setUser] = useState<IUserReg>({
		firstName:"",
		lastName:"",
		email:"",
		password:"",
		confirmPassword:""
	})
	const [showPass, setShowPass] = useState(false)
	const [capsCheck, setCapsCheck] = useState(false)
	const [errors, setErrors] = useState<any>({
		firstName:"",
		lastName:"",
		email:"",
		password:"",
		confirmPassword:""
	})
	const [initialLoad, setInitialLoad] = useState(true)

	const showPassToggle = () =>{
		setShowPass(!showPass);
	}
	
	useEffect(() => {
		if(!initialLoad){
			passwordField.current?.focus();
			passwordField.current?.setSelectionRange(passwordField.current.value.length,passwordField.current.value.length)
		}
		else{
			setInitialLoad(false);
		}
	}, [showPass]);

	const capsLockCheck = (e : KeyboardEvent<HTMLFormElement>) =>{
		setCapsCheck(e.getModifierState('CapsLock'));
	}

	const handleChange = (e : ChangeEvent<HTMLInputElement>) =>{
		setUser({
			...user,
			[e.target.name]:e.target.value
		})
		setErrors({
			...errors,
			[e.target.name]:""
		})
	}

	const register = (e : FormEvent) =>{
		e.preventDefault();

		axios.post<IUserReg>('http://localhost:8000/api/users/register',user)
		.then((res) =>{
			setUser({
				firstName:"",
				lastName:"",
				email:"",
				password:"",
				confirmPassword:""
		})
			setErrors({
				firstName:"",
				lastName:"",
				email:"",
				password:"",
				confirmPassword:""
			})
			setShowPass(false)
			navigate("/login",{state: {message:"Registration successful. Please log in to continue.",good:true}})
		})
		.catch((err) =>{
			setErrors({
			...errors,
			...err.response.data.errors
			})
		})
	}

	return(
		<>
			<form onSubmit={register} onKeyUp={capsLockCheck} className="loginReg">
				<div className={errors.firstName?"mt-6 mb-2":"mt-6 mb-5"}>
						<input autoFocus onChange={handleChange} name="firstName" value={user.firstName} className="loginRegInput" placeholder="First Name" type="text" />
						{
								errors.firstName?
								<p className="m-2 alertBad">{errors.firstName.message}</p>
								:null
						}
				</div>
				<div className={errors.lastName?"mt-3 mb-2":"mt-3 mb-5"}>
						<input onChange={handleChange} name="lastName" value={user.lastName} className="loginRegInput" placeholder="Last Name" type="text" />
						{
								errors.lastName?
								<p className="m-2 alertBad">{errors.lastName.message}</p>
								:null
						}
				</div>
				<div className={errors.email?"mt-3 mb-2":"mt-3 mb-5"}>
						<input ref={emailField} onChange={handleChange} name="email" value={user.email} className="loginRegInput" placeholder="Email" type="text" />
						{
								errors.email?
								<p className="m-2 alertBad">{errors.email.message}</p>
								:null
						}
				</div>
				<div className={errors.password?"mt-3 mb-2":"mt-3 mb-5"}>
						<input onChange={handleChange} ref={passwordField} name="password" value={user.password} className="loginRegInput" placeholder="Password" type={showPass?"text":"password"}/>
						{
								errors.password?
								<p className="m-2 alertBad">{errors.password.message}</p>
								:null
						}
				</div>
				<div className="relative">
						<input onChange={handleChange} name="confirmPassword" value={user.confirmPassword} className="loginRegInput" placeholder="Confirm Password" type={showPass?"text":"password"}/>
						<img onClick={showPassToggle} style={{bottom:"20%"}} alt="showPassButton" className="showPassBtn" src={!showPass?"/closeEye.png":"/openEye.png"}/>
						<img src="/capsArrow.png" style={capsCheck?{display:"inline", bottom:"20%"}:{display:"none"}} alt="capsCheckImg" className="capsCheck" />
				</div>
				{
						errors.confirmPassword?
						<p className="m-2 alertBad">{errors.confirmPassword.message}</p>
						:null
				}
				<button className="btn loginRegBtn">Register</button>
			</form>
			<p className="text-center mt-2">Already a user? <Link className="underline" to="/login">Login Here</Link></p>
		</>
	);
};

export default Register;