import { Deserializer } from 'jsonapi-serializer';

const deserializer = async (data) => {
  const { deserialize } = new Deserializer({
    keyForAttribute: 'snake_case',
  });

  let deserializeData = {};

  try {
    deserializeData = await deserialize(data);
  } catch(e) {
    console.info('catch deserialize', e);
  }

  return deserializeData;
};

export default deserializer;
