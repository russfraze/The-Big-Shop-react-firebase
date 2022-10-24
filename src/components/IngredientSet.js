import Ingredient from './Ingredient'

function IngredientSet({title, ingArray}) {
    return (
        <div>
            {ingArray && ingArray.map((ing) => <Ingredient aisle={ing.aisle} name={ing.name} amount={ing.amount} title={title}/>)}
        </div>
    )
}

export default IngredientSet
