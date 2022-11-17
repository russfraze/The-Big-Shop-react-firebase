import RecipeTitleCard from './RecipeTitleCard'


function Recipes({ currentItems }) {
    return (

        //refactor this to not use a turnary 
        <>
            {currentItems ? currentItems.map((recipe) =>
                <RecipeTitleCard
                    image={recipe.image}
                    title={recipe.title}
                    id={recipe.id}
                    key={recipe.id}
                />) : ''}
        </>
    )
}

export default Recipes
