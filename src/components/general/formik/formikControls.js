import { CustomTextField, InputRadio, InputSelect } from './formikComponents';
function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case 'inputText':
      return <CustomTextField {...rest} />;
    case 'inputSelect':
      return <InputSelect {...rest} />;
    case 'inputRadio':
      return <InputRadio {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
