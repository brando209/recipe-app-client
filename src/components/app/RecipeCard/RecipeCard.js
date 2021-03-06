import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';
import { formatDuration, toMinutes } from '../utils';

export default function RecipeCard(props) {
    const navigate = useNavigate();
    const { title, description, serves, prepTime, cookTime, totalTime, favorite, id, photo } = props;

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        props.onFavorite(id, favorite);
    }

    //Assume, for now, that if there is no prep or cook time then only display the total time
    const showTotal = toMinutes(prepTime) === 0 && toMinutes(cookTime) === 0;

    return (
        <StyledRecipeCard>
            <CardBody onClick={() => navigate(`/recipe/${id}`)}>
                <CardBodyLeft>
                    <Card.Title className="recipe-card-title">
                        {title}{" "}
                        <span className="favorite-btn">
                            {favorite ?
                                <HeartFill onClick={handleFavoriteClick} /> :
                                <Heart onClick={handleFavoriteClick} />
                            }
                        </span>
                    </Card.Title>
                    <Card.Subtitle className="recipe-info">Serves: {serves}</Card.Subtitle>
                    {toMinutes(prepTime) > 0 &&
                        <Card.Subtitle className="recipe-info">Prep: {formatDuration(prepTime)}</Card.Subtitle>
                    }
                    {toMinutes(cookTime) > 0 &&
                        <Card.Subtitle className="recipe-info">Cook: {formatDuration(cookTime)}</Card.Subtitle>
                    }
                    {showTotal &&
                        <Card.Subtitle className="recipe-info">Total: {formatDuration(totalTime)}</Card.Subtitle>
                    }
                    <Card.Text className="recipe-card-text">
                        {description}
                    </Card.Text>
                </CardBodyLeft>
                <CardBodyRight>
                    <Card.Img className="recipe-card-img" src={photo.path ? `/${photo.path}` : ""} alt="" />
                </CardBodyRight>
            </CardBody>
        </StyledRecipeCard>
    )
}

const StyledRecipeCard = styled(Card)`
    height: 15rem;
    width: 90%;
    max-width: 30rem;
    margin: 0;
    margin-bottom: 0.5rem;
    background: ${props => props.theme.contrast};
    overflow: hidden;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);

    @media (min-width: 768px) {
        width: 100%;
        margin: 0.5rem;
    }
`

const CardBody = styled(Card.Body)`
    display: flex;
    flex-direction: row;
    height: 100%;
`

const CardBodyLeft = styled.div`
    text-align: left;
    flex: 0.5;
    min-width: 100px;
    height: 100%;

    .recipe-info {
        margin: 0.5rem auto;
        color: grey;
        font-size: small;
    }

    .recipe-card-title {
        font-size: medium;
        min-height: 3.5rem;
        
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        line-clamp: 3; 
    }

    .recipe-card-text {
        position: absolute;
        bottom: 0;
        width: 90%;
        margin: 1rem auto;
        font-size: small;
        
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2; 
    }

    .favorite-btn {
        color: var(--color-red);
    }

    @media (min-width: 375px) {
        .recipe-info {
            font-size: medium;
        }
        .recipe-card-title {
            font-size: large;
        }
    }

    @media (min-width: 425px) {
        .recipe-card-text {
            position: relative;
            width: 100%;
            margin: 0.5rem auto;
            
            -webkit-line-clamp: 3;
            line-clamp: 3; 
        }
    }
`
const CardBodyRight = styled.div`
    text-align: right;
    flex: 0.5;
    padding-left: 1rem;
    padding-bottom: 1rem;

    > img {
        width: 100%;
        min-height: 150px;
        max-height: 12rem;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        object-position: center;
    }
`