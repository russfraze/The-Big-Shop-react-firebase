import { useState } from 'react'
import { FaCheckSquare } from 'react-icons/fa'


function Ingredient({ aisle, name, amount, unit, title }) {

    const [checked, setChecked] = useState(false)

    return (
        <div>
            
            <p className='aisle'>aisle: {aisle}</p>
            <div className={checked ? 'checked-ingredient' : 'ingredient'}>
               
                <div className='ing-group'>
                    <h2 className='ing-name' >{name}</h2>
                    <div className='amount-unit'>
                        <p className='amount'>{amount}</p>
                        <p>{unit}</p>
                    </div>
                </div>
                <p className='title' >{title}</p>


                <FaCheckSquare className='check-box' onClick={() => setChecked(!checked)} />


            </div>
        </div>
    )
}

export default Ingredient
