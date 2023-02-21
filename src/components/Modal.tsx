import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useTypedSelector } from '../hooks/redux';
import { setModalOpen } from '../store/reducers/authModalSlice';
import { IDataLogin, IDataRegister, loginUser, registerUser, setAuth } from '../store/reducers/authSlice';



const Modal: React.FC = () => {



	const [isSignUp, setIsSignUp] = useState(false)


	const status = useTypedSelector(state => state.auth.status);
	const open = useTypedSelector(state => state.modal.isModalOpen);
	const dispatch = useAppDispatch();


	const { register, handleSubmit } = useForm({
		defaultValues: {
			email: '',
			userName: '',
			password: '',
		},
		mode: 'onChange',
	})

	console.log(status)
	const onSubmitRegister = (data: IDataRegister) => {
		console.log(data)
		dispatch(registerUser(data));
	}
	const onSubmitLogin = (data: IDataLogin) => {
		console.log(data)
		dispatch(loginUser(data));
	}
	const toggleClose = () => {
		dispatch(setModalOpen(false));
		(document.body.classList.remove("activeModal"));
	}


	useEffect(() => {
		if (status === 'fulfilled') {
			dispatch(setAuth(true))
			dispatch(setModalOpen(false))
		}
	}, [dispatch, status])

	return (
		<div>

			<div className={`modal ${open ? 'active' : ''}`} onMouseDown={toggleClose}>
				<div className='modal-box' onMouseDown={(e) => e.stopPropagation()}>
					<div className="modal-content" >
						<div className="modal-content__close">
							<p>Log In</p>
							<button onClick={toggleClose} className='modal-content__close button button-close'>X</button>
						</div>
						{(isSignUp
							?
							<>
								<form onSubmit={handleSubmit(onSubmitRegister)}>
									<div className='modal-content__input'>
										<p>Email</p>
										<input type='text' className='input__box' placeholder='test@gmail.com' {...register("email", { required: 'Укажите почту', pattern: /^\S+@\S+$/i })} />
									</div>

									<div className='modal-content__input'>
										<p>Username</p>
										<input type='text' className='input__box' placeholder='placeholder' {...register("userName", { required: 'Укажите ник' })} ></input>
									</div>
									<div className='modal-content__input'>
										<p>Password</p>
										<input type='password' className='input__box' placeholder='password' {...register("password", { required: 'Укажите пароль' })} />
									</div>
									<button type='submit' className='modal-content__button button'>  {isSignUp ? `SIGN UP` : `LOG IN`} </button>
								</form>
								<button onClick={() => setIsSignUp(!isSignUp)} className={`modal-content__orSignIn blue button`}> {isSignUp ? `Log In?` : `Sign Up?`}</button>
							</>
							: <>
								<form onSubmit={handleSubmit(onSubmitLogin)} >
									<div className='modal-content__input'>
										<p>Username</p>
										<input type='text' className='input__box' placeholder='placeholder' {...register("userName", { required: 'Укажите ник' })} ></input>
									</div>
									<div className='modal-content__input'>
										<p>Password</p>
										<input type='password' className='input__box' placeholder='password' {...register("password", { required: 'Укажите пароль' })} />
									</div>
									<div className='modal-content__secondaryInputs'>
										<input className='check-box__input' type={'checkbox'} />
										<p> Remember me </p>
										<span> Forgot your password? </span>
									</div>
									<button type='submit' className='modal-content__button button'>  {isSignUp ? `SIGN UP` : `LOG IN`} </button>
								</form>
								<button onClick={() => setIsSignUp(!isSignUp)} className={`modal-content__orSignIn blue button`}> {isSignUp ? `Log In?` : `Sign Up?`}</button>
							</>
						)}
						{/* <span className='modal-content__orSignIn'>or sign in with</span>
						<div className='modal-content__signIcons'>
							<img src={gitIcon} style={{ marginBottom: '100px' }} height={30} width={30}></img>
							<img src={googleIcon} height={30} width={30}></img>
							<img src={vkIcon} height={30} width={30}></img>
						</div> */}
					</div>
				</div>
			</div >
		</div >
	)
}

export default Modal;