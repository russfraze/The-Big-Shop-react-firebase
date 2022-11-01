import {Link} from 'react-router-dom'

function RecipeTitleCard({title, image, id}) {
    return (
        <div>
            <Link to={`/${id}`} className='recipe-link'>
            <h2 className='recipe-card-title'>{title}</h2>
            <img src={image} ></img>
            </Link>
        </div>
    )
}

export default RecipeTitleCard
