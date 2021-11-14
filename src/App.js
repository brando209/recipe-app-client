import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Favorites from './pages/Favorites/Favorites';
import NewRecipe from './pages/NewRecipe/NewRecipe';
import Settings from './pages/Settings/Settings';
import BottomNav from './components/app/BottomNav/BottomNav';

import RecipeContextProvider from './contexts/RecipeContext/RecipeContext';

import logo from './logo.svg';
import './App.css';

function App() {
	return (
		<div className="App">
			<RecipeContextProvider>
				<Router>
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
					</header>

					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/favorites" element={<Favorites />} />
						<Route path="/new" element={<NewRecipe />} />
						<Route path="/settings" element={<Settings />} />
					</Routes>

					<BottomNav />
				</Router>
			</RecipeContextProvider>
		</div>
	);
}

export default App;
