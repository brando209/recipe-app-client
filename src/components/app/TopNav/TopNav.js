import React from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../../contexts/AuthContext/AuthContext';
import { useRecipeContext } from '../../../contexts/RecipeContext/RecipeContext';
import useMediaQuery from '../../../hooks/useMediaQuery';
import Search from '../../input/Search/Search';
import NavLinks from '../NavLinks/NavLinks';

import './TopNav.css';

export default function TopNav({ onShowFilter }) {
    const { updateFilter } = useRecipeContext();
    const isLargeScreen = useMediaQuery("(min-width: 1081px)");
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();

    if(!auth.user) return null;

    return (
        <>
            {(isLargeScreen) && <Navbar className="top-bar">
                <Nav className="top-bar-nav">
                    <NavLinks />
                </Nav>
            </Navbar>}
            <Navbar className="top-bar" sticky="top">
                <Nav className="top-bar-nav">
                    <Nav.Item>
                        <Button
                            variant="outline-secondary"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Button>
                    </Nav.Item>

                    {(pathname === '/' || pathname === '/favorites') &&
                        <>
                            <Nav.Item>
                                <Button
                                    variant="secondary"
                                    className="show-filters-btn"
                                    onClick={onShowFilter}
                                >
                                    Filters
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Search
                                    onSubmit={(value) => updateFilter({ search: value })}
                                    initialValue=""
                                />

                            </Nav.Item>
                        </>
                    }
                </Nav>
            </Navbar>
        </>
    )
}