import Layout from "../Layout";
import dynamic from "next/dynamic";
import { useAudit } from "../../context/audit-context";

const Label = dynamic(() => import("monday-ui-react-core/dist/Label"), {
    ssr: false,
  });
  

const Loader = dynamic(() => import("monday-ui-react-core/dist/Loader"), {
  ssr: false,
});

const LoadingSpinner = () => {
    const {auditURL} = useAudit()  
 return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="h-16 w-16">
          <Loader />
        </div>
        <h3 className="text-xl">Gathering insights on <span className="text-blue-600">{auditURL}</span></h3>
        <Label kind="line" isLegIncluded={false} className="rounded-l" text="✌️ Stick with us, this can take a minute or two...."/>
      </div>
    </Layout>
  );
};

export default LoadingSpinner;
