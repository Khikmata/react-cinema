import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { useAppDispatch, useTypedSelector } from '../hooks/redux'
import { IAnimeData, IAnimeDetails } from '../models/IAnime'
import fetchAnimeSlice, { setDetails } from '../store/reducers/fetchAnimeSlice'
import HomePage from './HomePage'




const AnimePage: React.FC = () => {


	const { details } = useTypedSelector(state => state.fetchAnimeSlice)

	const dispatch = useAppDispatch();
	let { id } = useParams();


	useEffect(() => {
		const fetchAnime = async () => {
			try {
				const { data } = await axios.get<IAnimeDetails>(`https://api.consumet.org/anime/gogoanime/info/${id}`)

				dispatch(setDetails(data))
			} catch (error) {

			}

		}
		fetchAnime()

	}, [])

	console.log(details)
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
						<h1>{details.title}</h1>
					</div>
				</div>


				<button>
					<Link to={'/'}>back</Link>
				</button>
			</div>
		</div>

	)

}

export default AnimePage