import React from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { useRecipeContext } from '../../../contexts/RecipeContext/RecipeContext';

import Search from '../../input/Search/Search';

import './TopNav.css';

export default function TopNav({ onShowFilter }) {
    const { updateFilter } = useRecipeContext();

    return (
        <Navbar className="top-bar" sticky="top">
            <Nav className="top-bar-nav">
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
                    <Search
                        onSubmit={(value) => updateFilter({ search: value })}
                        initialValue=""
                    />
                </>
            </Nav>
        </Navbar>
    )
}