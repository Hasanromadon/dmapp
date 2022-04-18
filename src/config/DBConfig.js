export const DBConfig = {
  name: 'MyDB',
  version: 6,
  objectStoresMeta: [
    {
      store: 'dumba',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        {
          name: 'id_product',
          keypath: 'id_product',
          options: { unique: true },
        },
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'price', keypath: 'price', options: { unique: false } },
        { name: 'qty', keypath: 'qty', options: { unique: false } },
        { name: 'rating', keypath: 'rating', options: { unique: false } },
        { name: 'desc', keypath: 'desc', options: { unique: false } },
        { name: 'image', keypath: 'image', options: { unique: false } },
      ],
    },
    {
      store: 'cart',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        {
          name: 'id_product',
          keypath: 'id_product',
          options: { unique: true },
        },
        { name: 'qty', keypath: 'qty', options: { unique: false } },
        { name: 'price', keypath: 'price', options: { unique: false } },
        { name: 'image', keypath: 'image', options: { unique: false } },
      ],
    },
  ],
};
