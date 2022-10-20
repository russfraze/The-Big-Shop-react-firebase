import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {FaList, FaBookmark} from 'react-icons/fa'



function FullRecipe() {
    const params = useParams()
    const recipeId = params.recipeId

    const [recipeDetails, setRecipeDetails] = useState({
        id: recipeId,
    })

    const {title, image, ingredients, instructions} = recipeDetails

    console.log(recipeId)

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
                    title: response.data.title,
                    image: response.data.image,
                    instructions: response.data.instructions,
                    ingredients: response.data.extendedIngredients
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

    console.log(recipeId)
    
    return (
        <div>
            <h1>{title}</h1>
            <img src={image}></img>
            <h3>Ingredients</h3>
            <p>{ingredients ? ingredients.map((ingredient) => ingredient.original + ' ' ) : ''}</p>
            <h3>Instructions</h3>
            {`${instructions}`}
            <div>
            <FaList size="40px"/>add ingredients to shopping list
            <FaBookmark size="40px"/>add to recipe book
            </div>
        </div>
    )
}

export default FullRecipe
