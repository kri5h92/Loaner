export const filterObj = (obj, cb) => {
  const origObj = { ...obj };
  const newObj = {};
  Object.keys(origObj).forEach((key) => {
    if (cb(key)) {
      newObj[key] = origObj[key];
    }
  });
  return newObj;
};
