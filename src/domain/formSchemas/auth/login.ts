import * as yup from 'yup'

export const loginFormSchema = yup.object({
  email: yup
  .string()
  .email('Forneça um e-mail válido!')
  .required('Campo obrigatorio!'),
  password: yup
  .string()
  .min(8, 'A senha precisa ter no minimo 8 caracteres')
  .required('Campo obrigatorio!'),
  name: yup
  .string()
  .required('Campo Obrigatório!')
})

export type LoginForm = yup.InferType<typeof loginFormSchema>;
