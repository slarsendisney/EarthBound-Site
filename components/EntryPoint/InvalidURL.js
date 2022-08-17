import dynamic from "next/dynamic";
import {RefreshIcon, ExclamationIcon} from "@heroicons/react/outline"

const Button = dynamic(() => import("monday-ui-react-core/dist/Button"), {
  ssr: false,
});

const InvalidURL = ({ onClose }) => {
  return (
    <div className="flex flex-col space-y-3 ">
      <div className="flex space-x-1 items-center">
      <ExclamationIcon className="w-8 text-red-400"/>
      <h2 className="text-xl font-medium">Invalid URL</h2>
      </div>
      <p className="font-light ">
        The URL you provided does not appear to be valid, click the button below
        to try again.
      </p>
      <div className="monday-style-attention-box_search">
        <Button type="success" onClick={() => onClose()} leftIcon={() => <RefreshIcon className="h-5 mr-2"/>} className="w-full" size="lg">
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default InvalidURL;
