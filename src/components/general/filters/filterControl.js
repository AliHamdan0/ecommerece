import {
  RangeSlider,
  SearchField,
  SelectField,
  SingleSelectField,
} from './filterComponents';

export const FiltersControl = ({ control, ...rest }) => {
  switch (control) {
    case 'search':
      return <SearchField {...rest} />;
    case 'singleSelectField':
      return <SingleSelectField {...rest} />;
    case 'range':
      return <RangeSlider {...rest} />;
    case 'select':
      return <SelectField {...rest} />;
    default:
      return '';
  }
};
