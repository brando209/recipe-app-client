import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Heart, HeartFill } from 'react-bootstrap-icons';

import './RecipeCard.css';

export default function RecipeCard(props) {

    const { title, description, serves, prep, cook, ingredients, instructions, comments, id } = props;

    return (
        <Card className="recipe-card">
            <Card.Body className="recipe-card-body">
                <Row>
                    <Col className="recipe-card-body-left">
                        <Card.Title className="recipe-card-title">{title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Serves: {serves}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Prep time: {prep.time + " " + prep.unit}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Cook time: {cook.time + " " + cook.unit}</Card.Subtitle>
                        <Card.Text className="recipe-card-text">
                            {description}
                        </Card.Text>
                    </Col>
                    <Col className="recipe-card-body-right">
                        <Card.Img className="recipe-card-img" src="https://source.unsplash.com/zcUgjyqEwe8" />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )

}