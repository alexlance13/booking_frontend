import React from 'react';
import { Select } from '../styles';

const PriceSelect: React.FC<PropsType> = ({ onInputChangeHandler, value }) => {
  return (
    <div className='input-field'>
      <Select onChange={({ target }) => onInputChangeHandler(target)} name='sortByPrice' value={value}>
        <option value=''>None</option>
        <option value='desc'>High to low</option>
        <option value='asc'>Low to high</option>
      </Select>
    </div>
  );
};

export default PriceSelect;

interface PropsType {
  onInputChangeHandler: (target: any) => void;
  value: string;
}
