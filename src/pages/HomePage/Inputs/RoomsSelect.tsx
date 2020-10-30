import React from 'react';
import { Select } from '../styles';

const RoomsSelect: React.FC<PropsType> = ({ onInputChangeHandler, value }) => {
  return (
    <div className='input-field'>
      <Select onChange={({ target }) => onInputChangeHandler(target)} name='sortByRooms' value={value}>
        <option value=''>None</option>
        <option value='asc'>Few to many</option>
        <option value='desc'>Many to few</option>
      </Select>
    </div>
  );
};

export default RoomsSelect;

interface PropsType {
  onInputChangeHandler: (target: any) => void;
  value: string;
}
