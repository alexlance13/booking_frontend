import getErrorMessage from 'helpers/getValidationMessage';
import React from 'react';
import { FieldErrors, Controller, Control } from 'react-hook-form';

const RoomsCount: React.FC<PropsType> = ({ onInputChangeHandler, errors, control, Controller, roomsCount, isHome }) => {
  const rules = isHome ? { min: 1, max: 20 } : { required: true, min: 1, max: 20 };
  return (
    <div className='input-field col s6'>
      <label className='active' htmlFor='roomsCount'>
        Rooms Count
      </label>
      <Controller
        control={control}
        rules={rules}
        name='roomsCount'
        defaultValue={roomsCount}
        render={(props: any) => (
          <input
            onChange={(event) => {
              props.onChange(event);
              onInputChangeHandler(event.target);
              return event;
            }}
            name={props.name}
            value={roomsCount}
            type='number'
            id='roomsCount'
            className='validate'
          />
        )}
      />
      {getErrorMessage(errors, 'roomsCount')}
    </div>
  );
};

export default RoomsCount;

interface PropsType {
  onInputChangeHandler: (target: any) => void;
  roomsCount: any;
  control: Control;
  Controller: typeof Controller;
  errors: FieldErrors;
  isHome?: boolean;
}
