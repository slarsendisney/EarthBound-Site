import { PaperAirplaneIcon } from "@heroicons/react/outline";
import { useAudit } from "../../context/audit-context";
import SectionHeading from "./SectionHeading";
const Environment = () => {
  const { auditURL } = useAudit();
  return (
    <div>
      <SectionHeading title="Environmental Impact" Icon={PaperAirplaneIcon} />
      <p>
        This page produces XXXg of Carbon when loaded for the first time. With
        caching this number is reduced to YYYg.{" "}
      </p>
    </div>
  );
};

export default Environment;
