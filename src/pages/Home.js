import { useState } from 'react'
import axios from 'axios'
import RecipeTitleCard from '../components/RecipeTitleCard'

function Home() {
    const [recipes, setRecipes] = useState()
    const [searchTerms, setSearchTerms] = useState()

    const handleChange = (e) => {
        setSearchTerms(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getRecipes()
    }


    const getRecipes = () => {
        const results = {
            method: 'get',
            url: 'https://api.spoonacular.com/recipes/complexSearch',
            params: {
                apiKey: process.env.REACT_APP_SPOON_KEY,
                query: searchTerms,
                number: 10,
            }
        }

        axios.request(results).then((response) => {
            // console.log(response.data)
            setRecipes(response.data.results)
        }).catch((error) => {
            console.error(error)
        })


    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Homepage where you search for recipes</h2>
                <input type='search' placeholder='search for recipes' onChange={handleChange} />
                <button>search</button>
            </form>
            { recipes ? recipes.map((recipe) =>
                <RecipeTitleCard
                    image={recipe.image}
                    title={recipe.title}
                    id={recipe.id}
                    key={recipe.id}
                />) : 'there aint none'}
        </>
    )
}

export default Home
