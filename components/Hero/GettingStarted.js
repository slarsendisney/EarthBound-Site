/* This example requires Tailwind CSS v2.0+ */
const posts = [
  {
    title: "Install the app",
    description:
      'Install the EarthBound for free via the monday.com marketplace or click the "Add to monday.com" button below.',
  },
  {
    title: "Add our workflow",
    description:
      "Add our workflow to any board you like, linking the column where urls are mentioned (both link and text column types are supported).",
  },
  {
    title: "You're all set",
    description:
      "Our integration will automatically start listening for mentions of URLs. When a URL is mentioned the integration will go away and audit that URL.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function GettingStarted() {
  return (
    <div className="pt-16 pb-20 px-4 sm:px-6 lg:pt-16 lg:pb-16 lg:px-8">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl tracking-tight font-extrabold sm:text-4xl">
            Getting Started
          </h2>
          <p className="mt-3 text-xlsm:mt-4">
            Follow these steps to get started with EarthBound. We will have you
            auditing in no time!
          </p>
        </div>
        <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
          {posts.map((post, index) => (
            <div key={post.title}>
              <div>
                <div className="inline-block">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-lg font-medium bg-accent-background">
                    {index + 1}
                  </span>
                </div>
              </div>
              <a href={post.href} className="block mt-4">
                <p className="text-xl font-semibold">{post.title}</p>
                <p className="mt-3 text-base ">{post.description}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
