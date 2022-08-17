import React, { useState, useContext, useMemo, useEffect } from "react";
import EntryPoint from "../components/EntryPoint";
import LoadingSpinner from "../components/Generic/LoadingSpinner";

const AuditContext = React.createContext();

export const AuditProvider = ({ ...props }) => {
  const [auditURL, setAuditURL] = useState(null);
  const [auditData, setAuditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fetchAuditData = async () => {
    setLoading(true);
    setSubmitted(true);
    const res = await fetch(`/api/audit?url=${auditURL}`);
    const data = await res.json();
    setAuditData(data);
    setLoading(false);
  };

  const reset = () => {
    setAuditURL(null);
    setAuditData(null);
    setSubmitted(false);
  }

  if (!submitted) {
    return (
      <EntryPoint setAuditURL={setAuditURL} fetchAuditData={fetchAuditData} />
    );
  }

  return (
    <AuditContext.Provider value={{ auditURL, setAuditURL, reset, auditData }}>
      {loading ? <LoadingSpinner /> : props.children}
    </AuditContext.Provider>
  );
};

export const useAudit = () => useContext(AuditContext);

export default AuditContext;
