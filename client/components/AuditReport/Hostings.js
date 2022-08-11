import { GlobeIcon } from "@heroicons/react/outline";
import { useAudit } from "../../context/audit-context";
import SectionHeading from "./SectionHeading";
const Hosting = () => {
  const { auditData } = useAudit();
  return (
    <div>
      <SectionHeading
        title="Hosting"
        Icon={GlobeIcon}
        status={
          auditData.hosting.data ? (auditData.hosting.green ? 1 : 0.8) : 0.6
        }
      />
      {!auditData.hosting.data ? (
        <p>
          We were not able to verify whether you site is hosted by a green
          hosting provider. 
        </p>
      ) : (
        <p>
          This URL is hosted on {auditData.hosting.hosted_by} which the Green
          Web Foundation considers{" "}
          {auditData.hosting.green ? "green" : "not green"}.
        </p>
      )}
    </div>
  );
};

export default Hosting;
