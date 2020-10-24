import React from 'react';

const Checkbox: React.FC<PropsType> = ({ value, onInputChangeHandler, checked, id }) => {
  return (
    <p>
      <label>
        <input
          id={id}
          value={value}
          type='checkbox'
          className='filled-in'
          onChange={({ target }) => onInputChangeHandler(target)}
          checked={checked}
        />
        <span>{`${value[0].toLocaleUpperCase()}${value.substr(1)}`}</span>
      </label>
    </p>
  );
};

type PropsType = {
  value: string;
  onInputChangeHandler: (target: any) => void;
  checked: boolean;
  id: string;
};

export default Checkbox;
