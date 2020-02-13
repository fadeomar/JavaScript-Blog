import React from "react"
import {
  Pagination as Paginations,
  PaginationItem,
  PaginationLink,
} from "reactstrap"

const Pagination = ({ currentPage, numberOfPages }) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numberOfPages
  const previousPage =
    currentPage - 1 === 1 ? "/" : "/page/" + (currentPage - 1).toString()
  const nextPage = "/page/" + (currentPage + 1).toString()
  return (
    <Paginations aria-label="Page navigation example">
      {isFirst ? (
        <PaginationItem disabled>
          <PaginationLink previous href="/" />
        </PaginationItem>
      ) : (
        <PaginationItem>
          <PaginationLink previous href={previousPage} />
        </PaginationItem>
      )}
      {Array.from({ length: numberOfPages }, (_, i) =>
        currentPage === i + 1 ? (
          <PaginationItem active key={`page-number${i + 1}`}>
            <PaginationLink href={`/${i === 0 ? "" : "page/" + (i + 1)}`}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <PaginationItem key={`page-number${i + 1}`}>
            <PaginationLink href={`/${i === 0 ? "" : "page/" + (i + 1)}`}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        )
      )}
      {isLast ? (
        <PaginationItem disabled>
          <PaginationLink next href={nextPage} />
        </PaginationItem>
      ) : (
        <PaginationItem>
          <PaginationLink next href={nextPage} />
        </PaginationItem>
      )}
    </Paginations>
  )
}

export default Pagination
