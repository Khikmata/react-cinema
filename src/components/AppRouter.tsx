import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from "../pages/HomePage";
import AnimePage from "../pages/AnimePage";
import SearchPage from "../pages/SearchPage";

const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/anime/:id" element={<AnimePage />} />
			<Route path="/search" element={<SearchPage />} />
		</Routes>
	)
}

export default AppRouter