import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useToggle from './hooks/useToggle';
import HomePage from './pages/HomePage/HomePage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import NewRecipePage from './pages/NewRecipePage/NewRecipePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import RecipePage from './pages/RecipePage/RecipePage';
import EditRecipePage from './pages/EditRecipePage/EditRecipePage';
import LoginPage from './pages/LoginPage/LoginPage';
import GroceryListPage from './pages/GroceryListPage/GroceryListPage';
import MealPlannerPage from './pages/MealPlannerPage/MealPlannerPage';
import TopNav from './components/app/TopNav/TopNav';
import BottomNav from './components/app/BottomNav/BottomNav';
import FilterControlSidebar from './components/app/FilterControlSidebar/FilterControlSidebar';
import Dialog from './components/display/Dialog/Dialog';

import DialogContextProvider from './contexts/DialogContext/DialogContext';
import RecipeContextProvider from './contexts/RecipeContext/RecipeContext';
import AuthContextProvider, { useAuth } from './contexts/AuthContext/AuthContext';

import './App.css';

function PrivateRoute({ children }) {
	const auth = useAuth();

	if (auth.loading) return <div>Loading...</div>

	return (
		auth.user ? children : <Navigate to="/login" />
	)
}

function App() {
	const [isShown, toggleShow] = useToggle(false);

	return (
		<div className="App">
			<AuthContextProvider>
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
								<Route path="/login" element={<LoginPage />} />
								<Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
								<Route path="/favorites" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
								<Route path="/new" element={<PrivateRoute><NewRecipePage /></PrivateRoute>} />
								<Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
								<Route path="/grocery" element={<PrivateRoute><GroceryListPage /></PrivateRoute>} />
								<Route path="/planner" element={<PrivateRoute><MealPlannerPage /></PrivateRoute>} />
								<Route path="/recipe/:recipeId" element={<PrivateRoute><RecipePage /></PrivateRoute>} />
								<Route path="/recipe/:recipeId/edit" element={<PrivateRoute><EditRecipePage /></PrivateRoute>} />
							</Routes>

							<BottomNav />
						</Router>
					</RecipeContextProvider>
				</DialogContextProvider>
			</AuthContextProvider>
		</div>
	);
}

export default App;
