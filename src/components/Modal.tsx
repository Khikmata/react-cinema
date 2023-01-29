import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import gitIcon from '../assets/images/gitIcon.svg'
import vkIcon from '../assets/images/vkIcon.svg'
import googleIcon from '../assets/images/googleIcon.svg'
import { useTypedSelector } from '../hooks/redux';
import auth from '../store/reducers/auth/auth';


interface IModalProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;

}

interface login {
	username: string;
	password: string;
}


const Modal: React.FC<IModalProps> = ({ open, setOpen }) => {



	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const userRef = useRef(null);
	const passRef = useRef(null);


	const Auth = () => {
		console.log(`username: ${username}, password: ${password}`)
	}

	const { isAuth } = useTypedSelector(state => state.auth)

	const handleKeypress = (e: any) => {
		//it triggers by pressing the enter key
		if (e.keyCode === 13) {
			Auth();
		}
	};

	const toggleClose = () => {
		setOpen(false);
		(document.body.classList.remove("activeModal"));
	}



	return (
		<div>
			<div className={`modal ${open ? 'active' : ''}`} onClick={toggleClose}>
				<div className='modal-box' onClick={e => e.stopPropagation()} >
					<div className="modal-content" >
						<button onClick={() => setOpen(false)} className='modal-content__close btn'>X</button>
						<div className='modal-content__input'>
							<p>Username</p>
							<input onKeyDown={(e) => handleKeypress(e)} ref={userRef} value={username} onChange={e => setUsername(e.target.value)} className='input__box' ></input>
						</div>
						<div className='modal-content__input'>
							<p>Password</p>
							<input onKeyDown={(e) => handleKeypress(e)} ref={passRef} value={password} onChange={e => setPassword(e.target.value)} type={'password'} className='input__box'></input>
						</div>
						<div className='modal-content__secondaryInputs'>
							<input className='check-box__input' type={'checkbox'} />
							<p> Remember me </p>
							<span> Forgot your password? </span>
						</div>

						<button type='submit' onClick={Auth} className='modal-content__button btn'> LOG IN </button>
						<span className='modal-content__orSignIn'>or sign in with</span>
						<div className='modal-content__signIcons'>
							<img src={gitIcon} style={{ marginBottom: '100px' }} height={30} width={30}></img>
							<img src={googleIcon} height={30} width={30}></img>
							<img src={vkIcon} height={30} width={30}></img>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Modal;