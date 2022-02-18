import styled from 'styled-components';
import { HeartFill } from 'react-bootstrap-icons';

function Heart() {
    return (
        <StyledHeart>
            <HeartFill className='heart-icon-spinner'/>
        </StyledHeart>
    )
}

export default Heart;

const StyledHeart = styled.div`
    width: 50px;

    .heart-icon-spinner {
        animation-name: heartbeat;
        animation-duration: 0.5s;
        animation-iteration-count: infinite;
        color: red;
    }

    @keyframes heartbeat {
        from {
            height: 1rem;
            width: 1rem;
        }

        20% {
            height: 1rem;
            width: 1rem;
        }

        80% {
            height: 1.2rem; 
            width: 1.2rem;
        }

        to {
            height: 1.2rem; 
            width: 1.2rem;
        }
    }
`