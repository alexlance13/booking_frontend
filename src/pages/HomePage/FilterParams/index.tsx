import DatePicker from 'components/DatePicker';
import { OFFER_TYPES, VOUCHER_VARIANT_TYPES } from 'global-constants';
import React, { RefObject } from 'react';
import Checkbox from '../Inputs/Checkbox';
import { SearchParams } from '../styles';
import { IRange, ISearchParams } from 'types';
import { Wrapper, DatePickerDiv } from './styles';

const FilterParams: React.FC<PropsType> = ({ searchParams, selectionRange, handleSelect, onInputChangeHandler, formRef }) => {
  return (
    <Wrapper ref={formRef}>
      <div>
        <SearchParams>Filter by: </SearchParams>
        <label htmlFor='type'>Offer type</label>
        <Checkbox
          name='type'
          value={OFFER_TYPES.APARTMENT}
          onInputChangeHandler={onInputChangeHandler}
          checked={searchParams.type === OFFER_TYPES.APARTMENT}
        />
        <Checkbox
          name='type'
          value={OFFER_TYPES.VOUCHER}
          onInputChangeHandler={onInputChangeHandler}
          checked={searchParams.type === OFFER_TYPES.VOUCHER}
        />
      </div>
      <div>
        <label htmlFor='priceFrom'>Price from</label>
        <input
          name='priceFrom'
          type='number'
          className='validate'
          min={0}
          max={9999}
          value={searchParams.priceFrom}
          onChange={({ target }) => onInputChangeHandler(target)}
        />
        <label htmlFor='priceTo'>Price to</label>
        <input
          name='priceTo'
          type='number'
          className='validate'
          min={searchParams.priceFrom || 1}
          max={9999}
          value={searchParams.priceTo}
          onChange={({ target }) => onInputChangeHandler(target)}
        />
      </div>
      {(!searchParams.type || searchParams.type === OFFER_TYPES.VOUCHER) && (
        <div>
          <label htmlFor='variant'>Variant</label>
          <Checkbox
            name='variant'
            value={VOUCHER_VARIANT_TYPES.RESTAURANT}
            onInputChangeHandler={onInputChangeHandler}
            checked={searchParams.variant === VOUCHER_VARIANT_TYPES.RESTAURANT}
          />
          <Checkbox
            name='variant'
            value={VOUCHER_VARIANT_TYPES.CLUB}
            onInputChangeHandler={onInputChangeHandler}
            checked={searchParams.variant === VOUCHER_VARIANT_TYPES.CLUB}
          />
          <Checkbox
            name='variant'
            value={VOUCHER_VARIANT_TYPES.CINEMA}
            onInputChangeHandler={onInputChangeHandler}
            checked={searchParams.variant === VOUCHER_VARIANT_TYPES.CINEMA}
          />
          <Checkbox
            name='variant'
            value={VOUCHER_VARIANT_TYPES.MUSEUM}
            onInputChangeHandler={onInputChangeHandler}
            checked={searchParams.variant === VOUCHER_VARIANT_TYPES.MUSEUM}
          />
        </div>
      )}
      {(!searchParams.type || searchParams.type === OFFER_TYPES.APARTMENT) && (
        <>
          <div>
            <label htmlFor='rooms'>Rooms number</label>
            <input
              name='rooms'
              type='number'
              className='validate'
              min={1}
              max={20}
              value={searchParams.rooms}
              onChange={({ target }) => onInputChangeHandler(target)}
            />
          </div>
          <DatePickerDiv>
            <DatePicker handleSelect={handleSelect} selectionRange={selectionRange} />
          </DatePickerDiv>
        </>
      )}
    </Wrapper>
  );
};

export default FilterParams;

interface PropsType {
  searchParams: ISearchParams;
  formRef: RefObject<HTMLFormElement>;
  selectionRange: {
    startDate: Date;
    endDate: Date;
  };
  handleSelect: (ranges: { range1: IRange }) => void;
  onInputChangeHandler: (target: any) => void;
}
