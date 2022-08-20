import Layout from "../components/Layout";
import Audit from "../components/AuditReport/Audit";
import { MondayProvider } from "../context/monday-context";
import { AuditProvider } from "../context/audit-context";

export default function Home() {
  return (
    <MondayProvider>
      <AuditProvider>
        <Layout>
          <Audit />
        </Layout>
      </AuditProvider>
    </MondayProvider>
  );
}
