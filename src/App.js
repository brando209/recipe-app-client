import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useToggle from './hooks/useToggle';
import HomePage from './pages/HomePage/HomePage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import NewRecipePage from './pages/NewRecipePage/NewRecipePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import RecipePage from './pages/RecipePage/RecipePage';
import EditRecipePage from './pages/EditRecipePage/EditRecipePage';
import TopNav from './components/app/TopNav/TopNav';
import BottomNav from './components/app/BottomNav/BottomNav';
import FilterControlSidebar from './components/app/FilterControlSidebar/FilterControlSidebar';
import Dialog from './components/display/Dialog/Dialog';

import DialogContextProvider from './contexts/DialogContext/DialogContext';
import RecipeContextProvider from './contexts/RecipeContext/RecipeContext';

import './App.css';

function App() {
	const [isShown, toggleShow] = useToggle(false);

	return (
		<div className="App">
			<DialogContextProvider>
				<RecipeContextProvider>
					<FilterControlSidebar
						show={isShown}
						onClose={() => toggleShow(false)}
					/>
					<Dialog />
					<Router>
						<TopNav onShowFilter={() => toggleShow(true)} />
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/favorites" element={<FavoritesPage />} />
							<Route path="/new" element={<NewRecipePage />} />
							<Route path="/settings" element={<SettingsPage />} />
							<Route path="/recipe/:recipeId" element={<RecipePage />} />
							<Route path="/recipe/:recipeId/edit" element={<EditRecipePage />} />
						</Routes>

						<BottomNav />
					</Router>
				</RecipeContextProvider>
			</DialogContextProvider>
		</div>
	);
}

export default App;
