import {Link} from 'react-router-dom'

function RecipeTitleCard({title, image, id}) {
    return (
        <div>
            <Link to={`/${id}`}>
            <h2>{title}</h2>
            <img src={image} ></img>
            </Link>
        </div>
    )
}

export default RecipeTitleCard
