import * as Yup from 'yup';

async function yupValidator(schema, data) {
  try {
    await schema.validate(data, { abortEarly: false });

    return {};
  } catch (errors) {
    const errorMessages = {};
    if (errors instanceof Yup.ValidationError) {
      errors.inner.forEach((error) => {
        // const attribute = error.path;
        // const message = error.type;

        errorMessages[error.path] = `${error.message}`;

        // let params = '';
        // if (error.params.min) {
        //   params = `${error.params.min} minimo`;
        // }
        // if (error.params.max) {
        //   params = `${error.params.max} ma´ximo`;
        // }

        // errorMessages[error.path] = `${attribute} ${message} ${params}`;
      });
    }

    return errorMessages;
  }
}

export default yupValidator;
