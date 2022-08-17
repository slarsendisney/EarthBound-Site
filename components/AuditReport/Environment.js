import { PaperAirplaneIcon } from "@heroicons/react/outline";
import { useAudit } from "../../context/audit-context";
import SectionHeading from "./SectionHeading";

function awesomeness(value) {
  if (value > 0.79) {
    return "great";
  }
  if (value > 0.49) {
    return "okay";
  }
  return "needs attention";
}
const Environment = () => {
  const { auditData } = useAudit();
  const metersByAirplane = (auditData.carbon / 115) * 1000;
  const metersByCar = (auditData.carbon / 122.3) * 1000 * 1000;

  const statusCalc = auditData.carbon / auditData.carbonWithCache;
  return (
    <div>
      <SectionHeading
        title="Environmental Impact"
        Icon={PaperAirplaneIcon}
        status={statusCalc}
      />
      <p>
        This page produces{" "}
        <span className="font-semibold">{auditData.carbon}g</span> of Carbon
        when loaded for the first time. With caching this number is reduced to{" "}
        {auditData.carbonWithCache}g which is {awesomeness(statusCalc)}.
      </p>
      <p>
        If 1000 site visitors produces {auditData.carbon}g of Carbon, it would
        be equivalent to:
      </p>
      Travelling {metersByAirplane.toFixed(1)} as a passenger by airplane.
      Travelling {metersByCar.toFixed(1)} meters by car.
    </div>
  );
};

export default Environment;
