import styled from 'styled-components';

export default function Page({ children, ...props }) {
    return (
        <PageContainer {...props}>
            { children }
        </PageContainer>
    );
}

const PageContainer = styled.div`
    background: var(--color-grey);
    width: 100%;
    margin: 0 auto;
    padding: 0;
    margin-bottom: 5rem;
`