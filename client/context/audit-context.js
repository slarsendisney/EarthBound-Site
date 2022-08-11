import React, { useState, useContext, useMemo, useEffect } from "react";
import EntryPoint from "../components/EntryPoint";
import LoadingSpinner from "../components/Generic/LoadingSpinner";

const AuditContext = React.createContext();

export const AuditProvider = ({ ...props }) => {
  const [auditURL, setAuditURL] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => [setLoading(false)], 1000);
  }, [auditURL]);

  if (!auditURL) {
    return <EntryPoint setAuditURL={setAuditURL} />;
  }

  return (
    <AuditContext.Provider value={{ auditURL, setAuditURL }}>
      {loading ? <LoadingSpinner /> : props.children}
    </AuditContext.Provider>
  );
};

export const useAudit = () => useContext(AuditContext);

export default AuditContext;
