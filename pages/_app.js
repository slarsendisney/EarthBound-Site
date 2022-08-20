import { MondayProvider } from "../context/monday-context";
import { AuditProvider } from "../context/audit-context";
import "../styles/globals.css";
import "monday-ui-react-core/dist/main.css";
import "../styles/hero.scss";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
