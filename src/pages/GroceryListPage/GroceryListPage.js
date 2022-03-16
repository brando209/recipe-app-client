import Page from '../Page/Page';
import GroceryListForm from '../../components/form/GroceryListForm/GroceryListForm';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import useResource from '../../hooks/useResource';
import { plannerApi, authHeader } from '../../api';

function GroceryListPage() {
	const auth = useAuth();
	const { value: groceryItems, setValue: setGroceryItems, loading } = useResource(
		'/api/planner/grocery',
		{ headers:  authHeader(auth.user?.token)},
		true,
		[auth.user?.token]
	);

	const handleItemAdd = async (name) => {
		if(!name || name === "") return;
		const newItem = await plannerApi.createGroceryItem({
			name: name.trim()
		}, authHeader(auth.user?.token));
		setGroceryItems(prev => {
			return [...prev, newItem.data];
		})
	}

	const handleItemCheck = (itemId, complete) => {
		setGroceryItems(prev => {
			const updatedItems = prev.slice();
			const updatedIndex = prev.findIndex(item => item.id === itemId);
			const updatedItem = { ...prev[updatedIndex] };
			updatedItem.complete = !updatedItem.complete;
			updatedItems[updatedIndex] = updatedItem;
			return updatedItems;
		});

		plannerApi.updateGroceryItem(itemId, { complete: !complete }, authHeader(auth.user?.token));
	}

	const handleItemEdit = (itemId, newName) => {
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
		plannerApi.updateGroceryItem(itemId, { name: newName }, authHeader(auth.user?.token));
	}

	const handleItemRemove = (itemId) => {
		setGroceryItems(prev => {
			return prev.slice().filter(item => item.id).filter(item => item.id !== itemId);
		});
		if(!itemId) return;
		plannerApi.deleteGroceryItem(itemId, authHeader(auth.user?.token));
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