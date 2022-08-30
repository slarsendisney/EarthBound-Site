## 🌳 **We're highlighting and reducing the carbon footprint of your website using monday.com.**
> **The internet is responsible for [3.7% of all global CO2 emissions.](https://www.bbc.com/future/article/20200305-why-your-internet-habits-are-not-as-clean-as-you-think#:%7E:text=The%20carbon%20footprint%20of%20our,a%20researcher%20at%20Lancaster%20University)** This is the same amount as the aviation industry. 

As tech teams, it is our responsibility to ensure the carbon footprint of the websites we create and maintain are as small as possible. Whether you a single developer holding the fort or part of a large company, understanding the carbon footprint of your website and reducing it should be easy. That's why we built **EarthBound - an automatic website auditing integration for monday.com**.

We wrote exactly 1772 lines of code during this hackathon - we're hoping this is our new lucky number. We also think this might be the only *serverless* integration submission!

![](https://ik.imagekit.io/sld/Frame_5__1__sDB9VNDYH.png?ik-sdk-version=javascript-1.4.3&updatedAt=1661199065489)

## ⚡️ Quick Links:
- [Visit the site](https://www.earthbound.site/) (We're super proud of this!)
- [Install the App](https://auth.monday.com/oauth2/authorize?client_id=e16c2c74440538cd428dedeab1e4450e&response_type=install)
- [Visit the Github Repo](https://github.com/slarsendisney/EarthBound-Site)

## 🔨 Our Team
- **Carlota Veal-Baschwitz ( The Energy Geek ⚡️ )**: Economics and Policy of Energy and the Environment Msc Student.
- **Sam Larsen-Disney ( The Tech Guy 💻 )**: Software Engineer with a Front-end Focus. 

## 🤩 What it does

![](https://ik.imagekit.io/sld/Frame_6__4__ZZreV1nL1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1661278848804)

Sometimes the best things come in small packages and a single workflow might look simple from the outside but we think you might be surprised! Its functionality can be split into three main categories: **Awareness**, **Competition** & **Remediation**.
#### 1️⃣ Awareness
We have created an effortless integration for monday.com that audits webpages your tech teams are working on. Add our workflow to your tech team's board and our integration will automatically start listening for mentions of URLs in a column you specify. When a URL is mentioned the integration will go away and audit that URL. It will identify:
- **Carbon Produced**: a carbon estimate for both cached and uncached visits to this page.
- **Green Hosting**: whether the site is hosted on a green hosting provider or not.
- **Page Weight**: the larger the page, the more data that most be transferred and the energy required.
- **Performance**: the less performant, the more energy required by the client to run the webpage.

**It does all this in under 30 seconds!** When the information is collected, it is then automatically added to the EarthBound workspace (it creates itself if you don't have one). You will receive a handy notification when the audit is ready for viewing. 

#### 2️⃣ Competition
Studies show that **environmental awareness is not enough to tackle climate change** - additional incentives are needed to create good green habits. Among those shown to be most effective is comparison and competition between peers **that's why we gave each audit a score of five** using the rating column type. This can be treated as an overall green score for that webpage. By giving each audit a score, we can drive competition between tech teams that own different parts of a website and encourage them to make their pages greener. This also provides an opportunity to companies to incentivise keeping pages green and use the audit board as a leaderboard by sorting by audit score.

#### 3️⃣ Remediation
EarthBound webpage audits don't only identify the problem, they **identify the tasks that would make the largest impact** and add them to the suggested tasks board in the EarthBound workspace. These tasks are set up and ready to be assigned to team member so that they can start tackling the problem. 

## 🧪 Research

Using our expertise and links within academia, three important research themes emerged:
1. CO2 has a very long life. This means, once emitted it takes hundreds of years to break down and therefore will remain in the atmosphere, warming the planet for hundreds of years. Once its out, its out so the focus needs to be on reducing emissions not re-absorbing them afterwards. A classic current trend among companies is to plant trees. But trees take decades to grow before beginning to absorb CO2 at any significant rate, at which point the damage is already done.
2. The impacts of climate change are unequally distributed. That means some people will witness its effects after others and often falsely believe they have ‘more time’. How to resolve this? Make it relatable. Research shows that making climate change awareness personal and tangible to the everyday actions and lives of individuals is much more likely to promote change.
3. Finally, climate change awareness does not always lead to climate change action. Sometimes a little extra nudge is required. 

Through the monday.com climate change challenge we wanted to build something which incorporated these research findings.

##💡 Inspiration
> _"Web developers already have the skills to make a green impact, they just don't know it - let's fix this!"_

When thinking about the hackathon problem statement, we wanted to refine it a little:
- **Reduce not compensate**: We wanted to create a solution that reduced our emissions. You can plant a tree to compensate for your emissions but it's always better not to emit in the first place.
- **Go beyond awareness**: It was crucial that we empowered developers to use their tech knowledge to improve the planet once they were made aware of the problem because they have the skills! They just don't know it.
- **Keep it personal**: As a web developer and energy geek, we care deeply about the web and we wanted to make this climate change hack personal.

## 🚀 How to use:
1. Install the App
2. Add our workflow to any board you like, mentioning the column where urls are mentioned (both link and text column types are supported)

## 🔧 How it works:
1. Whenever the column you have set up the integration with changes, monday.com's column change trigger fires.
2. If the project does not contain an Earthbound Workspace, the workspace is created and boards set up. User is notified of workspace creation.
3. We extract the column value and determine if it is a valid URL. If it is not valid the process stops here.
4. If this URL has already been audited, any old audits for this URL are moved to the outdated group.
4. The audit item is added to the Earthbound Audits board in the recent audits group with a status of "In progress". This is to ensure that the user has immediate feedback and understands that the audit has started.
5. If it is a valid URL we start auditing the URL by performing multiple steps in parallel: 
  - We use Google's PageSpeed Insights API to run a lighthouse performance audit.
  - We contact the Green Web Foundation to discover insights around the domain and its hosting.
6. The resultant data is then run through our algorithm to generate a score.
7. Data is combined and formatted before being added to the audit item - the item's status is then set to complete.
8. Any resultant tasks are then added to the relevant suggested tasks board. 
9. An update is then added to the audit item linking to the created tasks.

## ⭐️ monday.com features used:
Integration Creation:

- monday.com built-in integration triggers
- Workflow blocks
- OAuth Scopes

API:
- Workspace creation
- Board Creation and Manipulation
- Notification Creation
- Update Creation
- An abundance of column type
- Bulk update column values
- Item creation
- Board linking

## 💻 How we built it
The application was built with:
- **mondays APIs** for all things monday. 
- **ReactJS** as the de-facto JavaScript library for building user interfaces
- **NextJS** as our blazing fast React framework for performance, scalability, security and accessibility
- **Vercel Serverless Functions** to bring an entire backend to EarthBound - without managing a backend.
- **Firebase** as our database.
- **TailwindCSS** to leverage the benefits and speed of the utility first CSS framework .

## 💸 Monetisation Strategy
There isn't one! We believe this information should be available to all tech teams, regardless of size or financial situation. The tool is free to run and it will always be free to those who want to use it.

##💰 Value to monday.com
Using our integration monday.com users can understand the performance and carbon impacts of their webpages without having to leave the monday.com ecosystem.

## Challenges we ran into
- **You have sixty seconds, your time starts now**: When we started working on this project, we were using puppeteer and lighthouse to perform our audits on a node server. Even with 4GB of ram, this server could not perform audits fast enough to provide the data back to monday using the `short-lived API Key`. We had to go faster! Luckily, we stumbled upon the Google PageSpeedInsights API which worked as a drop in replacement and only took 20 seconds to run. We managed to get the total end-to-end execution time down to 26 seconds by running board and workspace creation in parallel with the audit.
- **Feedback is everything**: 26 seconds is still a long time to wait without feedback - when testing this tool we were asking ourselves "is it running?!", never a good sign when you're the developers! We ended up changing the integration flow so that it notifies the user about the audit immediately. It also adds the audit to the board and makes use of the colourful status column type to show that it is currently being worked on.
- **Duplication**: One interesting challenge was what we should do in the case you request the same url twice? We worried that the audit board would get busy very quickly if we had duplicates. However if we removed old audits, you would not have a system of record. Our solution was to create two groups on the board - "Recent Audits" and "Outdated Audits". When a URL is audited, it checks the recent audits group for any existing audits for that url and moves them to the outdated group for your reference. 

## Accomplishments that we're proud of

Carlota - _"I'm proud that we were able to go beyond awareness. Our integration not only show you what problems exist but how to solve them. "_

Sam - _"We joined this hackathon a little late and only started working on August 7th. But we believed in our idea and I am so proud to see it achieving everything we wanted to."_

## ➡️ What's next for EarthBound Audits
The next thing we would like to create is a recipe that works on a schedule - so that urls can be audited repeatedly. With this information we could start to show you how your webpages carbon emissions have changed over time. We could use this trend over time to notify you when a webpage suddenly gets worse so that you can quickly remedy it.

## 💪 Extra Submission details

#### ✅ Submitted to the monday.com App Marketplace
![We submitted our application to the marketplace on the 24th of August.](https://ik.imagekit.io/sld/Frame_12__1__hNZ-xBrZp.png?ik-sdk-version=javascript-1.4.3&updatedAt=1661334508359)

## ✌️ Feedback for monday.com
We managed to achieve exactly what we wanted to during this hack, however a few API features would have made this easier for us:
1. **Create subitems in a board without existing sub items** - As the boards we use are programatically created, they don't have sub items and the `NoSubitemsColumnInThisBoard` error was not one we could solve. We had to switch to using updates instead which was a backup plan!
2. Triple escaping characters in my graphQL queries made our code look messy.