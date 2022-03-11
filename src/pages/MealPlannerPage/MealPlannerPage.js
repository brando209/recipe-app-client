import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { Button, ButtonGroup } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useRecipeContext } from "../../contexts/RecipeContext/RecipeContext";
import { useAppContext } from "../../contexts/AppContext/AppContext";
import Calendar from "../../components/app/Calendar/Calendar"
import Page from "../Page/Page";
import useResource from "../../hooks/useResource";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import plannerApi from "../../api/planner";

const today = new Date();

function MealPlannerPage() {
    const auth = useAuth();
    const { showNavbar, hideNavbar } = useAppContext();
    const { data: recipes, loading } = useRecipeContext();
    const { value: plannedMeals, setValue: setPlannedMeals } = useResource(
        '/api/planner/meal',
        { headers: { authorization: `BEARER ${auth.user?.token}` } },
        true,
        [auth.user?.token]
    );
    const [showMealOptions, setShowMealOptions] = useState(false);
    const [calendar, setCalendar] = useState({ 
        view: "week", 
        selectedDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        plannedMeals: []
    });

    useEffect(() => {
        setCalendar(prev => {
            const meals = plannedMeals?.map(meal => {
                const recipe = recipes?.find(recipe => recipe.id === meal.recipeId);
                if(!recipe) return null;
    
                return {
                    id: meal.id,
                    title: recipe.title,
                    date: new Date(meal.date)
                }
            });
            return {
                ...prev,
                plannedMeals: meals
            }
        })
    }, [plannedMeals, recipes, setCalendar]);

    useEffect(() => {
        const recipeItemElements = document.querySelectorAll('p.recipe-item');
        const handleDragStart = (e) => {
            const dataTransfer = e.dataTransfer;
			const eventId = e.target.id;
			dataTransfer.effectAllowed = "copy";
			dataTransfer.dropEffect = "copy";
			dataTransfer.setData("text/plain", eventId);
			dataTransfer.setData("dropType", "add");
            document.querySelectorAll('.planned-recipes-container').forEach(container => {
                container.style.pointerEvents = "none";
            });
        }
        const handleDragEnd = (e) => {
			//Revert pointer-events on 'dragend'. (Set to "none" on 'dragstart')
			document.querySelectorAll('.planned-recipes-container').forEach(container => {
				container.style.pointerEvents = "revert";
			});
			e.preventDefault();
        }

        recipeItemElements.forEach(element => {
            element.addEventListener('dragstart', handleDragStart);
            element.addEventListener('dragend', handleDragEnd);
        });

        return () => {
            recipeItemElements.forEach(element => {
                element.removeEventListener('dragstart', handleDragStart);
                element.removeEventListener('dragend', handleDragEnd);
            });
        }
    });

    useEffect(() => {
        const trash = document.querySelector('.recipe-trash-dropzone');

        const handleDragEnter = (e) => {
            e.preventDefault();
            trash.classList.add("drag-on");
        }

        const handleDragLeave = (e) => {
            trash.classList.remove("drag-on");
            e.preventDefault();
        }
        
        const handleDragOver = (e) => {
            e.preventDefault();
        }

        const handleDrop = (e) => {
            trash.classList.remove("drag-on");
            console.log("dropped", e.dataTransfer.getData("text/plain"))
            handleDeletePlannedRecipe(e.dataTransfer.getData("text/plain"));
            e.preventDefault();
        }

        trash.addEventListener('dragenter', handleDragEnter);
        trash.addEventListener('dragleave', handleDragLeave);
        trash.addEventListener('dragover', handleDragOver);
        trash.addEventListener('drop', handleDrop);

        return () => {
            trash.removeEventListener('dragenter', handleDragEnter);
            trash.removeEventListener('dragleave', handleDragLeave);
            trash.removeEventListener('dragover', handleDragOver);
            trash.removeEventListener('drop', handleDrop);
        }
    }, []);

    const handleAddPlannedRecipe = useCallback(async (recipeId, date) => {
        const newPlannedMeal = await plannerApi.createMealPlanItem({ recipeId, date }, { authorization: `BEARER ${auth.user?.token}` });
        setPlannedMeals(prev => {
            return [...prev, newPlannedMeal.data];
        });
    }, [setPlannedMeals, auth.user?.token]);

    const handleMovePlannedRecipe = useCallback(async (id, date) => {
        setPlannedMeals(prev => {
            const mealIndex = prev.findIndex(meal => meal.id === id);
            const changedMeal = { ...prev[mealIndex], date: date };
            const newPlannedMeals = [...prev];
            newPlannedMeals[mealIndex] = changedMeal;
            return newPlannedMeals;
        });
        await plannerApi.updateMealPlanItem(id, { date },  { authorization: `BEARER ${auth.user?.token}` });
    }, [setPlannedMeals]);

    const handleDeletePlannedRecipe = useCallback(async (id) => {
        setPlannedMeals(prev => {
            return prev.slice().filter(meal => {
                return meal.id !== Number(id)
            });
        });
        await plannerApi.deleteMealPlanItem(id, { authorization: `BEARER ${auth.user?.token}` });
    }, [setPlannedMeals]);

    const handleChangeCalendarView = (newView) => {
        setCalendar(prev => {
            if(newView !== prev.view) return { ...prev, view: newView };
            return prev;
        })
    }

    const handleDayClick = ({ date }) => {
        const clickedDay = new Date(date);
        setCalendar(prev => ({ ...prev, view: "day", selectedDate: clickedDay }));
    }

    const handleRecipePickup = () => {
        document.querySelector('.recipe-trash-dropzone').classList.add('show');
        hideNavbar();
    }

    const handleRecipePickupEnd = () => {
        document.querySelector('.recipe-trash-dropzone').classList.remove('show');
        showNavbar();
    }

    return (
        <StyledMealPlannerPage>
            <h1>Meal Planner</h1>
            <SelectViewContainer>
                <Button type="button" variant="outline-secondary" onClick={() => setShowMealOptions(prev => !prev)}>Add Meal</Button>
                <ButtonGroup>
                    <Button variant="outline-secondary" active={calendar.view === 'month'} id="month" onClick={e => handleChangeCalendarView(e.target.id)}>Month</Button>
                    <Button variant="outline-secondary" active={calendar.view === 'week'} id="week" onClick={e => handleChangeCalendarView(e.target.id)}>Week</Button>
                    <Button variant="outline-secondary" active={calendar.view === 'day'} id="day" onClick={e => handleChangeCalendarView(e.target.id)}>Day</Button>
                </ButtonGroup>
            </SelectViewContainer>
            <RecipeSearchContainer show={showMealOptions} >
                {!loading && recipes && recipes.map(recipe => <p className="recipe-item" key={recipe.id} id={recipe.id} draggable="true">{recipe.title}</p>)}
            </RecipeSearchContainer>
            <Calendar 
                view={calendar.view}
                selectedDate={calendar.selectedDate}
                size="medium"
                events={calendar.plannedMeals}
                onDayClick={handleDayClick}
                onEventPickup={handleRecipePickup}
                onEventMove={handleMovePlannedRecipe}
                onEventAdd={handleAddPlannedRecipe}
                onEventPickupEnd={handleRecipePickupEnd}
                eventRender={event => (<StyledPlannedRecipe>{event.title}</StyledPlannedRecipe>)}
                eventContainerClass="planned-recipes-container"
            />
            <StyledTrash className="recipe-trash-dropzone"/>
        </StyledMealPlannerPage>
    )
}

