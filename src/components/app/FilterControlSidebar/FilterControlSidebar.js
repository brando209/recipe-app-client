import React from 'react';
import { useAppContext } from '../../../contexts/AppContext/AppContext';
import { useRecipeContext } from '../../../contexts/RecipeContext/RecipeContext';
import useResource from '../../../hooks/useResource';

import SlideinSidebar from '../../display/SlideinSidebar/SlideinSidebar';
import FilterRecipesForm from '../../form/FilterRecipesForm/FilterRecipesForm';

function FilterControlSidebar() {
    const { sidebar, hideSidebar } = useAppContext();
    const { filter, updateFilter } = useRecipeContext();
    const { value: ingredients} = useResource('/api/ingredients');
    const { value: categories} = useResource('/api/categories');

    const handleApplyFilter = (filter) => {
        updateFilter(filter);
        hideSidebar();
    }

    return (
        <SlideinSidebar show={sidebar.show} onClose={() => hideSidebar()} title="Select your filters">
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