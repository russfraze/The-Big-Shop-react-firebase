import { useState, useEffect } from 'react'
import axios from 'axios'
import RecipeTitleCard from '../components/RecipeTitleCard'
import home from '../styles/home.module.css'
import Logo from '../assets/LOGO_V2.png'
import PaginatedItems from '../components/PaginatedItems'
import ReactPaginate from 'react-paginate';

function Home() {
    const [recipes, setRecipes] = useState()
    const [searchTerms, setSearchTerms] = useState()
    const [testThis, setTestThis] = useState(home.home)

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
                number: 100,
            }
        }

        axios.request(results).then((response) => {
            console.log(response.data.results)
            setRecipes(response.data.results)
        }).catch((error) => {
            console.error(error)
        })

    }


    useEffect(() => {

        const resultClass = () => {
            var classAss = ''
            if (recipes) {
                classAss = home.homeResults
                setTestThis(classAss)
            } else {
                classAss = home.home
            }




        }

        resultClass()

    }, [recipes])


    return (
        <div className={testThis}>

            <div className={home.homeGroup}>

                <img className='logo' src={Logo}></img>

                <h2 className={home.headline}>Search for recipes + stop ordering takeout</h2>

                <form className={home.searchForm} onSubmit={handleSubmit}>
                    <input className={home.searchInput} type='search' placeholder='search...' onChange={handleChange} />
                    <button className={home.searchButton} type='submit'>Search</button>
                </form>
            </div>

            <div className={'paginationDiv'} >
                <div className={home.results}>
                    <PaginatedItems itemsPerPage={12} recipes={recipes} />
                </div>
            </div>

        </div>
    )
}

export default Home
