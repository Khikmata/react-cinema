import axios from 'axios'
import React, { useEffect, useState, memo } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { useAppDispatch, useTypedSelector } from '../hooks/redux'
import { IAnimeData, IAnimeDetails, IAnimePlayer, ISources } from '../models/IAnime'
import { setPlayerSources } from '../store/reducers/animePlayerSlice'
import fetchAnimeSlice, { setDetails } from '../store/reducers/fetchAnimeSlice'
import HomePage from './HomePage'

interface IShow {
	url: string;
}

const AnimePage: React.FC = () => {


	const { details } = useTypedSelector(state => state.fetchAnimeSlice)
	const sources = useTypedSelector(state => state.animePlayer.sources)

	const [isLoading, setIsLoading] = useState(true)
	const [episodes, setEpisodes] = useState<string[]>([])
	const [currentEpisode, setCurrentEpisode] = useState(1);
	const [quality, setQuality] = useState<string[]>([])
	const [watchUrl, setWatchUrl] = useState<string[]>([])

	const dispatch = useAppDispatch();
	let { id } = useParams();

	const fetchAnime = async () => {
		try {
			setIsLoading(true);
			const responcePage = await axios.get<IAnimeDetails>(`https://api.consumet.org/anime/gogoanime/info/${id}`)
			setEpisodes(responcePage.data.episodes.map((item) => item.number.toString()));
			dispatch(setDetails(responcePage.data))

			const watchUrl = `https://api.consumet.org/anime/gogoanime/servers/${id}-episode-${currentEpisode}`
			const responseAnime = await axios.get<IShow[]>(watchUrl);
			setWatchUrl(responseAnime.data.map((item) => item.url));
			setIsLoading(false);
			//const url = `https://api.consumet.org/anime/gogoanime/servers/${id}-episode-${responcePage.data.episodes[0].number}`;
			//console.log(1)
			//const responsePlayer = await axios.get<IAnimePlayer>(url, { params: { server: "streamsb" } })
			//console.log(1)
			//setQuality(responsePlayer.data.sources.map((item) => item.quality));
			//console.log(1)
			//dispatch(setPlayerSources(responsePlayer.data.sources))

		} catch (error) {
			console.log('error occured while trying to fetch anime player')
			setIsLoading(false);
		}
	}

	console.log(watchUrl)

	useEffect(() => {
		fetchAnime();
	}, [currentEpisode])

	return (
		<div className='wrapper'>
			<div className='container'>
				<Header />
				<div className="anime-page">
					<div className='button back-button'>
						<Link to={'/'} >
							GO BACK
						</Link>
					</div>
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
					<div className='watch'>
						<h2> Watch online </h2>
						<div className='watch-anime'>
							{
								(watchUrl.length === 0
									? <div className='watch-anime__placeholder'></div>
									: <iframe allowFullScreen={true} height={450} width={800} className='watch-anime__display' scrolling="no" src={`${watchUrl[0]}`}></iframe>
								)
							}
							{
								(!isLoading && watchUrl.length === 0 && <h2> Плеер не доступен </h2>)
							}
							<div className="watch-anime__settings">
								<div className='episode-list'><ul>{episodes.map((ep, id) => <li key={id} className={`${id + 1 === currentEpisode ? 'episode__active' : ''}`} onClick={() => setCurrentEpisode(id + 1)}>{ep}</li>)}</ul></div>
								{/* <button className="studio__modal button">{details.episodes.map((eo))}</button> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >

	)

}

export default AnimePage