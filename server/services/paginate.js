/**
 * generate pagination metadata
 * @param {number} limit
 * @param {number} offset
 * @param {number} totalCount
 * @param {number} pageSize
 * @return {object} pagination metadata
 */
const paginate = ({ limit, offset, totalCount, pageSize }) => {
  const totalPages = Math.ceil(totalCount / limit);
  const currentPage = Math.floor((offset + limit) / limit);
  const nextPage = (totalPages > currentPage) ?
  currentPage + 1 : null;
  return {
    currentPage,
    pageSize: (currentPage) ? pageSize : null,
    nextPage,
    totalPages,
    totalCount
  };
};

export default paginate;

