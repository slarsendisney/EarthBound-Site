import { ServerIcon } from "@heroicons/react/outline";
import { useAudit } from "../../context/audit-context";
import SectionHeading from "./SectionHeading";
const PageWeight = () => {
  const { auditURL } = useAudit();
  return (
    <div>
      <SectionHeading title="Page Weight" Icon={ServerIcon} />
      <p>PageWeight</p>
    </div>
  );
};

export default PageWeight;
