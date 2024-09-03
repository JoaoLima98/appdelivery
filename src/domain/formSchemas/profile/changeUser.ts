import * as yup from 'yup'

export const changeUserFormSchema = yup.object({
  name: yup
  .string()
  .required('Campo obrigatorio!'),

  email: yup
  .string()
  .email('Forneça um e-mail válido!')
  .required('Campo obrigatorio!'),
})

export type ChangeForm = yup.InferType<typeof changeUserFormSchema>;