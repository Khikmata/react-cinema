import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../hooks/redux';
import { useDebounce } from '../hooks/useDebounce';
import { setSearchOpen, setSearchValue } from '../store/reducers/search';

const Search = () => {


	const dispatch = useAppDispatch();

	const [searchInputValue, setSearchInputValue] = useState('')
	const { isSearchOpen, searchValue } = useTypedSelector(state => state.search);


	const toggleSearch = () => {
		dispatch(setSearchValue(''))
		dispatch(setSearchOpen(!isSearchOpen))
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
			<div className='search__box'>
				<input ref={inputRef} value={searchInputValue} placeholder='Поиск' onChange={(e) => setSearchInputValue(e.target.value)} className='searchbar'></input>
				<button onClick={() => toggleSearch()} className='search-button button'>
					X
				</button>
			</div>
		</div>
	)
}

export default Search