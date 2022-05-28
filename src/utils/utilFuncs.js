export const isArrayEmpty = (arr) => (!((typeof arr !== 'undefined') && arr.length > 0));

export const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

export const convertObjToQuery = (query) => {
  let url = '';
  Object.keys(query).forEach((key, index) => {
    if (index === 0) {
      url = url.concat(`?${key}=${query[key]}`);
    } else {
      url = url.concat(`&${key}=${query[key]}`);
    }
  });
  return url;
};

export const cleanObj = (obj) => {
  Object.keys(obj).forEach((k) => {
    const objProp = obj[k];
    if (objProp === null || objProp === undefined || objProp === '' || objProp === {} || objProp === []) delete obj[k]; // eslint-disable-line
    else if (typeof objProp === 'object' && Object.keys(objProp).length > 0) cleanObj(obj[k]);
  });
  return obj;
};

export const createDataTree = (dataset) => {
  const hashTable = Object.create(null);
  dataset.forEach((aData) => {
    hashTable[aData._id] = { ...aData, childs: [] };
  });
  const dataTree = [];
  dataset.forEach((aData) => {
    if (aData.parentId) {
      hashTable[aData.parentId].childs.push(hashTable[aData._id]);
    } else dataTree.push(hashTable[aData._id]);
  });
  return [dataTree, hashTable];
};

export const generateBreadCrumbs = (path, map_name_id) => path.map((name) => ({
  name,
  path: map_name_id[name] ? `category/${map_name_id[name]}` : ''
}));

export const roundPrice = (price) => (Math.round(price * 100) / 100);

export const caculateTotalPrice = (items) => roundPrice(items.reduce((accumul, cur) => (accumul + cur.quantity * cur.price), 0));
export const caculateCartPrice = (items) => roundPrice(
  items
    .filter((item) => item.isSelected === true)
    .reduce((accumul, cur) => (accumul + cur.quantity * cur.price), 0)
);
