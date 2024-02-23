import React from 'react'
import { useController } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'

function CustomPhoneComponent({ control, name })  {
    const {
      field,
      fieldState: { invalid, isTouched, isDirty },
      formState: { touchedFields, dirtyFields },
    } = useController({
      name,
      control,
      rules: { required: true },
    })
  
    return (
      <PhoneInput
      placeholder="Հեռախոս"
      value={field.value}
      onChange={field.onChange}
      displayInitialValueAsLocalNumber
      initialValueFormat="national"
      autoComplete="off"
      defaultCountry="AM"
    />
    )
}

export default CustomPhoneComponent
