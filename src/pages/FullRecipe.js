import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { collection, addDoc, query, getDocs } from 'firebase/firestore'
import { db } from '../firebase.config'
import axios from 'axios'
import fullRecipe from '../styles/fullRecipe.module.css'
import { toast } from 'react-toastify'




function FullRecipe() {
    const auth = getAuth()
    const params = useParams()

    const recipeId = params.recipeId

    //User data
    const [userData, setUserData] = useState({
        name: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
    })
    const { name, userId } = userData

    //recipe data
    const [recipeDetails, setRecipeDetails] = useState({
        id: recipeId,
    })
    const { id, title, image, ingredients, instructions, calories, protein, carbs, fat, servings } = recipeDetails

    //recipe book state
    const [book, setBook] = useState(null)

    //is recipe is in recipe book Boolean
    const [inSaved, setInSaved] = useState(null)


    useEffect(() => {
        const checkRecipeBook = async (userId) => {
            try {
                // set loading to true 
                const listingRef = collection(db, `users/${userId}/recipebook`)

                const q = query(listingRef)

                const querySnapshot = await getDocs(q)

                const savedRecipes = []

                querySnapshot.forEach((doc) => {
                    savedRecipes.push(doc.data())
                    
                })
                
                if (savedRecipes.filter(obj => obj.id == recipeId).length > 0) {
                    setInSaved(true)
                } else {
                    setInSaved(false)
                }
                
            } catch (error) {
                
            }
            console.log('book',book)
        }

        checkRecipeBook(userId)
    }, [])

    useEffect(() => {
      
    }, [book])


    useEffect(() => {
        const getRecipeDetails = () => {
            axios({
                method: 'get',
                url: 'https://api.spoonacular.com/recipes/' + recipeId + '/information?',
                params: {
                    apiKey: process.env.REACT_APP_SPOON_KEY,

                }
            }).then((response) => {
                console.log(response.data)
                setRecipeDetails((prevState) => ({
                    ...prevState,
                    id: response.data.id,
                    title: response.data.title,
                    image: response.data.image,
                    instructions: response.data.analyzedInstructions[0].steps,
                    ingredients: response.data.extendedIngredients,
                    servings: response.data.servings
                }))
            })

            //second request for the nutritional info
            axios({
                method: 'get',
                url: 'https://api.spoonacular.com/recipes/' + recipeId + '/nutritionWidget.json',
                params: {
                    apiKey: process.env.REACT_APP_SPOON_KEY,

                }
            }).then((response) => {
                // let data = response.data
                console.log(response.data)
                setRecipeDetails((prevState) => ({
                    ...prevState,
                    calories: response.data.calories,
                    protein: response.data.protein,
                    carbs: response.data.carbs,
                    fat: response.data.fat,
                }))
            })
        }

        getRecipeDetails()
    }, [])

    const addBook = async () => {
        await addDoc(collection(db, `users/${userId}/recipebook`), {
            id: id,
            title: title,
            image: image
        })
        toast.success('Recipe added to recipe book.')
    }

    const addShop = async () => {
        await addDoc(collection(db, `users/${userId}/shoppinglist`), {
            title: title,
            ingredients: ingredients,
        })
        toast.success('Ingredients added to shopping list.')
    }

    
                 
    console.log(inSaved)
        
            

    
        

    
   


  
    
   

    return (
        <div className={fullRecipe.fullRecipeDiv}>
            <div className={fullRecipe.fullRecipe} >

                <div className={fullRecipe.imageGroup}>
                    <img className={fullRecipe.image} src={image}></img>
                    <div className={fullRecipe.title}>
                        <h1>{title}</h1>
                    </div>
                </div>


                <div className={fullRecipe.ingDiv} >
                    <div className={fullRecipe.ingLabelServ}>
                        <h3>Ingredients</h3>
                        <h3>Servings: {servings}</h3>
                    </div>
                    <div className={fullRecipe.line}></div>

                    <ul className={fullRecipe.ingUl}>
                        {ingredients ? ingredients.map((ingredient) => (
                            <li className={fullRecipe.ingLi}>
                                <p>{ingredient.original + ' '}</p>
                            </li>
                        )) : ''}
                    </ul>
                </div>

                <div className={fullRecipe.instDiv} >
                    <h3 className='inst-label' >Instructions</h3>
                    <div className={fullRecipe.line}></div>
                    {/* <p>{`${instructions}`}</p> */}

                    <ol className={fullRecipe.instOl}>

                        {instructions ? instructions.map((step) => (
                            <li>
                                <p>{step.step}</p>
                            </li>)) : ''}

                    </ol>



                </div>

                <div className={fullRecipe.marcoDiv}>
                    <h3>Macro Nutrition</h3>
                    <div className={fullRecipe.line}></div>
                    <div className={fullRecipe.macroList}>
                        <p>Calories: {calories}</p>
                        <p>Protein: {protein}</p>
                        <p>Carbs: {carbs}</p>
                        <p>Fat: {fat}</p>
                    </div>
                </div>
                <div className={fullRecipe.btnDiv}>
                    
                    {inSaved ? <button className={fullRecipe.btn} >Remove from recipe book</button> : 
                    <button className={fullRecipe.btn} onClick={addBook}>Add to recipe book</button>}
                    
                    
                    
                    <button className={fullRecipe.btn} onClick={addShop}>Add ingredients to shopping list</button>

                </div>
            </div>
        </div>
    )
}

export default FullRecipe
