import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import 'regenerator-runtime/runtime';
import styles from "./globalfilter.module.css";

export function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter
}){
    const count = preGlobalFilteredRows.length;
    const [value, setvalue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <div className = {styles.container}>
            <span>Search : </span>
            <input 
                value = {value || ""} onChange = {(e) => {setvalue(e.target.value);onChange(e.target.value);}}
                placeholder = {`${count} records...`}
                className = {styles.search}
            />
        </div>
    )
}