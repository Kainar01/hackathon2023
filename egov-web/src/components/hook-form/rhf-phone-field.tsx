import React, { ChangeEvent, forwardRef, useMemo } from 'react';

import { TextField, TextFieldProps } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import MaskedInput from 'react-text-mask';

type IProps = {
  name: string;
};

type Props = IProps & TextFieldProps;

const PHONE_MASK = [
  '+',
  /\d/,
  ' ',
  '(',
  /[1-9]/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export function RHFPhoneField({ name, ...other }: Props) {
  const { control } = useFormContext();

  const handleChange = (onChange: (value: string) => void) => (
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const phoneValue = target.value;
      const unmaskedPhone = phoneValue.replace(/[^\d]/g, '');
      onChange(unmaskedPhone);
    });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <TextField
          error={!!error}
          helperText={error?.message}
          InputProps={{
            inputComponent: TextMaskCustom as any,
            inputProps: {
              onChange: handleChange(onChange),
              isUkrainePhone: field.value?.startsWith('3'),
            },
          }}
          InputLabelProps={{ ...(field.value !== '' && { shrink: true }) }}
          {...field}
          {...other}
        />
      )}
    />
  );
}

type TextMaskCustomProps = {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  isUkrainePhone?: boolean;
};
const TextMaskCustom = forwardRef<HTMLElement, TextMaskCustomProps>((props, _ref) => {
  const { isUkrainePhone, ...restProps } = props;

  const mask = useMemo(() => {
    if (isUkrainePhone) {
      return [...PHONE_MASK, /\d/];
    }

    return PHONE_MASK;
  }, [isUkrainePhone]);

  return <MaskedInput {...restProps} mask={mask} guide={false} keepCharPositions />;
});
