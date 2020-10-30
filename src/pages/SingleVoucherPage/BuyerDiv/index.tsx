import React from 'react';
import { Wrapper } from './styles';
import Quantity from 'components/OfferForm/Fields/Quantity';
import { useForm } from 'react-hook-form';

const BuyerDiv: React.FC<PropsType> = ({ onOrderHandler, quantity, onInputChangeHandler, availableQuantity }) => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onOrderHandler)} className='col s12'>
        <Quantity
          quantityValue={quantity}
          onInputChangeHandler={onInputChangeHandler}
          availableQuantity={availableQuantity}
          errors={errors}
          register={register}
        />
        <button className='waves-light btn' type='submit' name='action'>
          Order
        </button>
      </form>
    </Wrapper>
  );
};

export default BuyerDiv;

interface PropsType {
  onOrderHandler: () => void;
  onInputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  quantity: number;
  availableQuantity: number;
}
