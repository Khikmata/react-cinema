
import React, { useEffect, useState } from 'react';

import '../App.scss';
import { useAppDispatch, useTypedSelector } from '../hooks/redux';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import Header from '../components/Header';
import { IAnimeData } from '../models/IAnime';
import axios from 'axios';
import { setItem } from '../store/reducers/fetchAnimeSlice';



const HomePage: React.FC = () => {

	const toggleOpen = () => {
		setOpen(true);
		(document.body.classList.add("activeModal"));

	}

	const [isLoading, setIsLoading] = useState(true);
	const { items } = useTypedSelector(state => state.fetchAnimeSlice)

	const dispatch = useAppDispatch();


	useEffect(() => {
		setIsLoading(true)
		const fetchItems = async () => {
			try {
				const response = await axios.get('https://api.consumet.org/anime/gogoanime/top-airing')
				console.log(response.data)
				dispatch(setItem(response.data.results))
				setIsLoading(false);
			} catch (error) {
				<h3>Произошла ошибка в загрузке данных</h3>
			}

		}
		fetchItems();
	}, [])

	console.log(items)

	const [open, setOpen] = useState(true);

	return (
		<div className="homepage">
			<div className={`wrapper ${open ? 'activeModal' : ''}`}>
				{open && <Modal open={open} setOpen={setOpen} />
				}

				<div className="container">
					<Header />
					<main>
						{/* <BackgroundSlider images={images} interval={interval} items={items} /> */}
						<h2 className='main-hot__title'>Новинки</h2>
						<div className="carts">
							{(items.length !== 0 && isLoading === false ?
								items.map((item: IAnimeData, id: number) => (
									<div className='anime-card' key={id}>
										<Link to={`/anime/${item.id}`} className="anime-card__img">
											<img src={`${item.image}`} width={200} height={300} />
										</Link>
										<div className="anime-card__title">
											<h3>{item.title}</h3>
										</div>
										<div className='anime-card__underTitle'>
											<h3>{item.genres[0]}, {item.genres[1]}, {item.genres[2]} </h3>
										</div>
									</div>
								))
								: <h3> Не удалось загрузить данные 	</h3>)
							}
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
