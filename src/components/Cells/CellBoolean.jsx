import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";

function CellBoolean({ value }) {
  const size = "w-5 h-5";
  if (value) {
    return (
      <div className="text-center">
        <CheckCircleIcon className={`${size} text-green-400 inline`} />
      </div>
    );
  } else {
    return (
      <div className="text-center">
        <XCircleIcon className={`${size} text-red-400 inline`} />
      </div>
    );
  }
}

export default CellBoolean;
