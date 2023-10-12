/*-------------------------------------------------------------------
|
|  🐯 Purpose: THIS FILE CONTAINS ALL THE VALIDATORS OBJECTS
|
*-------------------------------------------------------------------*/
// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const EMAIL_REGEX =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// const MOBILE_REGEX = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

export const firstName_validation = {
  name: 'firstName',
  label: 'Անուն',
  type: 'text',
  id: 'firstName',
  placeholder: "Անուն",
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}
export const lastName_validation = {
  name: 'lastName',
  label: 'Ազգանուն',
  type: 'text',
  id: 'lastName',
  placeholder: "Ազգանուն",
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}
export const midName_validation = {
  name: 'midName',
  label: 'Հայրանուն',
  type: 'text',
  id: 'midName',
  placeholder: "Հայրանուն",
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}
export const user_validation = {
    name: 'user',
    label: 'Ծածկանուն',
    type: 'text',
    id: 'user',
    placeholder: "Ծածկանուն",
    validation: {
      required: {
        value: true,
        message: 'required',
      },
      maxLength: {
        value: 30,
        message: '30 characters max',
      },
    },
  }
  export const pwd_validation = {
    name: 'pwd',
    label: 'Ծածկագիր',
    type: 'password',
    id: 'pwd',
    placeholder: 'Ծածկագիր',
    validation: {
      required: {
        value: true,
        message: 'required',
      },
      minLength: {
        value: 6,
        message: 'min 6 characters',
      },
    },
  }
export const position_validation = {
    name: 'position',
    label: 'Պաշտոն',
    type: 'text',
    id: 'position',
    placeholder: "Պաշտոն",
    validation: {
      required: {
        value: true,
        message: 'required',
      },
      maxLength: {
        value: 30,
        message: '30 characters max',
      },
    },
  }
export const birthday_validation = {
  name: 'birthday',
  label: 'Ծննդյան ամսաթիվ',
  type: 'text',
  id: 'birthday',
  placeholder: "DD/MM/YYYY",
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 10,
      message: '10 symbols max',
    },
  },
}
export const age_validation = {
  name: 'age',
  label: 'Տարիք',
  type: 'number',
  id: 'age',
  placeholder: "Տարիք",
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 3,
      message: '3 numbers max',
    },
  },
}
export const address_validation = {
  name: 'address',
  label: 'Հասցե',
  type: 'text',
  id: 'address',
  placeholder: "Հասցե",
  validation: {
    required: {
      value: true,
      message: 'required',
    }
  },
}
export const email_validation = {
  name: 'email',
  label: 'Էլ․ հասցե',
  type: 'email',
  id: 'email',
  placeholder: 'Էլ․ հասցե',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'not valid',
    },
  },
}
export const mobile_validation = {
  name: 'mobile',
  label: 'Հեռախոս',
  type: 'text',
  id: 'mobile',
  placeholder: "Հեռախոս",
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 15,
      message: '15 numbers max',
    },
  },
}

export const desc_validation = {
  name: 'description',
  label: 'description',
  multiline: true,
  id: 'description',
  placeholder: 'write description ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 200,
      message: '200 characters max',
    },
  },
}




