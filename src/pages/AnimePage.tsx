import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { useAppDispatch, useTypedSelector } from '../hooks/redux'
import { IAnimeData, IAnimeDetails, IAnimePlayer, ISources } from '../models/IAnime'
import { setPlayerSources } from '../store/reducers/animePlayerSlice'
import fetchAnimeSlice, { setDetails } from '../store/reducers/fetchAnimeSlice'
import HomePage from './HomePage'




const AnimePage: React.FC = () => {


	const { details } = useTypedSelector(state => state.fetchAnimeSlice)
	const sources = useTypedSelector(state => state.animePlayer.sources)

	const dispatch = useAppDispatch();
	let { id } = useParams();


	useEffect(() => {
		const fetchAnime = async () => {
			try {
				const { data } = await axios.get<IAnimeDetails>(`https://api.consumet.org/anime/gogoanime/info/${id}`)
				dispatch(setDetails(data))
			} catch (error) {
				console.log('error occured while trying to fetch anime page')
			}
			try {
				const url = `https://api.consumet.org/anime/gogoanime/watch/${id}-episode-1`;
				const { data } = await axios.get<IAnimePlayer>(url, { params: { server: "gogocdn" } })
				dispatch(setPlayerSources(data.sources))
				console.log(data.sources)
			} catch (error) {
				console.log('error occured while trying to fetch anime page')
			}

		}
		fetchAnime()

	}, [])
	console.log(sources)
	return (
		<div className='wrapper'>
			<div className='container'>
				<Header />
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
					<h2> Watch now </h2>
					<div className='watch-anime'>
						<video width={320} height={240} controls>
							{
								(sources && <source src={`{sources[5].url}`} type="video/m3u8" />)
							}
						</video>
						<div className="watch-anime__settings">
							<div className="episode__modal">1</div>
							<div className="studio__modal">lmaos</div>
						</div>
					</div>
				</div>


				<button className='button back-button'>
					<Link to={'/'}>BACK</Link>
				</button>
			</div>
		</div>

	)

}

export default AnimePage