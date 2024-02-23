import React from 'react'
import { useController } from 'react-hook-form'
import DatePicker from "react-datepicker";

function CustomDateComponent({ control, name })  {
    const {
      field,
      fieldState: { invalid, isTouched, isDirty },
      formState: { touchedFields, dirtyFields },
    } = useController({
      name,
      control,
      rules: { required: true },
    });
  
    const handleDateChange = (date) => {
      field.onChange(date);
    };
    return (
      <DatePicker
       showYearDropdown
       yearDropdownItemNumber={100}
       scrollableYearDropdown
       onChange={handleDateChange}
       dateFormat={"yyyy-MM-dd"}
       selected={field.value}
       isClearable
       required
       placeholderText="Ընտրեք ամսաթիվը" 
       />
    )
}

export default CustomDateComponent
