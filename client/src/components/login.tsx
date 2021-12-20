import { useState, useEffect, useRef, FormEvent, ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { IUser } from '../../../shared/interfaces/user.interface';

const Login : React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation() as any;
	const emailField = useRef<HTMLInputElement>(null);
	const passwordField = useRef<HTMLInputElement>(null);
	const [user, setUser] = useState<IUser>({
		email:"",
		password:""
	})
	const [showPass, setShowPass] = useState(false)
	const [capsCheck, setCapsCheck] = useState(false)
	const [error, setError] = useState("")
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
	}

	const login = (e : FormEvent) =>{
		e.preventDefault();

		axios.post<IUser>('http://localhost:8000/api/users/login',user,{withCredentials:true})
		.then((res) =>{
			setUser({
				email:"",
				password:""
			})
			setError("")
			setShowPass(false)
			navigate("/dashboard")
		})
		.catch((err) =>{
			setError(err.response.data.message)
			emailField.current?.focus();
		})
	}

	return(
		<>
			<form onSubmit={login} onKeyUp={capsLockCheck} className="loginReg">
				{
					location?.state?.good?
					<p className="m-2 alertGood">{location.state.message}</p>
					:null
        }
				<div className="relative">
					<input autoFocus ref={emailField} onChange={handleChange} name="email" value={user.email} className="loginRegInput mt-3 mb-5" placeholder="Email" type="text" />
					<input ref={passwordField} onChange={handleChange} name="password" value={user.password} className="loginRegInput" placeholder="Password" type={showPass?"text":"password"} />
					<img onClick={showPassToggle} alt="showPassButton" className="showPassBtn" src={showPass?"/closeEye.png":"/openEye.png"}/>
					<img src="/capsArrow.png" style={capsCheck?{display:"inline"}:{display:"none"}} alt="capsCheckImg" className="capsCheck" />
				</div>
				{
					error?
					<p className="m-2 alertBad">{error}</p>
					:null
				}
				<button className="btn loginRegBtn">Login</button>
			</form>
			<p className="text-center mt-2">Don't have an account? <Link className="underline" to="/register">Register Here</Link></p>
		</>
	);
};

export default Login;