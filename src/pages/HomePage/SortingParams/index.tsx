import React from 'react';
import { SearchParams } from '../styles';
import { ISearchParams } from 'types';
import { Wrapper } from './styles';
import DatesSelect from '../Inputs/DatesSelect';
import PriceSelect from '../Inputs/PriceSelect';
import RoomsSelect from '../Inputs/RoomsSelect';

const SortingParams: React.FC<PropsType> = ({ searchParams, onInputChangeHandler }) => {
  return (
    <Wrapper>
      <div>
        <SearchParams>Sort by: </SearchParams>
        <div>
          <label htmlFor='sortByPrice'>Price</label>
          <PriceSelect onInputChangeHandler={onInputChangeHandler} value={searchParams.sortByPrice} />
        </div>
        <div>
          <label htmlFor='availableDates'>Available dates</label>
          <DatesSelect onInputChangeHandler={onInputChangeHandler} value={searchParams.availableDates} />
        </div>
        <div>
          <label htmlFor='sortByRooms'>Rooms</label>
          <RoomsSelect onInputChangeHandler={onInputChangeHandler} value={searchParams.sortByRooms} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SortingParams;

interface PropsType {
  searchParams: ISearchParams;
  onInputChangeHandler: (target: any) => void;
}
