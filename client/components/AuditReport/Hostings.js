import { GlobeIcon } from "@heroicons/react/outline";
import { useAudit } from "../../context/audit-context";
import SectionHeading from "./SectionHeading";
const Hosting = () => {
  const { auditURL } = useAudit();
  return (
    <div>
      <SectionHeading title="Hosting" Icon={GlobeIcon} />
      <p>This URL is hosted on XXXX which the Green Web Foundation considers green.</p>
    </div>
  );
};

export default Hosting;
