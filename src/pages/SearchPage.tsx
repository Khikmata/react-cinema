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

	//useEffect(() => {
	//	setIsLoading(true)
	//	const fetchItems = async () => {
	//		try {
	//			const response = await axios.get(`https://api.consumet.org/anime/gogoanime/${searchValue}`);
	//			dispatch(setItem(response.data.results))
	//			setIsLoading(false);
	//		} catch (error) {
	//			<h3>Произошла ошибка в загрузке данных</h3>
	//		}
	//
	//	}
	//	fetchItems();
	//
	//}, [searchValue])

	return (
		<div className={'wrapper'}>
			<div className='container'>
				<Header />
				<div className="search">
					<h2 className="search_results"> Search results: </h2>
					<div className="carts">
						{/* {isLoading && [...new Array(10)].map((_, index) => <Skeleton key={index} />)}
						{(items.length !== 0 && isLoading === false &&
							items.map((item: IAnimeData, id: number) => (
								(<div className='anime-card' key={id}>
									<Link to={`/anime/${item.id}`} className="anime-card__img">
										<img src={`${item.image}`} width={200} height={300} />
									</Link>
									<div className="anime-card__title">
										<h3>{item.title}</h3>
									</div>
								</div>)
							))
						)}
						{(!isLoading && items.length === 0 && <h3> Не удалось загрузить данные 	</h3>)} */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SearchPage