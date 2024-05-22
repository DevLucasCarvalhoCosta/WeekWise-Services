import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password')
});

export const signupValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Verifique sua senha, ela deve corresponder.')
    .required('Confirmaçao de senha é obrigatório.')
});

export const passwordResetSchema = Yup.object().shape({
  email: Yup.string()
    .required('Por favor insira um e-mail cadastrado.')
    .label('Email')
    .email('Entre com um email válido.')
});
