import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import List from '../../display/List/List';

import './RecipeDetails.css';

export default function RecipeDetails({ recipe }) {
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
        favorite,
        categories
    } = recipe;

    console.log(ingredients, instructions)

    return (
        <>
            <Row className="recipe-detail-row">
                <Col as="h2" xs="8">
                    {title}
                    {favorite ?
                        <HeartFill /> :
                        <Heart />
                    }
                </Col>
                <Col>
                    <Button variant="outline-primary">
                        Edit
                    </Button>
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