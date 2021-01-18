import { toast } from 'react-toastify';
import isPresent from 'utils/isPresent';

const handlingErros = (error) => {
  // Error 😨 🚀
  const errorMessages = {};
  if (error.response) {
    const { data, status } = error.response;

    if (status === 401) {
      toast.error('Credenciais inválidas');
      errorMessages.error = 'Credenciais inválidas';
    }
    if (status === 403) {
      toast.error('403');
      errorMessages.error = '403';
    }
    if (status === 404) {
      toast.error('Está rota não existe');
      errorMessages.error = 'Está rota não existe';
    }
    if (status === 500) {
      toast.error('405');
    }

    if (status === 400) {
      if (isPresent(data)) {
        data.forEach((item) => {
          console.log(item);
          errorMessages[item.field] = `${item.message}`;
        });
      }
    }
    // if (isPresent(data.errors)) {
    //   data.errors.forEach((item) => {
    //     console.log(item)
    //     if (item.status === '422') {

    //       // const attribute = t(
    //       //   `${controller}.attributes.${item.source.pointer}`
    //       // );
    //       // const message = t(`form.${item.title}`);

    //       // errorMessages[item.source.pointer] = `${attribute} ${message}`;
    //       // errorMessages[item.source.pointer] = `${attribute} ${item.detail}`;
    //       errorMessages[item.source.pointer] = `${item.detail}`;
    //     }
    //     if (item.status === '404') {
    //       const attribute =item.code;
    //       const message =item.title;
    //       toast.error(`${attribute} ${message}`);
    //     }
    //   });
    // }
  } else if (error.request) {
    toast.error('Não há conexeção');
    errorMessages.error = 'Não há conexeção';
  } else {
    toast.error('Aconhteceu algum error loko fio');
    errorMessages.error = 'Aconteceu algum erro loko fio';
  }

  return errorMessages;
};

export default handlingErros;
