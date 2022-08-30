/* This example requires Tailwind CSS v2.0+ */
const navigation = {
  social: [
    {
      name: "GitHub",
      href: "https://github.com/slarsendisney/EarthBound-Site",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "DevPost",
      href: "https://devpost.com/software/earthbound-audits",
      icon: (props) => (
        <svg {...props} fill="currentColor" viewBox="0 0 280.3 242.7">
          <g id="XMLID_126_">
            <polygon
              id="XMLID_3_"
              className="fill-current text-accent-text"
              points="70.1,242.7 0,121.4 70.1,0 210.2,0 280.3,121.4 210.2,242.7 	"
            />
            <path
              id="XMLID_2_"
              fill="#FFFFFF"
              d="M132.7,195h-44V47.7h46.1c42.1,0,73.3,19.8,73.3,73.7C208.1,173.2,170.6,195,132.7,195z
		 M133.7,76.3h-15.6v90.1h14.5c30.9,0,45.1-18.1,45.1-45.1C177.8,91.3,164.9,76.3,133.7,76.3z"
            />
          </g>
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  return (
    <footer>
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className=" text-accent-text hover:text-accent-text"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; Built by Sam Larsen-Disney & Carlota Veal Baschwitz for the
          Climate Change App Challenge by monday.com.
        </p>
      </div>
    </footer>
  );
}
