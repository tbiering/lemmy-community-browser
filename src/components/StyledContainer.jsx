import Table from "./Table";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

function StyledContainer() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-xl font-semibold">Lemmy Communities Browser</h1>
        </div>
        <div className="mt-4">
          <Table />
        </div>

        <div className="inline-flex mt-4 text-sm italic text-gray-700">
          <span>
            <InformationCircleIcon className="inline-block w-4 h-4 mr-1 text-sky-500" />
          </span>
          <span>Data is updated regularly via GitHub Actions.</span>
        </div>
        <br />
        <div className="inline-flex text-sm italic text-gray-700">
          <span className="not-italic">🛠</span>
          <span>
            Quickly assembled by{" "}
            <a href="https://github.com/tbiering" className="underline">
              Thomas Biering
            </a>
            . Source code available on{" "}
            <a
              href="https://github.com/tbiering/lemmy-community-browser"
              className="underline"
            >
              GitHub
            </a>
            .
          </span>
        </div>
      </main>
    </div>
  );
}

export default StyledContainer;
