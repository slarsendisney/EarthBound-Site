import { LightningBoltIcon } from "@heroicons/react/outline";
import { useAudit } from "../../context/audit-context";
import SectionHeading from "./SectionHeading";
const Performance = () => {
  const { auditURL } = useAudit();
  return (
    <div>
      <SectionHeading title="Performance" Icon={LightningBoltIcon} />
      <p>Performance</p>
    </div>
  );
};

export default Performance;
