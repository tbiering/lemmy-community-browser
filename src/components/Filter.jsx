function Filter({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  if (typeof firstValue === "boolean") {
    return (
      <select
        value={columnFilterValue ?? ""}
        onChange={(e) => {
          column.setFilterValue(e.target.value);
        }}
        className="w-20 border shadow rounded text-xs font-medium text-gray-500 uppercase"
      >
        <option value="">Any</option>
        <option value={true}>True</option>
        <option value={false}>False</option>
      </select>
    );
  }

  if (typeof firstValue === "number") {
    return (
      <div className="flex space-x-2">
        <input
          type="number"
          value={columnFilterValue?.[0] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old) => [e.target.value, old?.[1]])
          }
          placeholder={`Min`}
          className="w-20 border shadow rounded text-xs font-medium text-gray-500 uppercase"
        />
        <input
          type="number"
          value={columnFilterValue?.[1] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old) => [old?.[0], e.target.value])
          }
          placeholder={`Max`}
          className="w-20 border shadow rounded text-xs font-medium text-gray-500 uppercase"
        />
      </div>
    );
  }

  return (
    <input
      type="text"
      value={columnFilterValue ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Filter...`}
      className="w-36 border shadow rounded text-xs font-medium text-gray-500"
    />
  );
}

export default Filter;
