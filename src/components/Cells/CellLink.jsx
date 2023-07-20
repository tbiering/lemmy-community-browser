import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

function CellLink({ value }) {
  // Return two lines, the first being the name, the second being the title
  return (
    <div className="text-sm font-medium text-gray-900">
      <a href={value} target="_new">
        {value}
        <ArrowTopRightOnSquareIcon className="w-3 h-3 inline-block ml-1" />
      </a>
    </div>
  );
}

export default CellLink;
