import React, { useState, useContext, useMemo, useEffect } from "react";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";

const monday = mondaySdk();

const MondayContext = React.createContext();

export const MondayProvider = ({ ...props }) => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    monday.listen("settings", (res) => {
      setSettings(res.data);
    });
  }, []);

  return (
    <MondayContext.Provider value={{ settings }}>
      {props.children}
    </MondayContext.Provider>
  );
};

export const useMonday = () => useContext(MondayContext);

export default MondayContext;
