exports.calculatePagination = (options) => {
  const page = Number(options?.page || 1);
  const limit = Number(options?.limit);
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};
