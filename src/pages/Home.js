import { useState } from 'react'
import axios from 'axios'
import RecipeTitleCard from '../components/RecipeTitleCard'
import { FaSearch } from 'react-icons/fa'
import '../styles/home.css'

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
            <h2>Search for recipes and stop ordering takeout</h2>

            <form onSubmit={handleSubmit}>
                <div className='search-bar'>
                    <input type='search' placeholder='search for recipes' onChange={handleChange} />
                    <FaSearch className='search-icon' onClick={handleSubmit} />
                </div>
            </form>

            {recipes ? recipes.map((recipe) =>
                <RecipeTitleCard
                    image={recipe.image}
                    title={recipe.title}
                    id={recipe.id}
                    key={recipe.id}
                />) : ''}

        </>
    )
}

export default Home
