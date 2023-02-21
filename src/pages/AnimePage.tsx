import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Favorite from '../assets/icons/Favorite.svg'
import FavoriteFilled from '../assets/icons/FavoriteFilled.svg'
import Modal from '../components/Modal'
import Header from '../components/Navbar'
import { useAppDispatch, useTypedSelector } from '../hooks/redux'
import { fetchAnimePlayer } from '../store/reducers/animePlayerSlice'
import { fetchCommentsData } from '../store/reducers/CommentSlice'
import { fetchAnimeById, setDetails } from '../store/reducers/fetchAnimeSlice'


const AnimePage: React.FC = () => {



	const { details } = useTypedSelector(state => state.fetchAnimeSlice)
	const { sources } = useTypedSelector(state => state.animePlayer)
	const { items } = useTypedSelector(state => state.comment.comments)
	const { isModalOpen } = useTypedSelector(state => state.modal);

	const dispatch = useAppDispatch();

	const { id } = useParams();

	const [isLoading, setIsLoading] = useState(true)
	const [listModalOpen, setListModalOpen] = useState(false);
	const [openDescription, setOpenDescription] = useState(false);

	const [episodes, setEpisodes] = useState<string[]>([])
	const [currentEpisode, setCurrentEpisode] = useState(1);

	const [scrollPosition, setScrollPosition] = useState(0);
	const [userWatchStateId, setUserWatchStateId] = useState(0)

	const userWatchRef = useRef(null);

	const ifDub = details.id.includes('-dub') ? details.id.replace('-dub', '') : details.id;
	const ifSub = details.id.includes('-dub') ? details.id : details.id + '-dub';



	const fetchComments = () => {
		try {
			setIsLoading(true);
			dispatch(fetchCommentsData());
		} catch (error) {
			console.log('error occured while trying to fetch comments', error)
			setIsLoading(false);
		}
	}
	const fetchByID = () => {
		try {
			dispatch(fetchAnimeById(id ? id : ''));

			dispatch(setDetails(details))

		} catch (error) {
			console.log('error occured while trying to fetch anime page', error)
			setIsLoading(false);
		}
	}
	const fetchPlayer = () => {
		try {
			if (id && currentEpisode) {
				dispatch(fetchAnimePlayer({ id, currentEpisode }))
			}
			setIsLoading(false);
		} catch (error) {
			console.log('error occured while trying to fetch anime player', error)
			setIsLoading(false);
		}
	}


	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		fetchComments();
		fetchByID();
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [])

	useEffect(() => {
		if (details.episodes.length !== 0) {
			fetchPlayer();
			console.log(sources)
		}
	}, [items, details, currentEpisode])

	useEffect(() => {
		setEpisodes(details.episodes.map((item) => item.number.toString()));
		console.log(episodes)
	}, [details])

	const states = [
		{ value: 'purple', state: 'Смотрю' },
		{ value: 'green', state: 'Просмотрено' },
		{ value: 'orange', state: 'Запланировано' },
	]

	const [favorite, setFavorite] = useState(false);

	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	const handleModal = () => {
		if (listModalOpen === true) {
			setListModalOpen(false);
		}
	}

	const handleUserState = (id: number) => {
		if (id === userWatchStateId) {
			return setUserWatchStateId(0)
		}
		setUserWatchStateId(id);
	}

	return (
		<div className={`wrapper ${isModalOpen ? 'activeModal' : ''}`}>
			{isModalOpen && <Modal />
			}
			<div className='container'>
				<Header />
				<div className={`back-slider${scrollPosition < 600 ? ' slide' : ''}`}>
					<Link to={'/'} className={`button back-button `}>
						<h2>
							✖
						</h2>
					</Link>
				</div>
				<div className="anime-page " onClick={() => handleModal}>

					<div className="content">

						<div className="content-leftside">
							<div className="content-leftside__image">
								<img src={details.image}></img>
								<div className='content-leftside__favorite'>
									<img className={`${favorite ? 'favorited' : ''}`} onClick={() => setFavorite(!favorite)} src={favorite ? FavoriteFilled : Favorite}></img>
								</div>
							</div>
							<div className={`content-leftside-state`}>
								<button onClick={() => setListModalOpen(!listModalOpen)} type='button'
									className={`content-leftside-state__block ${userWatchStateId === 0 ? 'blue__bg' : states[userWatchStateId - 1].value + `__bg`}`}
								>
									{userWatchStateId === 0 ? 'Добавить в список' : states[userWatchStateId - 1].state}
								</button>
								{
									<div className={`content-leftside-state-usermodal ${listModalOpen ? 'active' : ''}`} >
										<ul ref={userWatchRef} onClick={() => setListModalOpen(!listModalOpen)} className={`content-leftside-state-usermodal-list ${listModalOpen ? 'active' : ''}`}>
											<li onClick={() => handleUserState(1)} className={"content-leftside-state-usermodal-list__item"} >Смотрю</li>
											<li onClick={() => handleUserState(2)} className="content-leftside-state-usermodal-list__item" > Просмотрено</li>
											<li onClick={() => handleUserState(3)} className="content-leftside-state-usermodal-list__item" > Запланировано</li>
										</ul>
									</div>
								}
							</div>
						</div>
						<div className="content-rightside">
							<h1>{details.title} </h1>
							<span>{details.otherName}</span>
							<div className="information">
								<div className="information__title blue">INFORMATION</div>
								<h2><span>Category:</span> {details.type}</h2>
								<h2><span>Status:</span> {details.status} </h2>
								<h2><span>Episodes:</span> {details.totalEpisodes} </h2>
								<h2><span>VoiceOver:</span> {details.subOrDub?.toUpperCase()} </h2>
								<h2><span>Genres:</span> {details.genres?.map((word, id) => <button key={id} className='button genre_button'> {word}</button>)} </h2>
								<article>
									<h2 className={'description'}><span>Description:</span> <br />{details.description} </h2>
								</article>
							</div>
						</div>
					</div>
					<article>
						<div onClick={() => setOpenDescription(!openDescription)} className={`description-mobile${openDescription ? ' active' : ''}`}><span>Description:</span> <br /><h2>{details.description} </h2></div>
					</article>
					<div className='watch'>
						{
							(sources.length !== 0 && <>
								<Link reloadDocument className='watch__watchsub' to={`/anime/${ifDub}`} > Watch Sub </Link>
								<Link reloadDocument className='watch__watchdub' to={`/anime/${ifSub}`} > Watch Dub </Link>
							</>
							)
						}
						<h2> Watch online </h2>
						<div className='watch-anime'>
							{
								(sources.length === 0
									? <div className='watch-anime__placeholder'></div>
									: <div className='watch-anime__container'>
										<iframe allowFullScreen={true} height={450} width={1200} className='watch-anime__display' scrolling="no" src={`${sources[0]}`}></iframe>
									</div>
								)
							}
							{
								(!isLoading && sources.length === 0 && <h2> Плеер не доступен </h2>)
							}
							<div className="watch-anime__settings">
								<div className='episode-list'>
									<ul>
										{episodes && episodes.map((ep, id) =>
											<li key={id} className={`${id + 1 === currentEpisode ? 'episode__active' : ''}`}
												onClick={() => setCurrentEpisode(id + 1)}>{ep}
											</li>
										)}
									</ul>
								</div>
							</div>
						</div>
					</div >

					<div className="comment-section">
						<h2 className='comment-title'>Comments</h2>
						{
							//(items ? items.map((comment) =>
							//	<div className='comment-section__comment'>
							//		{comment && <img className='comment-avatar' src={`${comment.user.avatarUrl}`} />}
							//		<div className='comment-text'>
							//			<h2>{comment.user.userName}</h2>
							//			<p>{comment.text}</p>
							//		</div>
							//		<p className='comment-likes'>{comment.likesCount}</p>
							//		<p>+</p>
							//	</div>
							//) : <h1> nvm </h1>)
						}
					</div>
				</div >
			</div >
		</div >
	)
}
export default AnimePage;