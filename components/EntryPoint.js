import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { isValidUrl } from "../utils/isValidURL";
import InvalidURL from "./EntryPoint/InvalidURL";
import EntryCard from "./EntryPoint/URLEntryCard";

import DialogContentContainer from "monday-ui-react-core/dist/DialogContentContainer";
import BetaMessage from "./EntryPoint/BetaMessage";
import TreeOne from "./Assets/TreeOne";
import { GlobeIcon } from "@heroicons/react/outline";
import Logo from "./Generic/Logo";

const EntryPoint = ({ setAuditURL, fetchAuditData }) => {
  const [value, setValue] = useState("sld.codes");
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    setAuditURL(value);
  }, [value, setAuditURL]);

  const onSubmit = () => {
    if (isValidUrl(value)) {
      fetchAuditData();
    } else {
      setToastOpen(true);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-4 items-center justify-center my-auto h-full pt-6 md:pt-16 lg:pt-24 ">
        <div className="flex space-x-1 text-green-800 text-lg font bold items-center">
          <Logo className="w-5" />
          <p>EarthBound.Site</p>
        </div>
        <DialogContentContainer className="max-w-2xl w-full p-0">
          <div className="grid md:grid-cols-2 w-full">
            <div className="h-48 md:h-96 relative w-full bg-[#CBEBC0] rounded-l p-6">
              <h2 className="text-green-900 font-bold text-6xl">
                A <span className="text-green-700">greener</span> web starts
                here.
              </h2>
              <Logo className="text-green-600 absolute bottom-0 right-0 h-[60%] m-5 md:h-[40%]" />
            </div>
            <div className="p-6 w-full flex flex-col justify-center">
              {toastOpen ? (
                <InvalidURL onClose={() => setToastOpen(false)} />
              ) : (
                <EntryCard
                  onSubmit={onSubmit}
                  value={value}
                  onChange={(e) => setValue(e)}
                />
              )}
            </div>
          </div>
        </DialogContentContainer>
        <DialogContentContainer className="max-w-2xl w-full px-4 py-3">
          <BetaMessage />
        </DialogContentContainer>
      </div>
    </Layout>
  );
};

export default EntryPoint;
