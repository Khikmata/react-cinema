import axios from 'axios'
import React, { useEffect, useState, memo } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { useAppDispatch, useTypedSelector } from '../hooks/redux'
import { IAnimeData, IAnimeDetails, IAnimePlayer, ISources } from '../models/IAnime'
import { fetchAnimePlayer, setPlayerSources } from '../store/reducers/animePlayerSlice'
import { fetchCommentsData, getAllComments } from '../store/reducers/CommentSlice'
import fetchAnimeSlice, { fetchAnimeById, setDetails } from '../store/reducers/fetchAnimeSlice'
import HomePage from './HomePage'


const AnimePage: React.FC = () => {



	const { details } = useTypedSelector(state => state.fetchAnimeSlice)
	const { sources } = useTypedSelector(state => state.animePlayer)
	const { items } = useTypedSelector(state => state.comment.comments)

	const [isLoading, setIsLoading] = useState(true)
	const [episodes, setEpisodes] = useState<string[]>([])
	const [currentEpisode, setCurrentEpisode] = useState(1);

	const dispatch = useAppDispatch();
	let { id } = useParams();



	const fetchComments = () => {
		try {
			setIsLoading(true);
			dispatch(fetchCommentsData());
		} catch (error) {
			console.log('error occured while trying to fetch comments')
			setIsLoading(false);
		}
	}

	const fetchByID = () => {
		try {
			dispatch(fetchAnimeById(id ? id : ''));
			setEpisodes(details.episodes.map((item) => item.number.toString()));
			dispatch(setDetails(details))

		} catch (error) {
			console.log('error occured while trying to fetch anime page')
			setIsLoading(false);
		}
	}

	const fetchPlayer = () => {
		try {
			if (id && currentEpisode) {
				dispatch(fetchAnimePlayer({ id, currentEpisode }))
			}
			setIsLoading(false);
		} catch (err) {
			console.log('error occured while trying to fetch anime player')
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
	}, [items, details])


	const [scrollPosition, setScrollPosition] = useState(0);

	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	console.log(scrollPosition);




	return (
		<div className='wrapper'>
			<div className='container'>
				<Header />
				<div className={`back-slider${scrollPosition > 400 ? ' slide' : ''}`}>
					<Link to={'/'} className={`button back-button `}>
						<h2>
							✖
						</h2>
					</Link>
				</div>
				<div className="anime-page">

					<div className="content">

						<div className="content-leftside">
							<div className="content-leftside__image">
								<img src={details.image}></img>
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
								<h2><span>VoiceOver:</span> {details.subOrDub} </h2>
								<h2><span>Genres:</span> {details.genres?.map((word, id) => <button key={id} className='button genre_button'> {word}</button>)} </h2>
								<article>
									<h2 className='description'><span>Description:</span> <br />{details.description} </h2>
								</article>
							</div>
						</div>
					</div>
					<article>
						<div className='description-mobile'><span>Description:</span> <br /><h2>{details.description} </h2></div>
					</article>
					<div className='watch'>
						<h2> Watch online </h2>
						<div className='watch-anime'>
							{
								(sources.length === 0
									? <div className='watch-anime__placeholder'></div>
									: <div className='watch-anime__container'>
										<iframe allowFullScreen={true} height={450} width={800} className='watch-anime__display' scrolling="no" src={`${sources[0]}`}></iframe>
									</div>
								)
							}
							{
								(!isLoading && sources.length === 0 && <h2> Плеер не доступен </h2>)
							}
							<div className="watch-anime__settings">
								<div className='episode-list'>
									<ul>
										{episodes.map((ep, id) =>
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
							(items && items.map((comment) =>
								<div className='comment-section__comment'>
									<img className='comment-avatar' src={`${comment.user.avatarUrl}`} />
									<div className='comment-text'>
										<h2>{comment.user.userName}</h2>
										<p>{comment.text}</p>
									</div>
									<p className='comment-likes'>{comment.likesCount}</p>
									<p>+</p>
								</div>
							))}
					</div>
				</div >
			</div >
		</div >
	)
}
export default AnimePage;