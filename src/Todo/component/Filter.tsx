import React from 'react';
import { FILTER_LIST } from "./constant";

interface IFilterProps {
    handleFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

const Filter = ({handleFilter, value}: IFilterProps) => {
    return (
        <select name="filter" value={value} onChange={handleFilter} data-testid="select">
            {FILTER_LIST.map((li, indx) => <option value={li} key={indx}>{li}</option>)}
        </select>
    )
}

export default Filter;
