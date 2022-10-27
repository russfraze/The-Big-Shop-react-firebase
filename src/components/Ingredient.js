import {useState} from 'react'
import {FaCheckSquare} from 'react-icons/fa'


function Ingredient({aisle, name, amount, unit, title}) {

    const [checked, setChecked] = useState(false)

    return (
        <div className={checked ? 'checked-ingredient' : 'ingredient' }>
            
            <p>aisle: {aisle}</p>
            <h2>{name}</h2>
            <p>{amount}</p>
            <p>{unit}</p>
            <p>{title}</p>

            <div className='shopList-buttons'>
            <FaCheckSquare onClick={() => setChecked(!checked)} />
            </div>
        
        </div>
    )
}

export default Ingredient
