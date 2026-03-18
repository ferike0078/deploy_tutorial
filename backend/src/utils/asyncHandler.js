//higherorder fn -->async fn-t kap
//express middleware-t ad vissza

export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
