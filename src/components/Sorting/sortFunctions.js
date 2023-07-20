export const nameSort = (rowA, rowB) => {
  let dir = 1;
  // Sort alphabetically by name
  dir = rowA.original.community.name > rowB.original.community.name ? 1 : -1;
  return dir;
};
