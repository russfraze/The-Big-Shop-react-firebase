import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../firebase.config'
import RecipeTitleCard from '../components/RecipeTitleCard'
import Logo from '../assets/LOGO_V2.png'
import '../styles/recipeBook.css'

function RecipeBook({liftUsersRecipes}) {
    const [recipeBook, setRecipeBook] = useState([])

    const auth = getAuth()
    const user = auth.currentUser
    const uid = user.uid

    useEffect(() => {

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
                    savedRecipes.push({
                        recipe: doc.data(),
                        fbId: doc.id
                    })
                    setRecipeBook(savedRecipes)
                    console.log('current recipe book:', recipeBook)
                })
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchRecipeBook(uid)

    }, [])

    console.log(recipeBook)

    return (
        <div className='rb' >
            <div className='rb-group'>

                <img className='logo-rb' src={Logo}></img>

                <h2 className='headline-rb'>Recipe Book</h2>

            </div>
            <div className='book-div'>
                {recipeBook ? recipeBook.map((recipe) =>
                    <RecipeTitleCard
                        title={recipe.recipe.title}
                        image={recipe.recipe.image}
                        id={recipe.recipe.id}
                        key={recipe.recipe.id}
                        fbId={recipe.fbId}
                    />) : ''}
            </div>
        </div>
    )
}

export default RecipeBook
