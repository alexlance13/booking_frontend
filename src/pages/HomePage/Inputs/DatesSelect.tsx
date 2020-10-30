import React from 'react';
import { Select } from '../styles';

const DatesSelect: React.FC<PropsType> = ({ onInputChangeHandler, value }) => {
  return (
    <div className='input-field'>
      <Select onChange={({ target }) => onInputChangeHandler(target)} name='availableDates' value={value}>
        <option value=''>None</option>
        <option value='asc'>Closest available dates</option>
        <option value='desc'>Latest available dates</option>
      </Select>
    </div>
  );
};

export default DatesSelect;

interface PropsType {
  onInputChangeHandler: (target: any) => void;
  value: string;
}
