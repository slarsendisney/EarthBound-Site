import dynamic from "next/dynamic";
import {ArrowRightIcon} from "@heroicons/react/outline"

const TextField = dynamic(() => import("monday-ui-react-core/dist/TextField"), {
  ssr: false,
});

const Button = dynamic(() => import("monday-ui-react-core/dist/Button"), {
  ssr: false,
});

const EntryCard = ({ onSubmit, value, onChange }) => {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-medium">Audit</h2>
      <TextField
        value={value}
        placeholder="www.google.com"
        title="Enter the URL to Audit"
        onChange={onChange}
        size="lg"
      />
      <div className="w-full">
      <Button onClick={onSubmit}  size="lg" className="w-full max-w-xl" rightIcon={() => <ArrowRightIcon className="w-4 ml-2"/>}>Audit</Button>
      </div>
    </div>
  );
};

export default EntryCard;
