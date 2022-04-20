import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import Page from '../Page/Page';
import Button from '../../components/input/Button/Button';
import LoadingHeart from '../../components/display/buttons/LoadingHeart/LoadingHeart';
import NewRecipeForm from '../../components/form/NewRecipeForm/NewRecipeForm';
import { useRecipeContext } from '../../contexts/RecipeContext/RecipeContext';
import { useAppContext } from '../../contexts/AppContext/AppContext';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import useResource from '../../hooks/useResource';

const initialValues = {
    title: "",
    description: "",
    serves: "",
    prep: {
        time: "",
        unit: "min"
    },
    cook: {
        time: "",
        unit: "min"
    },
    ingredients: [],
    instructions: [],
    comments: [],
    categories: [],
    photo: null
}

export default function NewRecipePage(props) {
    const auth = useAuth();
    const [importUrl, setImportUrl] = useState(null);
    const { loading: importing, error, value: importedRecipe } = useResource(
        importUrl,
        { headers: { authorization: `BEARER ${auth.user?.token}` } },
        true,
        [importUrl]
    );
    const { setDialog, showDialog, hideDialog } = useAppContext();
    const { createRecipe } = useRecipeContext();
    const navigate = useNavigate();

    const handleCreateRecipe = (recipeInfo, callback) => {
        createRecipe(recipeInfo, (recipe, err) => {
            if (err) {
                setDialog({
                    title: "Error",
                    text: err.response?.data,
                    footer: <Button onClick={hideDialog}>OK</Button>
                });
                showDialog();
                return callback();
            }
            callback();
            navigate('/');
        });
    }

    const handleImport = (e) => {
        e.preventDefault();
        setImportUrl(`/api/recipes/import?importUrl=${e.target.lastChild.value}`);
        hideDialog();
    }

    const handleImportClick = () => {
        setDialog({
            title: "Import Recipe",
            text: "Please enter the URL for the webpage containing the recipe you want to import.",
            body: (
                <form onSubmit={handleImport} id="import-form">
                    <input type="text" />
                </form>
            ),
            footer: (
                <>
                    <Button variant="secondary" onClick={() => hideDialog()}>Cancel</Button>
                    <Button type="submit" form="import-form">Import</Button>
                </>
            )
        });
        showDialog();
    }

    return (
        <Page>
            <StyledHeader>
                <h1>New Recipe</h1>
                <LoadingHeart 
                    isLoading={importing}
                    defaultText="Import"
                    loadingText="Importing..."
                    onClick={handleImportClick} 
                />
            </StyledHeader>
            <NewRecipeForm 
                onSubmit={handleCreateRecipe} 
                initialValues={importedRecipe || initialValues} 
                isImporting={importing} 
                error={error} 
            />
        </Page>
    );
}

const StyledHeader = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
`