export default MealPlannerPage

const StyledTrash = styled(Trash)`
    background: white;
    padding: 1rem;
    margin: 1rem;
    position: relative;
    left: 35%;
    border-radius: 1rem;
    box-shadow: 2px 2px 5px grey;
    width: 4rem;
    height: 4rem;
    opacity: 0;
    
    > path {
        pointer-events: none;
    }

    &.show {
        opacity: 1;
    }

    &.drag-on {
        outline: 2px solid red;
    }
`

const StyledMealPlannerPage = styled(Page)`
    position: relative;
    .planned-recipes-container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;
        gap: 0.5rem;
        height: 100%;
        margin: 0 auto;
        padding: 0 0.25rem;
        overflow: hidden;
    }
`

const SelectViewContainer = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    margin: 0.5rem auto;

    > p {
        font-weight: bold;
    }
`

const RecipeSearchContainer = styled.div`
    display: ${({ show }) => show ? "flex" : "none"};
    flex-wrap: wrap;
    justify-content: center;
    margin: 1rem auto;
    border: 1px solid grey;
    border-radius: 1rem;
    box-shadow: 2px 2px 5px grey;

    > p {
        width: 10rem;
        border: 1px solid grey;
        border-radius: 1rem;
        margin: 0.5rem;

        :hover {
            cursor: pointer;
        }
    }
`

const StyledPlannedRecipe = styled.p`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 1.5rem;
    font-size: 0.5rem;
    padding: 0.125rem;
    margin: 0;
`