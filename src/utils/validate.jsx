import * as Yup from "yup";

// En este caso, utilizamos abortEarly: false para asegurarnos de que todas las validaciones se ejecuten y así obtener todos los mensajes de error.


// Shema del login
export const userSchema = Yup.object().shape({
  emailAddress: Yup.string().email('Correo electrónico no válido').required('El correo electrónico es requerido'),
  password: Yup.string().required('La contraseña es requerida').min(3, 'La contraseña debe tener al menos 8 caracteres'),
})


// Shema del registro seccion del User
export const validationSchemaUser = Yup.object().shape({
  documentType: Yup.string().required('El tipo de documento es requerido'),
  documentNumber: Yup.string().required('El número de documento es requerido'),
  fullName: Yup.string().required('El nombre completo es requerido'),
  emailAddress: Yup.string().email('Introduce un email válido').required('El email es requerido'),
  password: Yup.string().min(6, 'La contraseña debe tener como máximo 6 caracteres').required('La contraseña es requerida'),
});

// Shema del registro seccion del org
export const validationSchemaOrg = Yup.object().shape({
  organization_name: Yup.string().required('El nombre completo es requerido'),
  address_organization: Yup.string().required('El direccion es requerido'),
  email_organization: Yup.string().email('Introduce un email válido').required('El email es requerido'),
  organization_password: Yup.string().min(6, 'La contraseña debe tener como máximo 6 caracteres').required('La contraseña es requerida'),
});
