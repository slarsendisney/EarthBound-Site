import { CheckCircleIcon } from "@heroicons/react/solid";
import { useAudit } from "../../context/audit-context";
const Overview = () => {
  const { auditURL } = useAudit();
  return (
    <div className="grid grid-cols-8 gap-4">
      <div className="col-span-3">
        <div className="bg-green-300 text-green-900 rounded-lg p-6">
          <div className="flex space-x-2 items-center">
            <CheckCircleIcon className="w-12" />
            <h2 className="text-2xl font-semibold">Certified Green</h2>
          </div>
        </div>
      </div>
      <div className="col-span-5">
        <div className="p-2 flex items-center h-full">
          <p>
            Our audit report found{" "}
            <span className="text-blue-600">{auditURL}</span> to be greener than
            most websites. This page outlines our findings and areas where you
            could improve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
