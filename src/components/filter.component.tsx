/** @jsx h */
import { h, JSX } from 'preact'
import * as React from "preact/compat";
import {FilterField} from "../types/booking";

interface FilterProps extends FilterField{
    onFilterChecked: (id:string, value: string[]) => void
}

export default function FilterComponent({
    label,
    id,
    options=[],
    onFilterChecked
    }:FilterProps):JSX.Element {

    const handleFilterChange = (id:string, value: string[]) => {
            const selections = document.querySelectorAll(`[name=${id}]:checked`)
            const valueArray = Array.from(selections).map(item => item.value)
            onFilterChecked(id, valueArray)
    }

    return(
        <div>
            <h2>{label}</h2>
            {
                options.map(data =>
                    <div>
                        <label>
                            <input onChange={()=> handleFilterChange(id,event.target.value)} type={"checkbox"} name={id} value={data.value} />
                            {data.label}
                        </label>
                    </div>
                )
            }
        </div>
    )
}