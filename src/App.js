import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import NewRecipePage from './pages/NewRecipePage/NewRecipePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import RecipePage from './pages/RecipePage/RecipePage';
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
						<Route path="/" element={<HomePage />} />
						<Route path="/favorites" element={<FavoritesPage />} />
						<Route path="/new" element={<NewRecipePage />} />
						<Route path="/settings" element={<SettingsPage />} />
						<Route path="/recipe/:recipeId" element={<RecipePage />} />
					</Routes>

					<BottomNav />
				</Router>
			</RecipeContextProvider>
		</div>
	);
}

export default App;
