import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Badge } from 'react-bootstrap';
import { Heart, HeartFill, Trash, PencilSquare } from 'react-bootstrap-icons';
import Button from '../../input/Button/Button';
import { useAppContext } from '../../../contexts/AppContext/AppContext';
import List from '../../display/List/List';
import { formatDuration } from '../utils';

export default function RecipeDetails({ recipe, onFavorite, onDelete }) {
    const navigate = useNavigate();
    const { setDialog, showDialog, hideDialog } = useAppContext();
    const { id, title, description, ingredients, instructions, comments, categories, serves, prepTime, cookTime, totalTime, photo, favorite } = recipe;
    
    const handleFavoriteClick = () => onFavorite(id, favorite);

    const handleDeleteClick = () => {
        setDialog({
            title: "Delete Recipe",
            text: "You are about to delete this recipe. This action cannot be undone. Are you sure you would like to delete this recipe?",
            footer: (
                <>
                    <Button variant="secondary" onClick={() => hideDialog()}>Cancel</Button>
                    <Button onClick={() => onDelete(id, () => hideDialog())}>Delete</Button>
                </>
            )
        });
        showDialog();
    }

    const handleEditClick = () => {
        navigate(`/recipe/${id}/edit`);
    }

    return (
        <StyledRecipeDetails>
            <RecipeDetailsTop>
                <div>
                    <h1>{title}</h1>
                    {favorite ?
                        <HeartFill onClick={handleFavoriteClick} /> :
                        <Heart onClick={handleFavoriteClick} />
                    }
                </div>
                <div>
                    <PencilSquare onClick={handleEditClick} />
                    <Trash onClick={handleDeleteClick} />
                </div>
            </RecipeDetailsTop>

            <RecipeDetailsMiddle>
                <RecipeImage src={photo.path ? `/${photo.path}` : ""} alt="" />
                <div>
                    <p>
                        <label>Serves:&nbsp;</label>
                        {serves}
                    </p>
                    <p>
                        <label>Prep&nbsp;Time:&nbsp;</label>
                        {formatDuration(prepTime)}
                    </p>
                    <p>
                        <label>Cook&nbsp;Time:&nbsp;</label>
                        {formatDuration(cookTime)}
                    </p>
                    <p>
                        <label>Total&nbsp;Time:&nbsp;</label>
                        {formatDuration(totalTime)}</p>
                </div>
                <p>{description}</p>
            </RecipeDetailsMiddle>

            <RecipeDetailsBottom>
                {categories &&
                    <List
                        type="ul"
                        heading="Categories"
                        listStyle={{ listStyleType: "none", padding: "0", margin: "0 0 5px 0" }}
                        direction="horizontal"
                        listItems={categories}
                        renderItem={(category) => <Badge className="m-1">{category.name}</Badge>}
                    />
                }   

                <List
                    type="ul"
                    heading="Ingredients"
                    listItems={ingredients}
                    renderItem={(ingredient) => `${ingredient.quantity ? ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""} ${ingredient.name}${(ingredient.size ? ", " + ingredient.size : "")} ${ingredient.comment ? "(" + ingredient.comment + ")" : ""}`}
                />

                <List
                    type="ol"
                    heading="Instructions"
                    listItems={instructions}
                />

                {comments &&
                    <List
                        heading="Additional Comments"
                        listItems={comments}
                    />
                }
            </RecipeDetailsBottom>
        </StyledRecipeDetails>
    )
}

const StyledRecipeDetails = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem auto;
`

const RecipeDetailsTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > div {
        display: flex;
        flex-direction: row;
        justify-content: flex-end; 
        align-items: flex-start;
        margin-right: 1rem;
        gap: 1rem;

        > svg {
            min-height: 1.5rem;
            min-width: 1.5rem;
        }

        > svg:hover {
            cursor: pointer;
        }
    }

    > div:first-child {
        > svg {
            color: var(--color-red);
        }
    }
    
    @media (min-width: 428px) {
        > div:first-child {
            flex: 0.8;
        }   
    }
`

const RecipeDetailsMiddle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    > div {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        flex-wrap: wrap;
        width: 100%;
        
        > p {
            flex: 1;
            margin: 0.25rem;
            padding: 0.125rem;
            border: 2px solid ${props => props.theme.main};
            border-radius: 5px;
            font-weight: 200;
            background-color: ${props => props.theme.contrast};

            > label {
                font-weight: 400;
                display: inline;
            }
        }
    }

    > p {
        text-align: left;
        padding: 0.5rem;
        order: 3;
    }
`

const RecipeImage = styled.img`
    width: 100%;
    min-height: 150px;
    max-height: 12rem;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    object-position: center;
    border-radius: 5px;
    margin: 0.25rem;
    border: 2px solid ${props => props.theme.main};
`

const RecipeDetailsBottom = styled.div`

`