import styled from 'styled-components';
import { useAppContext } from '../../contexts/AppContext/AppContext';

export default function Page({ children, ...props }) {
    const { theme } = useAppContext();

    return (
        <PageContainer theme={theme} {...props}>
            { children }
            <div className="footer"></div>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    background: ${props => props.theme.contrast};
    width: 100%;
    margin: 0 auto;
    padding: 0.5rem;
    min-height: 86vh;

    .footer {
        height: 5rem;
        width: 100%;
        background: transparent;
    }
`