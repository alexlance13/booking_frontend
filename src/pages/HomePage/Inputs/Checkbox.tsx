import React from 'react';

const Checkbox: React.FC<PropsType> = ({ value, onInputChangeHandler, checked, name }) => {
  return (
    <p>
      <label>
        <input
          name={name}
          value={value}
          type='checkbox'
          className='filled-in'
          onChange={({ target }) => onInputChangeHandler(target)}
          checked={checked}
        />
        <span>{`${value[0].toUpperCase()}${value.substr(1).toLowerCase()}`}</span>
      </label>
    </p>
  );
};

type PropsType = {
  value: string;
  onInputChangeHandler: (target: any) => void;
  checked: boolean;
  name: string;
};

export default Checkbox;
