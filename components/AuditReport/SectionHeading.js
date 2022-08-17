import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";

const SectionHeading = ({ title, Icon, status = 0.5 }) => {
  return (
    <div className="w-full relative pb-6 mb-2">
      <div className="absolute top-0 mt-3 left-0 w-full z-0 h-0.5 bg-gray-100"></div>
      <div className="bg-white pr-3 absolute top-0 left-0 z-10 ">
        <div className="flex space-x-1 items-center text-gray-600">
          {status > 0.79 ? (
            <CheckCircleIcon className="h-6 w-6 text-green-400" />
          ) : status > 0.5 ? (
            <ExclamationCircleIcon className="h-6 w-6 text-yellow-400" />
          ) : (
            <ExclamationCircleIcon className="h-6 w-6 text-red-400" />
          )}
          {Icon && <Icon className="h-5 w-5" />}
          <p className="text-lg">{title}</p>
        </div>
      </div>
      {status && (
        <div className="bg-white pl-3 absolute top-0 right-0 z-10 "></div>
      )}
    </div>
  );
};

export default SectionHeading;
