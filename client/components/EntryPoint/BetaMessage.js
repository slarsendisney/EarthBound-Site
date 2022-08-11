import { InformationCircleIcon } from "@heroicons/react/solid";

const BetaMessage = () => {
  return (
    <div className="flex space-x-1 items-center">
      <InformationCircleIcon className="w-5 text-blue-600" />
      <p className="text-gray-600 text-sm">
        While we are in beta, only publically accessible websites are supported.
      </p>
    </div>
  );
};

export default BetaMessage;
