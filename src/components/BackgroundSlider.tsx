import React, { useState, useEffect } from 'react';
import { IAnimeData } from '../models/IAnime';

interface Props {
	images: Array<string>;
	interval: number;
	items: Array<IAnimeData>;
}

const BackgroundSlider: React.FC<Props> = ({ images, interval, items }) => {
	const [imageIndex, setImageIndex] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, interval);
		return () => clearInterval(intervalId);
	}, [images, interval]);

	return (
		<div className="main-display">
			<div className="main-display__image">
				<img src={images[imageIndex]} alt="image description" />
				{items && items[imageIndex] && (
					<div className="image-title">{items[imageIndex].title}</div>
				)}
			</div>
		</div>
	);
};

export default BackgroundSlider;
