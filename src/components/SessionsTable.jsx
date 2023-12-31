import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable, usePagination, useSortBy } from 'react-table';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa'; // ... (your other code)
import styles from './SessionsTable.module.scss';

import { MdOutlineDateRange, MdOutlineModeEditOutline } from 'react-icons/md';
import { FaChevronRight } from 'react-icons/fa';
import { IoMdAlarm } from 'react-icons/io';

const SessionsTable = () => {
  const [data, setData] = useState([]); // State to store fetched data
  const token =
    'eyJhbGciOiJSUzI1NiJ9.eyJpZCI6MzAzLCJ0eXBlIjoidXNlciIsInJhbiI6IkJORU5WSVBOTlFUWVBMS0tVQ0JWIiwic3RhdHVzIjoxfQ.YGV-jGKZj1Lp4SqlM3aiF6Aov6YVF6lZRMpKvx_Zdrpjj4C1zE-JSTKtjVboQ9de58TUViyVOc4JwiktjF_4yxnYzIrw449s584j2GiqUpxfp6OPmfAj8BAbfN_M4RoU5PXEjhcNVh5uNRtxtvxZtpECrl72_22T4he3LbqISMNHzVh5eprIKIFLt_pM7cyRKt3Njf8I89CLnq5nUpiDHnMMForamKq9jubmiYPOHpFvijEE3-jusRk0F1T32zMY_0AELXnpqhbbx6HtmMdxBahnrUNyznacdVwaSrNus8vX01N8zEcfRvkRzYuqjnZXr9jrm2iriHq80iicUG99GQ'; // Replace with your Bearer token
  const link =
    'https://qa-testing-backend-293b1363694d.herokuapp.com/api/v3/get-sessions?event_id=19'; // Replace with your API link
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(link, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('API Response:', response.data);

        // setData( response.data);
        if (response.data && Array.isArray(response.data.sessions)) {
          setData(response.data.sessions);
        } else {
          setData([]); // Set an empty array as a fallback
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

  const columns = React.useMemo(
    () => [
      {
        Header: 'Session ',
        accessor: 'title',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Time',
        accessor: 'from',
      },
      {
        Header: 'Venue',
        accessor: 'venue.name',
      },
      {
        Header: '',
        accessor: '<',
      },
      {
        Header: '',
        accessor: '>',
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of rows, use page from usePagination hook
    footerGroups,
    state: { pageIndex, pageSize, pageCount, pageOptions }, // Pagination state
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }, // Initial pagination values
    },
    useSortBy,
    usePagination // Enable pagination
  );
  const numPages = pageOptions ? pageOptions.length : 0;

  return (
    <div className={styles.sessionsTable}>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className={styles.tableHeaderRow}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={styles.tableHeader}
                >
                  {column.render('Header')}

                  <span>
                    {' '}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronUp />
                      )
                    ) : (
                      <FaChevronDown />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {/* Map rows and display table data */}
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={styles.tableRow}
                key={`row-${rowIndex}`}
              >
                {row.cells.map((cell, cellIndex) => (
                  <td
                    {...cell.getCellProps()}
                    className={styles.tableCell}
                    key={`cell-${cellIndex}`}
                  >
                    <React.Fragment>
                      {cellIndex === 0 && ( // First column
                        <FaAngleRight className={styles.icon} />
                      )}

                      {cellIndex === 1 && ( // Second column
                        <MdOutlineDateRange className={styles.icon} />
                      )}

                      {cellIndex === 2 && ( // Third column
                        <IoMdAlarm className={styles.icon} />
                      )}

                      {cellIndex === 4 && ( // fourth column
                        <MdOutlineModeEditOutline
                          className={styles.iconLarge}
                        />
                      )}
                      {cellIndex === 5 && ( // fifth column
                        <FaChevronRight className={styles.iconLarge} />
                      )}
                      {cell.render('Cell')}

                      {/* Add conditions for other columns */}
                    </React.Fragment>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <div className="pagination">
                {/* Pagination controls */}
                <span>
                  Showing {page.length} entires {data.length}
                </span>
                {/* Implement your pagination component here */}
              </div>
            </td>
            <td colSpan={columns.length}>
              {' '}
              <div className={styles.pagination}>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  {'<'}
                </button>{' '}
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  {'...'}
                </button>{' '}
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  {pageIndex + 1}
                </button>{' '}
                <button onClick={() => gotoPage(1)} disabled={!canPreviousPage}>
                  {pageIndex + 2}
                </button>{' '}
                <button onClick={() => gotoPage(2)} disabled={!canPreviousPage}>
                  {pageIndex + 3}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                  {'...'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                  {'>'}
                </button>{' '}
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default SessionsTable;
