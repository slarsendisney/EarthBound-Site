/* This example requires Tailwind CSS v2.0+ */
import { SparklesIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'

const features = [
  {
    name: 'Automatic Auditing',
    description:
      "Simply add our integration and we will monitor webpage performance, pageweight, hosting and carbon footprint.",
    icon: SparklesIcon,
  },
  {
    name: 'Comparison & Judgement',
    description:
      'Every webpage is given a unique audit score to help you understand how it compares to other webpages and to help create competition.',
    icon: ScaleIcon,
  },
  {
    name: 'Follow Up & Action Items',
    description:
      'Every audit is followed up with action items to help you understand the biggest changes you could make to help improve your score.',
    icon: LightningBoltIcon,
  },
]

export default function Example() {
  return (
    <div className="py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">A better way to send money.</h2>
        <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {features.map((feature) => (
            <div key={feature.name}>
              <dt>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent-background text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mt-5 text-lg leading-6 font-medium text-accent-text">{feature.name}</p>
              </dt>
              <dd className="mt-2 text-base">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
