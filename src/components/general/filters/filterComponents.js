import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Checkbox,
  Slider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export const SearchField = (props) => {
  const {
    value,
    handleChange,
    submit,
    label,
    iconColor = 'brand.primaryMain',
    ...rest
  } = props;
  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => handleChange(e)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') submit();
      }}
      label={label}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <SearchIcon
              sx={{ color: iconColor, cursor: 'pointer' }}
              onClick={() => submit()}
            />
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
};
/////
/// Dropdown Select /////
export const SelectField = (props) => {
  const {
    label,
    value,
    handleChange,
    options,
    filterValue,
    propertyName,
    withLogo = false,
    ...rest
  } = props;
  return (
    <FormControl fullWidth>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => handleChange(e)}
        labelid={label}
        label={label}
        MenuProps={{
          MenuListProps: {
            sx: {
              maxHeight: { xs: '200px', md: '400px' },
            },
          },
        }}
        renderValue={(selected) => {
          if (typeof selected == 'object')
            return selected
              ?.map((id) => options.find((item) => item.id == id)?.name)
              .join(' , ');
          else return options.find((item) => item.id == selected)?.name;
        }}
        {...rest}
        multiple
      >
        {options?.map((item) => (
          <MenuItem value={item.id + ''} key={item.id}>
            <Checkbox
              checked={
                filterValue[propertyName]?.findIndex(
                  (select) => select == item.id + ''
                ) > -1
              }
            />
            item.name
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const SingleSelectField = (props) => {
  const {
    label,
    value,
    handleChange,
    options,
    filterValue,
    propertyName,
    ...rest
  } = props;
  return (
    <FormControl fullWidth>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => handleChange(e)}
        labelid={label}
        label={label}
        MenuProps={{
          MenuListProps: {
            sx: {
              maxHeight: { xs: '200px', md: '400px' },
            },
          },
        }}
        {...rest}
      >
        {options?.map((item) => (
          <MenuItem value={item.value} key={item.id}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

///Price

export function RangeSlider({ value, handleChange }) {
  const marks = [
    {
      value: 0,
      label: '$0',
    },
    {
      value: 20,
      label: '$20',
    },
    {
      value: 40,
      label: '$40',
    },
    {
      value: 60,
      label: '$60',
    },
    {
      value: 80,
      label: '$80',
    },
    {
      value: 100,
      label: '$100',
    },
  ];
  function valueText(value) {
    return `$${value}`;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Slider
        getAriaLabel={() => 'Price Range'}
        value={value}
        onChange={handleChange}
        getAriaValueText={valueText}
        step={1}
        marks={marks}
        valueLabelDisplay='auto'
      />
    </Box>
  );
}
