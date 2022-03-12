import styled from 'styled-components';

export default function Page({ children, ...props }) {
    return (
        <PageContainer {...props}>
            { children }
            <div className="footer"></div>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    background: var(--color-grey);
    width: 100%;
    margin: 0 auto;
    padding: 0.5rem;
    margin-bottom: 5rem;

    .footer {
        height: 5rem;
        width: 100%;
        background: transparent;
    }
`