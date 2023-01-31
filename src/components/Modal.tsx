import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import gitIcon from '../assets/images/gitIcon.svg'
import vkIcon from '../assets/images/vkIcon.svg'
import googleIcon from '../assets/images/googleIcon.svg'
import { useAppDispatch, useTypedSelector } from '../hooks/redux';
import auth, { fetchUserData } from '../store/reducers/auth';
import { stat } from 'fs';
import { setModalOpen } from '../store/reducers/modal';



const Modal: React.FC = () => {


	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const emailRef = useRef(null);
	const userRef = useRef(null);
	const passRef = useRef(null);


	const [isSignUp, setIsSignUp] = useState(true)

	const { isAuth } = useTypedSelector(state => state.auth)

	const open = useTypedSelector(state => state.modal.isModalOpen);
	const dispatch = useAppDispatch();

	const handleKeypress = (e: any) => {
		//it triggers by pressing the enter key
		if (e.keyCode === 13) {
			Auth();
		}
	};

	const toggleClose = () => {
		dispatch(setModalOpen(false));
		(document.body.classList.remove("activeModal"));
	}

	const Auth = () => {

		console.log(`email: ${email}, username: ${username}, password: ${password}`)
	}

	return (
		<div>
			<div className={`modal ${open ? 'active' : ''}`} onMouseDown={toggleClose}>
				<div className='modal-box' onMouseDown={(e) => e.stopPropagation()}>
					<div className="modal-content" >
						<div className="modal-content__close">
							<button onClick={toggleClose} className='modal-content__close button button-close'>X</button>
						</div>
						{(isSignUp && <div className='modal-content__input'>
							<p>Email</p>
							<input onKeyDown={(e) => handleKeypress(e)} ref={emailRef} value={email} onChange={e => setEmail(e.target.value)} className='input__box' ></input>
						</div>
						)}
						<div className='modal-content__input'>
							<p>Username</p>
							<input onKeyDown={(e) => handleKeypress(e)} ref={userRef} value={username} onChange={e => setUsername(e.target.value)} className='input__box' ></input>
						</div>
						<div className='modal-content__input'>
							<p>Password</p>
							<input onKeyDown={(e) => handleKeypress(e)} ref={passRef} value={password} onChange={e => setPassword(e.target.value)} type={'password'} className='input__box'></input>
						</div>
						{(!isSignUp && <div className='modal-content__secondaryInputs'>
							<input className='check-box__input' type={'checkbox'} />
							<p> Remember me </p>
							<span> Forgot your password? </span>
						</div>
						)}
						<button type='submit' onClick={Auth} className='modal-content__button button'>  {isSignUp ? `SIGN UP` : `LOG IN`} </button>
						<span className='modal-content__orSignIn'>or sign in with</span>
						<div className='modal-content__signIcons'>
							<img src={gitIcon} style={{ marginBottom: '100px' }} height={30} width={30}></img>
							<img src={googleIcon} height={30} width={30}></img>
							<img src={vkIcon} height={30} width={30}></img>
						</div>
					</div>
					<button onClick={() => setIsSignUp(!isSignUp)} className={`modal-content__orSignIn blue button`}> {isSignUp ? `Log In?` : `Sign Up?`}</button>
				</div>
			</div>
		</div >
	)
}

export default Modal;