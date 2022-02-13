import { useMemo, useState, useEffect } from "react";
import { useTable, usePagination, useSortBy, useGlobalFilter, useAsyncDebounce } from "react-table";
import { GlobalFilter } from "../GlobalFilter/GlobalFilter";
import { Tab, Table } from "react-bootstrap";
import styles from "./table.module.css";
import { RiArrowUpLine, RiArrowDownLine, RiArrowLeftLine, RiArrowRightLine, RiVipCrownFill } from "react-icons/ri";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";

const TableStructure = ({ columns, data }) => {

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		canPreviousPage,
    	canNextPage,
    	pageOptions,
    	pageCount,
    	gotoPage,
    	nextPage,
    	previousPage,
    	setPageSize,
		preGlobalFilteredRows,
    	setGlobalFilter,
		state,
		state: { pageIndex, pageSize },
	} = useTable({
			columns,
			data,
			initialState: {
				pageIndex: 0,
				pageSize: 5,
				sortBy: [
					{
						id: 'hours',
						desc: true
					}
				]
			},
    	},
		useGlobalFilter,
		useSortBy,
		usePagination,
	)
	
	const [top, setTop] = useState([]);

	useEffect(() => {
		var top1 = document.getElementsByClassName("table")[0].rows[1].cells[0];
		var top2 = document.getElementsByClassName("table")[0].rows[2].cells[0];
		var top3 = document.getElementsByClassName("table")[0].rows[3].cells[0];
		
		if(pageIndex == 0){
			top1.textContent = "👑 " + top1.textContent; 
			top2.textContent = "👑 " + top2.textContent; 
			top3.textContent = "👑 " + top3.textContent; 
		}
	}, [pageIndex]);

  	return (
		<>
			<GlobalFilter preGlobalFilteredRows = {preGlobalFilteredRows} setGlobalFilter = {setGlobalFilter} globalFilter = {state.globalFilter}/>
			<div className = {styles.container}>
				<Table responsive {...getTableProps()} className = {styles.table}>
      				<thead className = {styles.header}>
      			  		{headerGroups.map((headerGroup, index) => (
      			  	  		<tr key = {index} {...headerGroup.getHeaderGroupProps()}>
      			  	  	  		{headerGroup.headers.map(column => (
      			  	  	  	  		<th key = {index} {...column.getHeaderProps(column.getSortByToggleProps())}>
										{column.render('Header')}
										<span>
            	        					{column.isSorted
            	        					  ? column.isSortedDesc
            	        					    ? <RiArrowDownLine size = {"1.5rem"}/>
            	        					    : <RiArrowUpLine size = {"1.5rem"}/>
            	        					  : ''}
										</span>
									</th>
      			  	  	  		))}
      			  	  		</tr>
      			  		))}
      				</thead>
      				<tbody {...getTableBodyProps()}>
      			  		{
							page.map((row, i) => {
      			  	  		prepareRow(row)								  
      			  	  		return (
      			  	  	  		<tr key = {i} {...row.getRowProps()}>
      			  	  	  	  		{row.cells.map((cell, i) => {
      			  	  	  	  	  		return <td key = {i} {...cell.getCellProps()}>{cell.render('Cell')}</td>
      			  	  	  	  		})}										  
      			  	  	  		</tr>
      			  	  		)
      			  		})}
      				</tbody>
    			</Table>
			</div>
			<div className = {styles.pagination}>
        		<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        		  	{<BiArrowToLeft size = {"2rem"} color = {canPreviousPage ? "#ffc089" : "#57514c"}/>}
        		</button>{' '}
        		<button onClick={() => previousPage()} disabled={!canPreviousPage}>
        		  	{<RiArrowLeftLine size = {"2rem"} color = {canPreviousPage ? "#ffc089" : "#57514c"}/>}
        		</button>{' '}
        		<button onClick={() => nextPage()} disabled={!canNextPage}>
					{<RiArrowRightLine size = {"2rem"} color = {canNextPage ? "#ffc089" : "#57514c"}/>}
        		</button>{' '}
        		<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        			{<BiArrowToRight size = {"2rem"} color = {canNextPage ? "#ffc089" : "#57514c"}/>}
        		</button>{' '}
        		<span>
        		  	Page{' '}
        		  	<strong>
        		  	  	{pageIndex + 1} of {pageOptions.length}
        		  	</strong>{' '}
        		</span>
        		<select
					className = {styles.options}
        		  	value={pageSize}
        		  	onChange={e => {
        		  	  setPageSize(Number(e.target.value))
        		  	}}
        		>
        		  	{[5, 10, 20, 30, 40, 50].map(pageSize => (
        		  	  <option key={pageSize} value={pageSize}>
        		  	    Show {pageSize}
        		  	  </option>
        		  	))}
        		</select>
      		</div>
		</>
  	)  
}

export default TableStructure