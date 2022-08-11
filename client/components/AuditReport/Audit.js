import { RefreshIcon } from "@heroicons/react/outline";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import DialogContentContainer from "monday-ui-react-core/dist/DialogContentContainer";
import dynamic from "next/dynamic";
import { useAudit } from "../../context/audit-context";
import Environment from "./Environment";
import Hosting from "./Hostings";
import Overview from "./Overview";
import PageWeight from "./PageWeight";
import Performance from "./Performance";
import QuickActions from "./QuickActions";

const Button = dynamic(() => import("monday-ui-react-core/dist/Button"), {
  ssr: false,
});

const Audit = () => {
  const { setAuditURL } = useAudit();
  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex items-center justify-between pb-3">
        <Button
          kind="secondary"
          leftIcon={() => <ArrowLeftIcon className="h-4 mr-2" />}
          onClick={() => setAuditURL(null)}
        >
          Back
        </Button>
        <Button
          kind="secondary"
          rightIcon={() => <RefreshIcon className="h-4 ml-2" />}
        >
          Rerun
        </Button>
      </div>
      <DialogContentContainer className="flex flex-col py-6 space-y-4 px-0">
        <div className="px-6">
          <Overview />
          <div className="px-1 space-y-4 pt-4">
            <Environment />
            <Hosting />
            <Performance />
            <PageWeight />
          </div>
        </div>
        <div className="px-7 border-t pt-6">
            <QuickActions/>
        </div>
      </DialogContentContainer>
    </div>
  );
};

export default Audit;
