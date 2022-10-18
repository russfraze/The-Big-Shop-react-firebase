function RecipeTitleCard({title, image}) {
    return (
        <div>
            <h2>{title}</h2>
            <img src={image} ></img>
        </div>
    )
}

export default RecipeTitleCard
