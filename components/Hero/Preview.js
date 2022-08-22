import Image from "next/image";
import FAQs from "../Landing/FAQ";
const Preview = () => (
  <div className="max-w-7xl mx-auto py-16 space-y-10">
    <div className="relative">
      <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight  sm:text-4xl">
        The internet is responsible for{" "}
        <span className="text-accent-text">3.7%</span> of all global CO2
        emissions.
      </h2>
      <p className="mt-4 max-w-3xl mx-auto text-center text-xl ">
        As tech teams, it is our responsibility to ensure the carbon footprint
        of the websites we create are as small as possible. But, monitoring sites
        for this can be time consuming.<br/>Or, at least it was. Until now.
      </p>
      
    </div>
    <div className="bg-white rounded-lg p-3 w-72 mx-auto">
      <Image alt="" src={require("./Card.png")} />
    </div>
    <p className="mt-4 max-w-3xl mx-auto text-center text-xl ">
        The <span className="font-earth text-2xl">EarthBound</span> monday.com integration is a simple way to get an overview of your website&apos;s carbon footprint. It includes:
      </p>
    <FAQs />
  </div>
);

export default Preview;
