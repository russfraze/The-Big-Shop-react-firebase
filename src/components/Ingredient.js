import { useState } from 'react'
import { FaCheckSquare } from 'react-icons/fa'
import './styles/ingredient.css'


function Ingredient({ ingredientInfo }) {

    const [checked, setChecked] = useState(false)

    return (
        <div>
            <div className={checked ? 'checked-ingredient' : 'ingredient'}>

                <div className='ing-panel'>
                    <p className={'ingredient-info'}>{ingredientInfo}</p>
                    <div>
                        <FaCheckSquare className={checked ? 'checked-box' : 'checkbox'} onClick={() => setChecked(!checked)} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Ingredient
