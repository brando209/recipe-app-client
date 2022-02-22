import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Heart from '../../spinners/Heart/Heart';

function LoadingHeart({ isLoading, defaultText, loadingText, ...props }) {
    return (
        <StyledLoadingHeart disabled={isLoading} {...props}>
            {isLoading ? 
                <div>
                    <Heart /> {" "}
                    {loadingText || "Loading..."}
                </div>
            :
                defaultText || "Load"
            }
        </StyledLoadingHeart>
    )
}

export default LoadingHeart

const StyledLoadingHeart = styled(Button)`
    > div {
        display: flex;
        flex-direction: row;
        width: 150px;
    }
`