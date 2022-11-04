import {Link} from 'react-router-dom'
import './styles/RecipeTitleCard.css'

function RecipeTitleCard({title, image, id}) {
    return (
        <div className='recipe-title-card'>
            <Link to={`/${id}`} className='recipe-link'>
            <img className='recipe-title-image' src={image} ></img>
            <h2 className='recipe-card-title'>{title}</h2>
            </Link>
        </div>
    )
}

export default RecipeTitleCard
