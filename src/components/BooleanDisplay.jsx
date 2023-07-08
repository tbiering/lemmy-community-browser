import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";

function BooleanDisplay({ value }) {
  const size = "w-5 h-5";
  if (value) {
    return <CheckCircleIcon className={`${size} text-green-400`} />;
  } else {
    return <XCircleIcon className={`${size} text-red-400`} />;
  }
}

export default BooleanDisplay;
