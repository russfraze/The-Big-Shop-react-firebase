import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getAuth} from 'firebase/auth'
import {collection, addDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import axios from 'axios'
import {FaList, FaBookmark} from 'react-icons/fa'
import {toast} from 'react-toastify'




function FullRecipe() {
    const auth = getAuth()
    const params = useParams()

    const recipeId = params.recipeId

    const [userData, setUserData] = useState({
        name: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
    })

    const {name, userId} = userData

    const [recipeDetails, setRecipeDetails] = useState({
        id: recipeId,
    })

    const {id, title, image, ingredients, instructions, calories, protein, carbs, fat, servings} = recipeDetails

    useEffect(() =>{
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
                    instructions: response.data.instructions,
                    ingredients: response.data.extendedIngredients,
                    servings: response.data.servings
                }))
                // this.recipes_info = response.data
                // recipe.details = response.data
                // recipe.has_details = true
                // recipe.ingredients = response.data.extendedIngredients
                // recipe.instructions = response.data.instructions
                // console.log(this.recipes_info)
                // console.log(recipe.ingredients)
                // console.log(recipe.instructions)
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
                // console.log(response.data.calories)
                // this.recipes_info = response.data

                // recipe.nutrition.calories = data.calories
                // recipe.nutrition.protein = data.protein
                // recipe.nutrition.carbs = data.carbs
                // recipe.nutrition.fat = data.fat
                // console.log(recipe.nutrition)

            })
        }

        getRecipeDetails()
    },[])

    const addBook = async() => {
        await addDoc(collection(db, `users/${userId}/recipebook`), {
            id: id,
            title: title,
            image: image
        })
        toast.success('Recipe added to recipe book.')
    }

    const addShop = async() => {
        await addDoc(collection(db, `users/${userId}/shoppinglist`), {
            title: title,
            ingredients: ingredients,
        })
        toast.success('Ingredients added to shopping list.')
    }
    
    return (
        <div>
            <h1>{title}</h1>
            <img src={image}></img>
            <h3>Ingredients</h3>
            <p>{ingredients ? ingredients.map((ingredient) => ingredient.original + ' ' ) : ''}</p>
            <h3>Instructions</h3>
            {`${instructions}`}
            <h3>Macro Nutrition</h3>
            <p>Calories: {calories}</p>
            <p>Protein: {protein}</p>
            <p>Carbs: {carbs}</p>
            <p>Fat: {fat}</p>
            <h3>Servings: {servings}</h3>
            <div>
            <FaList size="40px" onClick={addShop} />add ingredients to shopping list
            <FaBookmark size="40px" onClick={addBook} />add to recipe book
            </div>
        </div>
    )
}

export default FullRecipe
