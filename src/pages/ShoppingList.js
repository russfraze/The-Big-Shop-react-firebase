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
    const [aisles, setAisles] = useState({})


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

            let aisles = {}

            ingredientsByAisle.forEach((ingredient) => {
                const { aisle } = ingredient

                if (!Object.keys(aisles).includes(aisle)) {
                    aisles[aisle] = [ingredient]
                } else {
                    aisles[aisle].push(ingredient)
                }
            })

            console.log('aisles log', aisles)

            // const sorted = ingredientsByAisle.sort((a, b) => a.aisle.localeCompare(b.aisle))

            // console.log(sorted)
            // setIngSorted(sorted)
            setAisles(aisles)
        }
    }, [ingredientsList])


    // delete all documents in the recipe book 
    const clearList = async () => {
        try {
            const listingRef = collection(db, `users/${uid}/shoppinglist`)

            const q = query(listingRef)

            const querySnapshot = await getDocs(q)

            const results = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            console.log('results', results)
            results.forEach(async (result) => {
                console.log(result.id)
                const docRef = doc(db, `users/${uid}/shoppinglist`, result.id)
                await deleteDoc(docRef)
                setIngredientsList(null)
                setIngSorted(null)
                window.location.reload(false);
            })

        } catch (error) {

        }

    }



    return (
        <div className={'center-container'}>
            <div className={'sl-page-div'}>
                <h1>shopping list</h1>

                {Object.keys(aisles).map((key, index) => {
                    return (
                        <>
                            <div className={'sl-group'} key={index}>

                                <div className={'sl-ailse-div'}>
                                    <div className={'sl-shape'}>
                                        <p className={'sl-aisle-title'}>{key}: </p>
                                    </div>


                                </div>
                                <div className={'sl-line-div'}>
                                    <div className={'sl-line'}></div>
                                </div>



                            </div>

                            <div className={'sl-ingList-div'}>
                                {Object.values(aisles)[index].map((arr, i) => {
                                    console.log('from map', arr)
                                    return (
                                        <>
                                            <Ingredient ingredientInfo={arr.original} key={arr.id + arr.recipeTitle}  />
                                        </>
                                    );
                                })}
                            </div>

                        </>



                    )
                })}




                {/* {ingSorted ? ingSorted.map((ing) => <Ingredient aisle={ing.aisle} name={ing.name} amount={ing.measures.us.amount} unit={ing.measures.us.unitShort}  title={ing.recipeTitle} key={ing.id} />) : ''} */}
                <button className={'btn'} onClick={clearList}>Clear list</button>
            </div>
        </div>
    )
}

export default ShoppingList
