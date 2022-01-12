import React from 'react';
import { useRecipeContext } from '../../../contexts/RecipeContext/RecipeContext';
import useResource from '../../../hooks/useResource';

import SlideinSidebar from '../../display/SlideinSidebar/SlideinSidebar';
import FilterRecipesForm from '../../form/FilterRecipesForm/FilterRecipesForm';

function FilterControlSidebar({ show, onClose }) {
    const { filter, updateFilter } = useRecipeContext();
    const { value: ingredients} = useResource('/api/ingredients');
    const { value: categories} = useResource('/api/categories');

    const handleApplyFilter = (filter) => {
        updateFilter(filter);
        onClose();
    }

    return (
        <SlideinSidebar show={show} onClose={onClose} title="Select your filters">
            <FilterRecipesForm
                initialFilter={filter}
                onSubmit={handleApplyFilter}
                ingredients={ingredients}
                categories={categories}
            />
        </SlideinSidebar>
    )
}

export default FilterControlSidebar;