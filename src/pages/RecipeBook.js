import {useState, useEffect} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { collection, getDocs, query } from 'firebase/firestore'
import {db} from '../firebase.config'
import RecipeTitleCard from '../components/RecipeTitleCard'

function RecipeBook() {
    const [recipeBook, setRecipeBook] = useState([])

    const auth = getAuth()
    const user = auth.currentUser
    const uid = user.uid
    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             // user is signed in
    //             const uid = user.uid
    //         } else {
    //             // user is signed out
    //         }
    //     })
    // },[])

    useEffect(() =>{

        const fetchRecipeBook = async (uid) => {
            try {
                // create a reference to the collection 
                const listingRef = collection(db, `users/${uid}/recipebook`)

                //use it to create a query
                const q = query(listingRef)

                //exicute the query
                const querySnapshot = await getDocs(q)

                const savedRecipes = []
                //loop through the snapshot and use the data function  
                //to get the data from the snapshot
                querySnapshot.forEach((doc) => {
                    savedRecipes.push(doc.data())
                    setRecipeBook(savedRecipes)
                })

            } catch (error) {
                console.log(error)
            }
        }
        fetchRecipeBook(uid)

    },[])

    console.log(recipeBook)

    return (
        <div>
            <h1>Recipe Book</h1>
            {recipeBook ? recipeBook.map((recipe) => 
            <RecipeTitleCard 
            title={recipe.title} 
            image={recipe.image} 
            id={recipe.id} 
            key={recipe.id}/
            >) : ''}
        </div>
    )
}

export default RecipeBook
