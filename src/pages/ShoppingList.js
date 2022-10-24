import {useState, useEffect} from 'react'
import {getAuth} from 'firebase/auth'
import {getDocs, query, collection} from 'firebase/firestore'
import {db} from '../firebase.config'
import Ingredient from '../components/Ingredient'
import IngredientSet from '../components/IngredientSet'


function ShoppingList() {
    const auth = getAuth()
    const user = auth.currentUser
    const uid = user.uid

    const [ingredientsList, setIngredientsList] = useState(null)

    useEffect(() => {
      const fetchShoppingList = async(uid) => {
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
    console.log(ingredientsList)
    return (
        <div>
            shopping list
            
            {/* {ingredientsList ? <p>{ingredientsList[0].title}</p> : ''} */}
            {ingredientsList ? ingredientsList.map((set) => <IngredientSet title={set.title} ingArray={set.ingredients} />) : ''}
        </div>
    )
}

export default ShoppingList
