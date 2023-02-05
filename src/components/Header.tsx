import React, { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../hooks/redux';
import { useDebounce } from '../hooks/useDebounce';
import { setModalOpen } from '../store/reducers/authModalSlice';
import { setSearchOpen, setSearchValue } from '../store/reducers/searchSlice';
import Search from './Search';







const Header: React.FC = () => {


	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const [BurgerOpen, setBurgerOpen] = useState(false);

	const { isSearchOpen } = useTypedSelector(state => state.search);

	const toggleSearch = () => {
		dispatch(setSearchValue(''))
		dispatch(setSearchOpen(!isSearchOpen));
		(document.body.classList.add("activeSearch"));
	}

	const toggleModal = () => {
		dispatch(setModalOpen(true));
		(document.body.classList.add("activeModal"));
	}

	const navigateToSearch = () => {
		navigate('/search');
	}

	const toggleBurger = () => {
		setBurgerOpen(!BurgerOpen);
	}


	return (
		<header className='header'>
			{BurgerOpen &&
				<div onClick={toggleBurger} className={`burger__modal ${BurgerOpen ? 'active' : ''}`}>
					<li><Link className='links__link' to={'/'}>Anime</Link></li>
					<li><Link className='links__link' to={'/'}>Manga</Link></li>
					<li><Link className='links__link' to={'/'}>Books</Link></li>
					<li><Link className='links__link' to={'/search'}>Search</Link></li>
				</div>
			}
			<div className="header-leftside">
				<div className='header-leftside__content'>
					<h1><Link onClick={toggleSearch} className='logo' to={'/'}>React Anime</Link></h1>
				</div>
			</div>
			<div className="header-center">
				<ul className={`header-center__links ${isSearchOpen ? 'search-active' : ''}`}>
					{
						(!isSearchOpen && <>
							<li><Link className='links__link' to={'/'}>Anime</Link></li>
							<li><Link className='links__link' to={'/'}>Manga</Link></li>
							<li><Link className='links__link' to={'/'}>Books</Link></li>
						</>
						)
					}
					<li>
						<button onClick={() => isSearchOpen ? navigateToSearch() : toggleSearch()} className={`search-button button ${isSearchOpen ? 'search-active' : ''}`}>
							<svg width="18" height="18" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M18.8269 17.4223L13.0768 11.7979C14.1486 10.55 14.7945 8.94458 14.7945 7.19156C14.7945 3.21981 11.4826 0 7.39724 0C3.31189 0 0 3.21981 0 7.19156C0 11.1633 3.31189 14.3831 7.39724 14.3831C9.25336 14.3831 10.3121 14.3905 11.6111 13.2922L17.4167 18.9158C17.6477 19.1405 17.9444 18.9158 18.8269 18.2361C19.0577 18.0114 19.0577 17.6472 18.8269 17.4223ZM7.39724 12.2697C3.96019 12.2697 2.11111 10.4988 2.11111 7.15734C2.11111 3.81585 3.96019 2.04495 7.39724 2.04495C10.8343 2.04495 12.6667 3.81585 12.6667 7.15734C12.6667 10.4988 10.8343 12.2697 7.39724 12.2697Z" fill="white" />
							</svg>
						</button>
					</li>
					{
						(isSearchOpen && < Search />)
					}
				</ul>
				<button onClick={toggleBurger} className='burger'>
					<div>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</button>
			</div >
			<div className="header-rightside">
				<button className='button auth-button'
					onClick={toggleModal}
				>Log in</button>
			</div>
		</header >
	)
}

export default Header