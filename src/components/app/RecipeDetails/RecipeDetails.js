import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Heart, HeartFill, Trash } from 'react-bootstrap-icons';
import { useDialogContext } from '../../../contexts/DialogContext/DialogContext';
import List from '../../display/List/List';

import './RecipeDetails.css';

export default function RecipeDetails({ recipe, onFavorite, onDelete }) {
    const { dialog, setDialog, setShow } = useDialogContext();
    const {
        id,
        title,
        description,
        ingredients,
        instructions,
        comments,
        serves,
        prep,
        cook,
        favorite
    } = recipe;

    const handleFavoriteClick = () => onFavorite(id, favorite);
    const handleDeleteClick = () => {
        setDialog({
            title: "Delete Recipe",
            text: "You are about to delete this recipe. This action cannot be undone. Are you sure you would like to delete this recipe?",
            footer: <><Button onClick={() => setShow(false)}>Cancel</Button><Button onClick={() => onDelete(id, () => setShow(false))}>Delete</Button></>
        });
        setShow(true);
    }

    return (
        <>
            <Row className="recipe-detail-row">
                <Col as="h2" xs="8">
                    {title}
                    {favorite ?
                        <HeartFill onClick={handleFavoriteClick} /> :
                        <Heart onClick={handleFavoriteClick} />
                    }
                </Col>
                <Col xs={3}>
                    <Button variant="outline-primary">
                        Edit
                    </Button>
                </Col>
                <Col xs={1}>
                    <Trash onClick={handleDeleteClick}/>
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
                    <img src="" alt="" />
                </Col>
            </Row>

            <Row className="recipe-detail-row">
                <p>{description}</p>
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