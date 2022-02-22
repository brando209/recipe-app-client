import styled from 'styled-components';
import Page from '../Page/Page';
import GroceryListForm from '../../components/form/GroceryListForm/GroceryListForm';

function GroceryListPage() {
  return (
    <Page>
        <h1>Grocery List</h1>
        <GroceryListForm />
    </Page>
  )
}

export default GroceryListPage