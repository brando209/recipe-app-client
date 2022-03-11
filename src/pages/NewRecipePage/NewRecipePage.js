import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import Page from '../Page/Page';
import NewRecipeForm from '../../components/form/NewRecipeForm/NewRecipeForm';
import { useRecipeContext } from '../../contexts/RecipeContext/RecipeContext';
import { useAppContext } from '../../contexts/AppContext/AppContext';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import useResource from '../../hooks/useResource';
import LoadingHeart from '../../components/display/buttons/LoadingHeart/LoadingHeart';

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
            if (err) console.error(err);
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
                    <Button variant="success" type="submit" form="import-form">Import</Button>
                </>
            )
        });
        showDialog();
    }

    return (
        <Page>
            <h1>New Recipe</h1>
            <LoadingHeart 
                variant="secondary" 
                isLoading={importing}
                defaultText="Import"
                loadingText="Importing..."
                onClick={handleImportClick} 
            />
            <NewRecipeForm 
                onSubmit={handleCreateRecipe} 
                initialValues={importedRecipe || initialValues} 
                isImporting={importing} 
                error={error} 
            />
        </Page>
    );
}