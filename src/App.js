import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import useToggle from './hooks/useToggle';
import HomePage from './pages/HomePage/HomePage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import NewRecipePage from './pages/NewRecipePage/NewRecipePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import RecipePage from './pages/RecipePage/RecipePage';
import BottomNav from './components/app/BottomNav/BottomNav';

import RecipeContextProvider from './contexts/RecipeContext/RecipeContext';

import logo from './logo.svg';
import './App.css';
import FilterControlSidebar from './components/app/FilterControlSidebar/FilterControlSidebar';

function App() {
	const [isShown, toggleShow] = useToggle(false);
	
	return (
		<div className="App">
			<RecipeContextProvider>
				<FilterControlSidebar 
					show={isShown}
					onClose={() => toggleShow(false)}
				/>
				<Router>
					<header className="App-header">
						<Button onClick={toggleShow}>Filters</Button>
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
