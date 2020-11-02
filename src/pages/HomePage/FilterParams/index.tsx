import DatePicker from 'components/DatePicker';
import { OFFER_TYPES, VOUCHER_VARIANT_TYPES } from 'global-constants';
import React, { useEffect } from 'react';
import Checkbox from '../Inputs/Checkbox';
import { SearchParams } from '../styles';
import { IRange, ISearchParams } from 'types';
import { Wrapper, DatePickerDiv } from './styles';
import getErrorMessage from 'helpers/getValidationMessage';
import RoomsCount from 'components/OfferForm/Fields/RoomsCount';

const FilterParams: React.FC<PropsType> = ({
  searchParams,
  selectionRange,
  handleSelect,
  onInputChangeHandler,
  Controller,
  control,
  errors,
  trigger,
}) => {
  useEffect(() => {
    trigger(['roomsCount', 'priceTo', 'priceFrom']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
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
        <div>
          <label htmlFor='priceFrom'>Price from</label>
          <Controller
            control={control}
            defaultValue={searchParams.priceFrom}
            rules={{ min: 1, max: 9999 }}
            name='priceFrom'
            render={(props: any) => (
              <input
                onChange={(event) => {
                  props.onChange(event);
                  onInputChangeHandler(event.target);
                  return event;
                }}
                id='priceFrom'
                value={searchParams.priceFrom}
                name={props.name}
                type='number'
                className='validate'
              />
            )}
          />
          {getErrorMessage(errors, 'priceFrom')}
        </div>
        <div>
          <label htmlFor='priceTo'>Price to</label>
          <Controller
            control={control}
            defaultValue={searchParams.priceTo}
            rules={{
              min: 1,
              max: 9999,
              validate: (value: string) =>
                (value && +value < +searchParams.priceFrom && 'Must be greater then price from') || true,
            }}
            name='priceTo'
            render={(props: any) => (
              <input
                onChange={(event) => {
                  props.onChange(event);
                  onInputChangeHandler(event.target);
                  return event;
                }}
                id='priceTo'
                value={searchParams.priceTo}
                name={props.name}
                type='number'
                className='validate'
              />
            )}
          />
          {getErrorMessage(errors, 'priceTo')}
        </div>
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
          <RoomsCount
            isHome={true}
            onInputChangeHandler={onInputChangeHandler}
            roomsCount={searchParams.roomsCount}
            errors={errors}
            Controller={Controller}
            control={control}
          />
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
  selectionRange: {
    startDate: Date;
    endDate: Date;
  };
  handleSelect: (ranges: { range1: IRange }) => void;
  onInputChangeHandler: (target: any) => void;
  Controller: any;
  control: any;
  errors: any;
  trigger: any;
}
