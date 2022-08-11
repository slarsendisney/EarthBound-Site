import dynamic from "next/dynamic";
import {BookmarkIcon, ClockIcon, DocumentDownloadIcon} from "@heroicons/react/outline"
const Button = dynamic(() => import("monday-ui-react-core/dist/Button"), {
  ssr: false,
});

const QuickActions = () => {
  return (
    <div className="flex space-x-1">
      <Button leftIcon={() => <BookmarkIcon className="w-4 mr-1"/>}>Add to Board</Button>
      <Button leftIcon={() => <DocumentDownloadIcon className="w-4 mr-1"/>} kind="tertiary">Download PDF</Button>
      <Button leftIcon={() => <ClockIcon className="w-4 mr-1"/>} kind="tertiary">Schedule Monitoring</Button>
    </div>
  );
};

export default QuickActions;
