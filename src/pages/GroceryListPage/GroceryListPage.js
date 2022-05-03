import { useCallback } from 'react';
import Button from '../../components/input/Button/Button';
import Page from '../Page/Page';
import GroceryListForm from '../../components/form/GroceryListForm/GroceryListForm';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { useAppContext } from '../../contexts/AppContext/AppContext';
import useResource from '../../hooks/useResource';
import { plannerApi, authHeader } from '../../api';

function GroceryListPage() {
	const auth = useAuth();
	const { setDialog, showDialog, hideDialog } = useAppContext();
	const { value: groceryItems, setValue: setGroceryItems, loading } = useResource(
		'/api/planner/grocery',
		{ headers:  authHeader(auth.user?.token)},
		true,
		[auth.user?.token]
	);

	const handleItemAdd = useCallback(async (name, cb = () => {}) => {
		if(!name || name === "") return;

		try {
			const newItem = await plannerApi.createGroceryItem({
				name: name.trim()
			}, authHeader(auth.user?.token));
			setGroceryItems(prev => {
				return [...prev, newItem.data];
			});
			cb();
		} catch (err) {
			if(err.response?.status === 401) {
				setDialog({
					title: "Restricted Access",
					text: err.response.data,
					footer: <Button onClick={hideDialog}>Ok</Button>
				});
				showDialog();
			}
			if(err.response?.status === 403) auth.logout();
		}
	}, [auth, setGroceryItems, setDialog, showDialog, hideDialog]);

	const handleItemRemove = useCallback(async (itemId) => {
		setGroceryItems(prev => {
			return prev.slice().filter(item => item.id).filter(item => item.id !== itemId);
		});
		if(!itemId) return;

		try {
			await plannerApi.deleteGroceryItem(itemId, authHeader(auth.user?.token));
		} catch(err) {
			auth.logout();
		}
	}, [auth, setGroceryItems]);

	const handleItemEdit = useCallback(async (itemId, newName) => {
		if(!itemId && (!newName || newName === "")) return;
		if(!newName || newName === "") return handleItemRemove(itemId);

		setGroceryItems(prev => {
			const updatedItems = prev.slice();
			const updatedIndex = prev.findIndex(item => item.id === itemId);
			const updatedItem = { ...prev[updatedIndex] };
			updatedItem.name = newName;
			updatedItems[updatedIndex] = updatedItem;
			return updatedItems;
		});
		
		try {
			await plannerApi.updateGroceryItem(itemId, { name: newName }, authHeader(auth.user?.token));
		} catch(err) {
			auth.logout();
		}
	}, [auth, setGroceryItems, handleItemRemove]);

	const handleItemCheck = async (itemId, complete) => {
		setGroceryItems(prev => {
			const updatedItems = prev.slice();
			const updatedIndex = prev.findIndex(item => item.id === itemId);
			const updatedItem = { ...prev[updatedIndex] };
			updatedItem.complete = !updatedItem.complete;
			updatedItems[updatedIndex] = updatedItem;
			return updatedItems;
		});

		try {
			await plannerApi.updateGroceryItem(itemId, { complete: !complete }, authHeader(auth.user?.token));
		} catch(err) {
			auth.logout();
		}
	}

	return (
		<Page>
			<h1>Grocery List</h1>
			{loading ? "Loading..." :
				<GroceryListForm 
					groceryItems={groceryItems}
					onItemAdd={handleItemAdd} 
					onItemCheck={handleItemCheck} 
					onItemEdit={handleItemEdit} 
					onItemRemove={handleItemRemove} 
				/>
			}
		</Page>
	)
}

export default GroceryListPage