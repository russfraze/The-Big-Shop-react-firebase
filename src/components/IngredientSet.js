import Ingredient from './Ingredient'
import {useState, useEffect} from 'react'

function IngredientSet({title, ingArray}) {
    const [ingSet, setIngSet] = useState([])

    useEffect(() => {
        
    }, [])
    
    
    // console.log(ingSet)

    return (
        <div>
            {ingArray && ingArray.map((ing) => <Ingredient aisle={ing.aisle} name={ing.name} amount={ing.amount} title={title}/>)}
        </div>
    )
}

export default IngredientSet
