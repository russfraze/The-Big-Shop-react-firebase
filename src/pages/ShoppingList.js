import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { getDocs, query, collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import Ingredient from '../components/Ingredient'
import { FirebaseError } from 'firebase/app'
import '../styles/shoppingList.css'



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
    }, [ingredientsList])
    

    // delete all documents in the recipe book 
    const clearList = async() => {
        try {
            const listingRef = collection(db, `users/${uid}/shoppinglist`)

            const q = query(listingRef)

            const querySnapshot = await getDocs(q)

            const results = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            console.log('results',results)
            results.forEach(async (result) => {
                console.log(result.id)
                const docRef = doc(db, `users/${uid}/shoppinglist`, result.id )
                await deleteDoc(docRef)
                setIngredientsList(null)
                setIngSorted(null)
            })

        } catch (error) {
            
        }
        
    }



    return (
        <div>
            <h1>shopping list</h1>
            {ingSorted ? ingSorted.map((ing) => <Ingredient aisle={ing.aisle} name={ing.name} amount={ing.measures.us.amount} unit={ing.measures.us.unitShort}  title={ing.recipeTitle} key={ing.id} />) : ''}
            <button onClick={clearList}>Clear list</button>
        </div>
    )
}

export default ShoppingList
