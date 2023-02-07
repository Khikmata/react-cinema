
import React, { useEffect, useState } from 'react';

import '../App.scss';
import { useAppDispatch, useTypedSelector } from '../hooks/redux';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import Header from '../components/Header';
import { IAnimeData } from '../models/IAnime';
import axios from 'axios';
import { setItem } from '../store/reducers/fetchAnimeSlice';
import Skeleton from '../components/Skeleton';



const HomePage: React.FC = () => {


	const [isLoading, setIsLoading] = useState(true);
	const { items } = useTypedSelector(state => state.fetchAnimeSlice)

	const [currentPage, setCurrentPage] = useState(1);
	const [hasNextPage, setHasNextPage] = useState(true);

	const dispatch = useAppDispatch();

	const modalOpen = useTypedSelector(state => state.modal.isModalOpen);
	const searchValue = useTypedSelector(state => state.search.searchValue);

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
				setIsLoading(false);
				<h3>Произошла ошибка в загрузке данных</h3>
			}

		}
		fetchItems();

	}, [currentPage, searchValue])

	const incrementPage = () => {
		setCurrentPage(currentPage + 1);
	}
	const decrementPage = () => {
		if (currentPage != 1) {
			setCurrentPage(currentPage - 1);
		}
	}

	return (
		<div className="homepage">
			<div className={`wrapper ${modalOpen ? 'activeModal' : ''}`}>
				{modalOpen && <Modal />
				}

				<div className="container">
					<Header />
					<main>
						{/* <BackgroundSlider images={images} interval={interval} items={items} /> */}
						<h2 className='main-hot__title'>{searchValue !== '' ? 'Search results' : 'Popular anime'}</h2>
						<div className="carts">
							{isLoading && [...new Array(10)].map((_, index) => <Skeleton key={index} />)}
							{(items.length !== 0 && isLoading === false &&
								items.map((item: IAnimeData, id: number) => (
									(<div className='anime-card' key={id}>
										<Link to={`/anime/${item.id}`} className="anime-card__img">
											<img src={`${item.image}`} />
										</Link>
										<div className="anime-card__title">
											<h3>{item.title}</h3>
										</div>
										{/* <div className='anime-card__underTitle'>
											<h3>{item.genres[0]}, {item.genres[1]}, {item.genres[2]} </h3>
										</div> */}
									</div>)
								))
							)}
							{(!isLoading && items.length === 0 && <h3> Не удалось загрузить данные 	</h3>)}
						</div>
						<div className="pagination">
							<button disabled={(currentPage === 1 ? true : false)} className={`button pagination-button ${(currentPage === 1) ? 'disabled' : ''} `} onClick={decrementPage}> ⬅ </button>
							<button className={'button pagination-button'} onClick={incrementPage}> ➡ </button>
						</div>
					</main>
					<footer>

					</footer>
				</div>
			</div >
		</div >
	);
}

export default HomePage;
