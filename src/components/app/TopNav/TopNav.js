import styled from 'styled-components';
import Button from '../../input/Button/Button';
import { Navbar, Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../../contexts/AuthContext/AuthContext';
import { useRecipeContext } from '../../../contexts/RecipeContext/RecipeContext';
import { useAppContext } from '../../../contexts/AppContext/AppContext';
import Search from '../../input/Search/Search';
import NavLinks from '../NavLinks/NavLinks';

export default function TopNav({ onShowFilter }) {
    const { showSidebar } = useAppContext();
    const { filter, updateFilter } = useRecipeContext();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();
    const { theme } = useAppContext();

    const showSearchAndFilter = pathname === "/" || pathname === "/favorites";

    if (!auth.user) return null;

    return (
        <StyledTopNav theme={theme} sticky="top">
            <Nav>
                <Nav.Item className="back-btn">
                    <Button
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                </Nav.Item>

                <NavLinks className="largeScreenOnly" minWidth="50vw" maxWidth="60vw" textOnHover={true} />

                <Nav.Item className={`${showSearchAndFilter ? "" : "hide"}`}>
                    <Button
                        className="show-filters-btn"
                        onClick={() => showSidebar()}
                    >
                        Filters
                    </Button>
                </Nav.Item>

                <Nav.Item className={`nav-search ${showSearchAndFilter ? "" : "hide"}`}>
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
    border-bottom: 1px solid ${props => props.theme.main};
    background-color: ${props => props.theme.secondary};

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

    .hide {
        opacity: 0;
        pointer-events: none;
    }

    .nav-search.hide {
        display: none;
    }

    @media (min-width: 1024px) {
        .largeScreenOnly {
            display: flex;
        }
    }
`