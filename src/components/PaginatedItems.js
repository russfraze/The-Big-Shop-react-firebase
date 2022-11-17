import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import Recipes from './Recipes'
import paginatedItems from './styles/paginatedItems.css'

function PaginatedItems({ itemsPerPage, recipes }) {
    const [itemOffset, setItemOffset] = useState(0)

    const endOffset = itemOffset + itemsPerPage
    console.log(`Loading items from ${itemOffset} to ${endOffset}`)

    if (recipes) {
        var currentItems = recipes.slice(itemOffset, endOffset)
        var pageCount = Math.ceil(recipes.length / itemsPerPage)
    }


    //when user clicks to get the next page
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % recipes.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset)
    };

    if (recipes) {
        return (
            <>
                <Recipes currentItems={currentItems} />
                <div className={'pag-div'} >
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </>
        )
    }

}

export default PaginatedItems
