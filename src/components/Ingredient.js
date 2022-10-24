function Ingredient({aisle, name, amount, title}) {
    return (
        <div className='ingredient'>
            
            <p>{aisle}</p>
            <h2>{name}</h2>
            <p>{amount}</p>
            <p>{title}</p>

            
        
        </div>
    )
}

export default Ingredient
