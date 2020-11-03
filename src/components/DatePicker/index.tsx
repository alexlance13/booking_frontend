//@ts-nocheck
import React from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Wrapper } from './styles';
import { TOMORROW, YEAR_AFTER_TODAY } from 'global-constants';
import { IRange } from 'types';

const DatePicker: React.FC<PropsType> = ({ disabledDates, handleSelect, selectionRange, admin }) => {
  return (
    <Wrapper>
      {admin ? (
        <DateRange showSelectionPreview maxDate={TOMORROW} ranges={[selectionRange]} onChange={handleSelect} />
      ) : (
        <DateRange
          minDate={TOMORROW}
          maxDate={YEAR_AFTER_TODAY}
          disabledDates={disabledDates}
          showSelectionPreview
          ranges={[selectionRange]}
          onChange={handleSelect}
        />
      )}
    </Wrapper>
  );
};

export default DatePicker;

interface PropsType {
  disabledDates?: Date[];
  handleSelect: (ranges: { range1: IRange }) => void;
  selectionRange: IRange;
  admin?: boolean;
}
