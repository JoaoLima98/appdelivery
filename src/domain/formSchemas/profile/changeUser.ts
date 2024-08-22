import * as yup from 'yup'

export const changeUserFormSchema = yup.object({
  value: yup
  .string()
  .required('Campo obrigatorio!'),
})

