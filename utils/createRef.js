exports.createRef = (arr) => {
  if (arr.length === 0) return {};
  const refObj = {};
  // shops.rows.forEach((shop) => {
  //   refObj[shop.shop_name] = shop.shop_id;
  // });
  arr.map((shop) => {
    return (refObj[shop.shop_name] = shop.shop_id);
  });
  return refObj;
};
