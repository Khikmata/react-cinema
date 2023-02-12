import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
	<ContentLoader
		className="anime-card"
		speed={1}
		width={200}
		height={320}
		viewBox="0 0 200 320"
		backgroundColor="#d8d8d8"
		foregroundColor="#ecebeb"
	>
		<rect x="0" y="0" rx="4" ry="4" width="200" height="270" />

		<rect x="0" y="275" rx="4" ry="4" width="300" height="20" />

	</ContentLoader>
);


export default Skeleton;