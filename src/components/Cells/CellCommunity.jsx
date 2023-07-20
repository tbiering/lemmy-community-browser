import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/20/solid";

function CellCommunity({ community }) {
  return (
    <div className="flex flex-col">
      <div className="text-sm font-medium text-gray-900">
        <a href={community.actor_id} target="_new">
          {community.name}
          <ArrowTopRightOnSquareIcon className="w-3 h-3 inline-block ml-1" />
        </a>
      </div>
      <div className="text-sm text-gray-500">{community.title}</div>
    </div>
  );
}

export default CellCommunity;
