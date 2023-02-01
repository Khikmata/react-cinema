import React, { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useTypedSelector } from '../hooks/redux';
import { useDebounce } from '../hooks/useDebounce';
import { setSearchOpen, setSearchValue } from '../store/reducers/searchSlice';

const Search = () => {


	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const [searchInputValue, setSearchInputValue] = useState('')
	const { isSearchOpen, searchValue } = useTypedSelector(state => state.search);
	const items = useTypedSelector(state => state.fetchAnimeSlice.items)

	const toggleSearch = () => {
		dispatch(setSearchValue(''))
		dispatch(setSearchOpen(!isSearchOpen))
	}

	const redirectToSearchPage = () => {
		if (searchInputValue !== '') {
			navigate('/search')
		}
		console.log('something hpd')
	}


	const handleSearchInput = useDebounce(() => {
		dispatch(setSearchValue(searchInputValue))
	}, 600);

	useEffect(() => {
		handleSearchInput(searchInputValue)
	}, [searchInputValue])

	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className='search'>
			<div className='search__box' >
				<input ref={inputRef} value={searchInputValue} placeholder='Поиск' onChange={(e) => setSearchInputValue(e.target.value)} className='searchbar'></input>
				<button type={'submit'} onSubmit={() => redirectToSearchPage} onClick={toggleSearch} className='search-button button'>
					{/* {<Link to={`/Search`}> x </Link>} */}
					X
				</button>
			</div >
		</div >
	)
}

export default Search