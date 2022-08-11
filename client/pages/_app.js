import { MondayProvider } from "../context/monday-context";
import { AuditProvider } from "../context/audit-context";
import "../styles/globals.css";
import "monday-ui-react-core/dist/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <MondayProvider>
      <AuditProvider>
        <Component {...pageProps} />
      </AuditProvider>
    </MondayProvider>
  );
}

export default MyApp;
