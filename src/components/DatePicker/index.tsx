//@ts-nocheck
import React from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Wrapper } from './styles';
import { TOMORROW, YEAR_AFTER_TODAY } from 'global-constants';

const DatePicker: React.FC<PropsType> = ({ disabledDates, handleSelect, selectionRange }) => {
  return (
    <Wrapper>
      <DateRange
        minDate={TOMORROW}
        maxDate={YEAR_AFTER_TODAY}
        disabledDates={disabledDates}
        showSelectionPreview={true}
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
    </Wrapper>
  );
};

export default DatePicker;

interface PropsType {
  disabledDates?: Date[];
  handleSelect: any;
  selectionRange: any;
}
