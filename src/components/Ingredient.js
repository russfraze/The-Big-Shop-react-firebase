function Ingredient({aisle, name, amount, unit, title}) {
    return (
        <div className='ingredient'>
            
            <p>aisle: {aisle}</p>
            <h2>{name}</h2>
            <p>{amount}</p>
            <p>{unit}</p>
            <p>{title}</p>

            
        
        </div>
    )
}

export default Ingredient
