import Image from "next/image";
import AddToMondayButton from "../Hero/AddToMonday";

export default function StartToday() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 ">
      <div className="bg-accent-background rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
        <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
          <div className="lg:self-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to dive in?</span>
              <span className="block font-earth text-4xl md:text-5xl text-accent-text">
                Start your first audit now.
              </span>
            </h2>
            <p className="mt-4 text-lg leading-6">
              Add <span className="font-earth text-2xl">EarthBound</span>&apos;s
              integration to your monday.com board today and we&apos;ll do the
              rest.
            </p>
            <div className="w-56 mt-8">
              <AddToMondayButton />
            </div>
          </div>
        </div>
        <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
          <div className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20">
            <Image alt="App screenshot" src={require("../Hero/heroImg.png")} className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
