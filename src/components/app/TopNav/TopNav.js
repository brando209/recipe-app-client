import styled from 'styled-components';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../../contexts/AuthContext/AuthContext';
import { useRecipeContext } from '../../../contexts/RecipeContext/RecipeContext';
import Search from '../../input/Search/Search';
import NavLinks from '../NavLinks/NavLinks';

export default function TopNav({ onShowFilter }) {
    const { filter, updateFilter } = useRecipeContext();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();

    if (!auth.user) return null;

    return (
        <StyledTopNav sticky="top">
            <Nav>
                <Nav.Item className="back-btn">
                    <Button
                        variant="outline-secondary"
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                </Nav.Item>

                <NavLinks className="largeScreenOnly" minWidth="50vw" maxWidth="60vw" textOnHover={true} />

                <Nav.Item>
                    <Button
                        variant="secondary"
                        className="show-filters-btn"
                        onClick={onShowFilter}
                    >
                        Filters
                    </Button>
                </Nav.Item>

                <Nav.Item className="nav-search">
                    <Search
                        onSubmit={(value) => updateFilter({ search: value })}
                        initialValue={filter.search}
                    />
                </Nav.Item>
            </Nav>
        </StyledTopNav>
    )
}

const StyledTopNav = styled(Navbar)`
    padding: 0.5rem;
    background: var(--color-red);
    border-bottom: 1px solid #5c636a;

    .navbar-nav {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
    }
    
    .nav-search {
        flex-basis: 100%;
        padding-top: 0.25rem;
    }
    
    .largeScreenOnly {
        display: none;
    }

    @media (min-width: 1024px) {
        .largeScreenOnly {
            display: flex;
        }
    }
`