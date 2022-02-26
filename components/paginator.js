import ReactPaginate from "react-paginate"



export default function Paginator(props){
    const {handle} = {...props} 
    const handlePageClick = (event) => {
        handle(event.selected)
    }; 
    return(
        <>
        <ReactPaginate
                    onPageChange={handlePageClick}
                    breakLabel="..."
                    nextLabel=">"
                    pageRangeDisplayed={3}
                    pageCount={50}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    breakLabel="..."
                    nextLabel=">"  
                    previousLabel="< "
                    renderOnZeroPageCount={null}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
                  ></ReactPaginate>
        </>
    )


}