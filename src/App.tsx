import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AnimePage from "./pages/AnimePage";
import { useAppDispatch, useTypedSelector } from "./hooks/redux";
import { useEffect } from 'react'
import axios from "axios";
import fetchAnimeSlice, { setItem } from "./store/reducers/fetchAnimeSlice";
import SearchPage from "./pages/SearchPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/anime/:id" element={<AnimePage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  )
}

export default App