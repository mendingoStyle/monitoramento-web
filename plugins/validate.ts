import { Validator,  } from 'vee-validate'

Validator.extend('my-validation', {
  // message: 'This {_field_} is invalid.',
  validate: (value: string) => {
    console.log(value)
    return true
  }
})
