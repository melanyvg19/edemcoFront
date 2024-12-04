import { useState } from 'react'
import './Table.css'

const Table = ({
  className = '',
  columnKeyMap,
  columns,
  linkColumns = [],
  onEditRow,
  rows,
  rowsPerPage = 10,
  showPagination = true
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(rows.length / rowsPerPage)

  const isLinkColumn = (column) => linkColumns.includes(column)

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }

  const startRow = (currentPage - 1) * rowsPerPage
  const currentRows = rows.slice(startRow, startRow + rowsPerPage)

  return (
    <>
      {rows.length > 0 && (
        <>
          <div className={`tabla-contenedor ${className && className}`}>
            <table className="tabla-cliente" id="tablaCliente">
              <thead>
                <tr>
                  {columns.map((column, i) => {
                    return (
                      <th key={i} scope="col">
                        {column}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, rowIndex) => (
                  <tr
                    id={onEditRow && 'edit-row'}
                    key={row.CUFE || rowIndex}
                    onClick={() => onEditRow(row)}
                  >
                    {columns.map((column, colIndex) => {
                      const key =
                        columnKeyMap[column]?.key ||
                        columnKeyMap[column] ||
                        column.toLowerCase()
                      const value = row[key]
                      return (
                        <td
                          key={colIndex}
                          title={onEditRow && `${column}: ${value}`}
                        >
                          {isLinkColumn(column) ? (
                            <a href={value} rel="noreferrer" target="_blank">
                              Link
                            </a>
                          ) : (
                            value
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showPagination && (
            <nav
              className={`tabla-cliente__paginacion ${className && className}`}
              aria-label="Table navigation"
            >
              <p>
                Mostrando {startRow + 1}-
                {Math.min(startRow + rowsPerPage, rows.length)} de {rows.length}
              </p>

              <div className="paginacion__botones">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <i className="fa-solid fa-angle-left"></i>
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                >
                  <i className="fa-solid fa-angle-right"></i>
                </button>
              </div>
            </nav>
          )}
        </>
      )}
    </>
  )
}

export default Table
