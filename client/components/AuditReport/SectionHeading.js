const SectionHeading = ({ title, Icon }) => {
  return (
    <div className="w-full relative pb-6 mb-2">
      <div className="absolute top-0 mt-3 left-0 w-full z-0 h-0.5 bg-gray-100"></div>
      <div className="bg-white pr-3 absolute top-0 left-0 z-10 ">
        <div className="flex space-x-1 items-center text-gray-600">
          {Icon && <Icon className="h-5 w-5"/>}
          <p className="text-lg">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default SectionHeading;
