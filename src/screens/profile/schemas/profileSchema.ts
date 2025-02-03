import * as yup from 'yup';

export const profileSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  lastName: yup.string().required('El apellido es obligatorio'),
  dateOfBirth: yup.string().required('La fecha de nacimiento es obligatoria'),
  phone: yup.string().required('El teléfono es obligatorio'),
});
