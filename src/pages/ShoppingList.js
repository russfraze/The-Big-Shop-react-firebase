import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { getDocs, query, collection } from 'firebase/firestore'
import { db } from '../firebase.config'
import Ingredient from '../components/Ingredient'
import IngredientSet from '../components/IngredientSet'


function ShoppingList() {
    const auth = getAuth()
    const user = auth.currentUser
    const uid = user.uid

    const [ingredientsList, setIngredientsList] = useState(null)
    const [ingSorted, setIngSorted] = useState(null)


    useEffect(() => {
        const fetchShoppingList = async (uid) => {
            try {
                // set loading to true 
                const listingRef = collection(db, `users/${uid}/shoppinglist`)

                const q = query(listingRef)

                const querySnapshot = await getDocs(q)

                const ingredients = []

                querySnapshot.forEach((doc) => {
                    ingredients.push(doc.data())
                    setIngredientsList(ingredients)
                })

            } catch (error) {

            }
        }

        fetchShoppingList(uid)
    }, [])


    console.log('from shopping list', ingredientsList)

    // if (ingredientsList) {
    //     console.log('not null')

    //     const recipes = ingredientsList;

    //     const ingredientsByAisle = recipes.flatMap((recipe) =>
    //         recipe.ingredients.map((ingredient) => ({
    //             recipeTitle: recipe.title,
    //             ...ingredient
    //         }))
    //     );

    //     const sorted = ingredientsByAisle.sort((a, b) => a.aisle.localeCompare(b.aisle))

    //     console.log(sorted)
        
    // }


    useEffect(() => {
        if (ingredientsList) {
            console.log('not null')
    
            const recipes = ingredientsList;
    
            const ingredientsByAisle = recipes.flatMap((recipe) =>
                recipe.ingredients.map((ingredient) => ({
                    recipeTitle: recipe.title,
                    ...ingredient
                }))
            );
    
            const sorted = ingredientsByAisle.sort((a, b) => a.aisle.localeCompare(b.aisle))
    
            console.log(sorted)
            setIngSorted(sorted)
        }
    }, [])
    



    return (
        <div>
            <h1>shopping list</h1>
            {/* {ingredientsList ? ingredientsList.map((set) => <IngredientSet title={set.title} ingArray={set.ingredients} />) : ''} */}
            {ingSorted ? ingSorted.map((ing) => <Ingredient aisle={ing.aisle} name={ing.name} amount={ing.amount} unit={ing.unit}  title={ing.recipeTitle} />) : ''}
        </div>
    )
}

export default ShoppingList
