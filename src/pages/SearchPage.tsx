import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import Skeleton from '../components/Skeleton';
import { useAppDispatch, useTypedSelector } from '../hooks/redux';
import { IAnimeData } from '../models/IAnime';
import { setItem } from '../store/reducers/fetchAnimeSlice';

const SearchPage = () => {

	const dispatch = useAppDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const searchValue = useTypedSelector(state => state.search.searchValue);
	const items = useTypedSelector(state => state.fetchAnimeSlice.items)
	const [currentPage, setCurrentPage] = useState(1);

	const incrementPage = () => {
		setCurrentPage(currentPage + 1);
	}
	const decrementPage = () => {
		if (currentPage != 1) {
			setCurrentPage(currentPage - 1);
		}
	}
	useEffect(() => {
		setIsLoading(true)
		const fetchItems = async () => {
			try {
				let response;
				if (!searchValue) {
					response = await axios.get(`https://api.consumet.org/anime/gogoanime/top-airing`, { params: { page: currentPage } })
				} else {
					response = await axios.get(`https://api.consumet.org/anime/gogoanime/${searchValue}?page=${currentPage}`);
				}
				dispatch(setItem(response.data.results))
				setIsLoading(false);
			} catch (error) {
				<h3>Произошла ошибка в загрузке данных</h3>
			}

		}
		fetchItems();

	}, [currentPage, searchValue])

	return (
		<div className={'wrapper'}>
			<div className='container'>
				<Header />
				<div className="searchPage">
					<h2 className="searchPage__results"> Search results: </h2>
					<div className="carts">
						{isLoading && [...new Array(10)].map((_, index) => <Skeleton key={index} />)}
						{(items.length !== 0 && isLoading === false &&
							items.map((item: IAnimeData, id: number) => (
								<div className='anime-card' key={id}>
									<Link to={`/anime/${item.id}`} className="anime-card__img">
										<img src={`${item.image}`} width={200} height={300} />
									</Link>
									<div className="anime-card__title">
										<h3>{item.title}</h3>
									</div>
								</div>)
							))
						}

						{(!isLoading && items.length === 0 && <h3> Не удалось загрузить данные 	</h3>)}
					</div>
				</div>
				<div className="pagination">
					<button disabled={(currentPage === 1 ? true : false)} className={`button pagination-button ${(currentPage === 1) ? 'disabled' : ''} `} onClick={decrementPage}> ⬅ </button>
					<button className={'button pagination-button'} onClick={incrementPage}> ➡ </button>
				</div>
			</div>
		</div>
	)
}

export default SearchPage