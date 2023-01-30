import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
	<ContentLoader
		className="anime-card"
		speed={2}
		width={200}
		height={400}
		viewBox="0 0 200 400"
		backgroundColor="#d8d8d8"
		foregroundColor="#ecebeb"
	>
		<rect x="1" y="0" rx="4" ry="4" width="200" height="290" />

		<rect x="2" y="300" rx="4" ry="4" width="200" height="40" />

	</ContentLoader>
);


export default Skeleton;