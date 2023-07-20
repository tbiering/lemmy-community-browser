// Custom filter for name column
export const nameFilter = (row, columnId, value) => {
  let content = row.getValue(columnId);

  // If content.title contains value, it's a match
  if (content.name.toLowerCase().includes(value.toLowerCase())) {
    return true;
  }

  if (content.title.toLowerCase().includes(value.toLowerCase())) {
    return true;
  }
  return false;
};

// Custom filter for nsfw column
export const nsfwFilter = (row, columnId, value) => {
  return row.getValue(columnId).toString() === value;
};
