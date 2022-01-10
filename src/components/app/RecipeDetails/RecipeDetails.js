import React from 'react';
import { useNavigate } from 'react-router';
import { Row, Col, Button, Badge } from 'react-bootstrap';
import { Heart, HeartFill, Trash } from 'react-bootstrap-icons';
import { useDialogContext } from '../../../contexts/DialogContext/DialogContext';
import List from '../../display/List/List';

import './RecipeDetails.css';

export default function RecipeDetails({ recipe, onFavorite, onDelete }) {
    const navigate = useNavigate();
    const { setDialog, setShow } = useDialogContext();
    const { id, title, description, ingredients, instructions, comments, categories, serves, prep, cook, photo, favorite } = recipe;

    const handleFavoriteClick = () => onFavorite(id, favorite);

    const handleDeleteClick = () => {
        setDialog({
            title: "Delete Recipe",
            text: "You are about to delete this recipe. This action cannot be undone. Are you sure you would like to delete this recipe?",
            footer: (
                <>
                    <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
                    <Button variant="secondary" onClick={() => onDelete(id, () => setShow(false))}>Delete</Button>
                </>
            )
        });
        setShow(true);
    }

    const handleEditClick = () => {
        navigate(`/recipe/${id}/edit`);
    }

    return (
        <>
            <Row className="recipe-detail-row">
                <Col as="h2" xs="8" lg="10">
                    {title}{" "}
                    <span className="favorite-btn">
                        {favorite ?
                            <HeartFill onClick={handleFavoriteClick} /> :
                            <Heart onClick={handleFavoriteClick} />
                        }
                    </span>
                </Col>
                <Col xs="3" lg="1">
                    <Button variant="outline-secondary" onClick={handleEditClick}>
                        Edit
                    </Button>
                </Col>
                <Col xs="1" className="delete-btn">
                    <Trash onClick={handleDeleteClick} />
                </Col>
            </Row>

            <Row className="recipe-detail-row">
                <Col xs="5">
                    <p>{"Serves: " + serves}</p>
                    <p>{"Prep Time: " + prep.time + " " + prep.unit}</p>
                    <p>{"Cook Time: " + cook.time + " " + cook.unit}</p>
                    <p>{"Total Time: " + (prep.time + cook.time) + " " + cook.unit}</p>
                </Col>
                <Col className="recipe-image-container">
                    <img src={photo.path ? `http://localhost:3005/${photo.path}` : ""} alt="" />
                </Col>
            </Row>

            <Row className="recipe-detail-row">
                <p>{description}</p>
            </Row>

            <Row>
                <List
                    type="ul"
                    heading="Categories"
                    listStyle={{ listStyleType: "none", padding: "0", margin: "0 0 5px 0" }}
                    direction="horizontal"
                    listItems={categories}
                    renderItem={(category) => <Badge className="m-1">{category.name}</Badge>}
                />
            </Row>

            <Row>
                <List
                    type="ul"
                    heading="Ingredients"
                    listItems={ingredients}
                    renderItem={(ingredient) => `${ingredient.amount ? ingredient.amount : ""} ${ingredient.measurement ? ingredient.measurement : ""} ${ingredient.name}${(ingredient.size ? ", " + ingredient.size : "")}`}
                />
            </Row>

            <Row>
                <List
                    type="ol"
                    heading="Instructions"
                    listItems={instructions}
                />
            </Row>

            <Row>
                <List
                    heading="Additional Comments"
                    listItems={comments}
                />
            </Row>
        </>
    )
}