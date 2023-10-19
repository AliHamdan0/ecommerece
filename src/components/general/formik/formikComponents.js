import {
  TextField,
  Typography,
  Select,
  FormHelperText,
  MenuItem,
  FormControl,
  Checkbox,
  InputLabel,
} from '@mui/material';
import { Box } from '@mui/system';
import { Field } from 'formik';

const customInputStyles = {
  width: '100%',
  marginBottom: '30px',
};
const customText = {
  fontWeight: '600',
  letterSpacing: '0.3px',
};
const errorMessageStyles = {
  fontWeight: '400',
  fontSize: '18px',
  color: '#d32f2f',
};
const radioLabelStyles = {
  fontWeight: '900',
  fontSize: '1.8rem',
  lineHeight: '140%',
  color: 'black',
};

///input type Text
export const CustomTextField = (props) => {
  const { name, label, requiredStar = true, type = 'text', ...rest } = props;
  return (
    <>
      <Field name={name}>
        {({ field, form }) => {
          return (
            <TextField
              autoComplete='off'
              variant='outlined'
              type={type}
              sx={customInputStyles}
              inputProps={{ style: { ...customText, fontSize: '19px' } }} // font size of input text
              InputLabelProps={{ style: { ...customText, fontSize: '16px' } }} // font size of input label
              label={
                <Box>
                  {requiredStar ? (
                    <Typography as='span' sx={{ color: 'secondary.main' }}>
                      *{' '}
                    </Typography>
                  ) : null}
                  {label}
                </Box>
              }
              {...field}
              {...rest}
              error={
                form.touched[name] == true && form.errors[name] !== undefined
              }
              helperText={
                <Typography component='span' sx={errorMessageStyles}>
                  {form.touched[name] && form.errors[name]}
                </Typography>
              }
            />
          );
        }}
      </Field>
    </>
  );
};
//////
/////Select
export const InputSelect = (props) => {
  const {
    name,
    label,
    requiredStar = true,
    callback = () => {},
    options,
    ...rest
  } = props;
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl sx={customInputStyles}>
          <CustomInputLabel requiredStar={requiredStar} inputLabel={label} />
          <Select
            {...field}
            {...rest}
            sx={{ minHeight: '60px' }}
            onChange={(event) => {
              form.setFieldValue([field.name], event.target.value);
              callback(event.target.value);
            }}
            value={options?.length > 0 ? field.value : ''}
            renderValue={(selected) => (
              <Typography
                component='span'
                sx={{ ...customText, fontSize: '16px' }}
              >
                {selected
                  ?.map((id) => options.find((item) => item.id == id)?.name)
                  .join(' , ')}
              </Typography>
            )}
            multiple
            error={
              form.touched[name] == true && form.errors[name] !== undefined
            }
            label={
              <Box>
                {requiredStar ? (
                  <Typography as='span' sx={{ color: 'secondary.main' }}>
                    *{' '}
                  </Typography>
                ) : null}
                {label}
              </Box>
            }
          >
            {options?.map((option) => (
              <MenuItem key={option?.id} value={option?.id}>
                <Checkbox
                  checked={
                    field.value?.findIndex(
                      (select) => select == option.id + ''
                    ) > -1
                  }
                />
                {option?.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText sx={{ ...errorMessageStyles, mt: '3px', mb: '0px' }}>
            {form.touched[name] && form.errors[name]}
          </FormHelperText>
        </FormControl>
      )}
    </Field>
  );
};
//////
////////////////////////////////////////////////
const CustomInputLabel = ({ requiredStar, inputLabel }) => {
  return (
    <>
      <InputLabel>
        {requiredStar ? (
          <Typography as='span' sx={{ color: 'secondary.main' }}>
            *
          </Typography>
        ) : null}{' '}
        <Typography as='span' sx={{ ...customText, fontSize: '16px' }}>
          {inputLabel}
        </Typography>
      </InputLabel>
    </>
  );
};
