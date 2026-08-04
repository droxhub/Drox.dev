/**
 * Central Content Management File
 *
 * Manage all website content from this single file.
 * Update any text, links, or data here and it will reflect across the entire website.
 */

// ============================================
// SITE METADATA & BRANDING
// ============================================
export const siteMetadata = {
	name: "DROX",
	fullName: "DRO X",
	tagline: "Building exceptional digital experiences and web solutions.",
	description:
		"Building exceptional digital experiences and web solutions. We transform bold ideas into powerful digital realities.",
	logo: {
		text: "DRO",
		highlight: "X",
	},
	badge: {
		text: "DROX - Your TECH Partner",
	},
};

// ============================================
// NAVIGATION
// ============================================
export const navigation = {
	items: [
		{ label: "Home", href: "/" },
		{ label: "Services", href: "/services" },
		{ label: "Work", href: "/work" },
		{ label: "Pricing", href: "/pricing" },
		{ label: "About", href: "/about" },
		{ label: "Contact", href: "/contact" },
	],
	contactButton: {
		text: "Book a call",
		href: "/contact",
	},
};

// ============================================
// HOMEPAGE CONTENT
// ============================================
export const homepage = {
	hero: {
		title: {
			// Split so the desktop line break is deliberate. On mobile the two
			// lines flow together and wrap naturally.
			line1: "Custom software that runs",
			line2: "your",
			// Rendered with the animated ColourfulText treatment — keep it short,
			// it renders one animated span per character.
			highlight: "operations",
		},
		// Echoes the founding observation in the Company Profile (p.7): businesses
		// "forced to adapt their workflows to generic software".
		subtitle:
			"Built around how your business actually works — not around a template.",
		ctaButtons: [
			{ text: "Book a scoping call", href: "/contact" },
			{ text: "See our work", href: "/work" },
		],
	},
	closingCta: {
		title: "The first step is a conversation.",
		description:
			"Whether the requirement is a defined project, a long-term product, or a technology decision that needs a second opinion, we assess it properly before anything is committed.",
		primary: { text: "Book a scoping call", href: "/contact" },
		secondary: { text: "Message us on WhatsApp", href: "" }, // href built from contactPage
		reassurance: "We reply within one business day.",
		// The low-commitment path, for readers who reached the bottom of the page
		// but aren't ready to scope a whole build.
		lowCommitment: {
			lead: "Not ready to commit to a full build?",
			linkText: "Start with a two-week Discovery Sprint",
			href: "/pricing#discovery-sprint",
		},
	},
	features: {
		title: "Features",
	},
	lastSection: {
		title: {
			part1: "Last",
			part2: "but",
			part3: "not",
			part4: "least.",
		},
		description: "Building exceptional digital experiences.",
	},
};

// ============================================
// ABOUT PAGE CONTENT
// ============================================
export const aboutPage = {
	hero: {
		title: {
			part1: "Building",
			part2: "Tomorrow's",
			part3: "Digital",
			part4: "Experiences",
			part5: "Today",
		},
		subtitle:
			"We are passionate creators and strategic thinkers dedicated to turning ambitious visions into extraordinary digital realities.",
	},
	mission: {
		title: "Our Mission",
		paragraphs: [
			"Our mission is crystal clear: to empower smart brands with exceptional digital solutions that drive growth and create meaningful connections. We believe technology should serve people, not the other way around.",
			"Every line of code we write, every design we craft, and every strategy we develop is centered around one goal—your success. We're not just service providers; we're your partners in building a digital future that matters.",
		],
	},
	vision: {
		title: "Our Vision",
		paragraphs: [
			"To be the catalyst that transforms ideas into digital masterpieces. We envision a world where every brand has the tools, insights, and support needed to create unforgettable online experiences that resonate deeply with their audience.",
			"Through innovation, creativity, and unwavering dedication, we strive to set new standards in digital excellence and help our clients achieve remarkable success in their digital journey.",
		],
	},
	values: {
		title: "What Sets Us Apart",
		subtitle:
			"Our unique combination of expertise, passion, and commitment makes us the ideal choice for your digital journey",
		items: [
			{
				title: "Innovation First",
				description:
					"We push boundaries and explore cutting-edge technologies to deliver solutions that set you apart.",
				gradient: "from-violet-400 to-purple-600",
			},
			{
				title: "Client-Centric",
				description:
					"Your success is our priority. We build lasting partnerships through transparent communication.",
				gradient: "from-pink-400 to-rose-600",
			},
			{
				title: "Technical Excellence",
				description:
					"Clean, scalable code and best practices ensure your project stands the test of time.",
				gradient: "from-blue-400 to-cyan-600",
			},
			{
				title: "Design-Driven",
				description:
					"Beautiful, intuitive interfaces that create memorable user experiences and drive conversions.",
				gradient: "from-yellow-400 to-orange-600",
			},
			{
				title: "Results-Oriented",
				description:
					"Every project is built with clear objectives and measurable outcomes in mind.",
				gradient: "from-green-400 to-emerald-600",
			},
			{
				title: "Collaborative Spirit",
				description:
					"We work as an extension of your team, bringing expertise and enthusiasm to every project.",
				gradient: "from-cyan-400 to-blue-600",
			},
		],
	},
	story: {
		title: {
			part1: "From Vision to Reality:",
			part2: "Our Journey",
		},
		paragraphs: [
			"At DROX, we've built more than a company—we've cultivated a culture where creativity meets craftsmanship, and every project is infused with collaboration, passion, and purpose.",
			"Our team is the heartbeat of everything we do. It's not just about working together, but growing together—facing challenges head-on, celebrating victories big and small, and evolving as a unified force. We believe that the best results come from teams that are genuinely invested in each other's success.",
			"DROX is more than a workplace; it's a journey powered by ambition, unity, and unwavering dedication. Every client we serve, every project we complete, and every relationship we build is a testament to our commitment to excellence and our belief in the transformative power of great digital experiences.",
		],
	},
	milestones: [
		{
			year: "2026",
			title: "Founded",
			description:
				"Drox Dev is founded in Kozhikode, Kerala, by four equal founders",
		},
		{
			year: "2026",
			title: "First Platforms Delivered",
			description:
				"Alfa Event Management System and Droxlink go live for their first users",
		},
		{
			year: "2026",
			title: "Building Our Own Products",
			description:
				"Extending beyond client software into our own products and intelligent platforms",
		},
	],
	cta: {
		title: "Ready to Start Your Journey?",
		description:
			"Let's transform your vision into a digital reality. Get in touch and discover how we can elevate your brand.",
		buttonText: "Let's Talk",
		buttonHref: "/contact",
	},
};

// ============================================
// SELECTED WORK — Company Profile pp.19-20
// ============================================
export const caseStudies = [
	{
		slug: "alfa-events",
		name: "Alfa Event Management System",
		category: "Event Operations Platform",
		client: "Alfa Events, Malappuram",
		liveUrl: "https://alfaeventsitebooking.cloud",
		image: "/projects/alfa1.webp",
		imageAlt:
			"Alfa Event Management System — staff and event scheduling app built for Alfa Events, shown on mobile",
		summary:
			"Replaced manual coordination across concurrent events with one system for scheduling, staff assignment, work tracking and finance.",
		challenge:
			"Alfa ran weddings and events on manual workflows, struggling to coordinate catering staff across multiple events taking place at the same time. Availability changed daily, and there was no central view of who was booked where — so events could run short-handed with no warning.",
		solution:
			"A centralised platform that digitises event operations end to end: scheduling, staff assignment, work tracking, finance and coordination. Alfa list their events; staff browse available shifts and book themselves onto them, which removed the phone-and-message coordination layer entirely.",
		modules: [
			"Event Management",
			"Staff Management",
			"Finance Management",
			"Scheduling & Assignment",
			"Work Tracking",
		],
		stack: ["React.js", "Node.js", "MongoDB"],
		outcomes: [
			{ value: "100+", label: "Events managed" },
			{ value: "200+", label: "Staff managed" },
			{ value: "5", label: "Core modules" },
		],
		testimonials: [
			{
				quote:
					"We struggled to manage catering staff across multiple events at the same time. After sharing the issue with the team, they built a web app where we can list events and staff can view and book available jobs. It completely streamlined our workflow and turned our operations into a smart, organized system.",
				name: "Imthiyas Ahamed",
				role: "Manager, Alfa Events",
				avatar: "/testimonials/imthiyas.webp",
			},
			{
				quote:
					"As founders, we wanted faster and more scalable operations. The team delivered a system that streamlined our workflow, improved coordination, and accelerated our growth significantly.",
				name: "Sainul Abid",
				role: "Founder & MD, Alfa Events",
				avatar: "/testimonials/alfa.webp",
			},
		],
		// TODO: add the delivery timeline — "X weeks from first conversation to
		// first live event" is the number enterprise buyers ask for next.
	},
];

// ============================================
// LEADERSHIP — Company Profile p.24, near-verbatim
// ============================================
export const founders = {
	title: "Ownership at every level",
	subtitle:
		"Four equal founders who stay close to the work. Direction, delivery, architecture and engineering each have a named owner — so decisions sit with the person accountable for the outcome.",
	/**
	 * `shortRole` is what the card shows — one or two plain words naming the
	 * area this founder owns. It replaced an `owns` field whose values were
	 * abstractions ("Ownership", "Accountability", "Execution") that told a
	 * visitor nothing about what the person actually does.
	 *
	 * `role` is the formal title, kept for the image alt text and shown when a
	 * card is expanded.
	 */
	people: [
		{
			name: "Muhammad Ziyad M",
			role: "Chief Executive Officer",
			shortRole: "CEO",
			photo: "/founders/ziyad-cutout.webp",
			initials: "MZ",
			responsibility:
				"Company direction, client partnerships and long-term strategy. The person setting that direction stays involved in the engagement rather than handing it on.",
		},
		{
			name: "Abdul Rahib KP",
			role: "Chief Operating Officer",
			shortRole: "Operations",
			photo: "/founders/rahib-cutout.webp",
			initials: "AR",
			responsibility:
				"Requirement analysis, sprint and delivery planning, team coordination. Scope is agreed realistically and progress stays visible from first conversation to completion.",
		},
		{
			name: "Sinan Thadathil",
			role: "Chief Technology Officer",
			shortRole: "Architecture",
			// TODO: no photo on file — add public/founders/sinan.webp, then run it
			// through the subject-lift step described in docs/STATUS.md to produce
			// sinan-cutout.webp and set it here.
			// Renders as initials until then rather than a stock silhouette.
			photo: null as string | null,
			initials: "ST",
			responsibility:
				"Architecture, technology selection and engineering standards, set deliberately rather than by default. Systems are designed for the demands they will carry later.",
		},
		{
			name: "Ajnas TK",
			role: "Head of Engineering",
			shortRole: "Engineering",
			photo: "/founders/ajnas-cutout.webp",
			initials: "AT",
			responsibility:
				"Feature delivery, module ownership and build quality. Approved plans become working software here — accountable for what ships, not only for what was specified.",
		},
	],
};

// ============================================
// ENGAGEMENT MODELS — Company Profile p.17
// ============================================
export const engagementModels = {
	/**
	 * This page is reached from a nav item labelled "Pricing", so it has to
	 * answer the price question in the first screen — even though the honest
	 * answer is "it depends, and here's why". Leading with engagement models
	 * instead made the nav label a promise the page didn't keep.
	 */
	title: "What it costs to work with us",
	// Shown directly under the h1, before anything else.
	subtitle:
		"We don't publish a rate card, because a number without a scope behind it is meaningless. Here's what we can tell you upfront.",
	modelsTitle: "Five ways to engage",
	modelsSubtitle:
		"From a fixed-scope project to a long-term product partnership. Every engagement starts the same way: understanding the business before proposing a solution.",
	models: [
		{
			name: "Fixed Price Project",
			what: "A defined scope, timeline and cost, agreed upfront.",
			bestFor: "Well-defined projects",
		},
		{
			name: "Dedicated Development Team",
			what: "A dedicated team working as a long-term extension of your business.",
			bestFor: "Ongoing product work",
		},
		{
			name: "Monthly Technology Partner",
			what: "Continuous development and support on a flexible monthly basis.",
			bestFor: "Continuous support",
		},
		{
			name: "Product Development Partnership",
			what: "We build, launch and grow a product together as partners.",
			bestFor: "Long-term products",
		},
		{
			name: "Technical Consulting",
			what: "Expert guidance on architecture, technology and strategy.",
			bestFor: "Strategy & advisory",
		},
	],
	// The three commitments we can make before knowing scope. These are what a
	// buyer clicking "Pricing" is really trying to find out.
	commitments: [
		{
			title: "A written proposal first",
			detail:
				"Scope, deliverables, timeline, price and payment schedule — agreed in writing before any work starts.",
		},
		{
			title: "No surprise invoices",
			detail:
				"Work outside the agreed scope is quoted separately and approved before it begins. If a change affects the timeline, we say so at the same time as the price.",
		},
		{
			title: "You can stop",
			detail:
				"30 days' written notice, either side. You pay for work completed; we hand over all source, credentials and documentation. No exit fee.",
		},
	],
	closingNote:
		"Tell us what you're trying to build and you'll get a written proposal with scope, timeline and cost before anything is committed.",
};

// ============================================
// DISCOVERY SPRINT — the low-commitment entry point
// ============================================
/**
 * A buyer choosing a firm founded this year over an established one is taking a
 * personal risk, and nothing else on the site reduces it. This turns a large,
 * irreversible decision into a small, reversible one.
 *
 * Deliberately written without a number: the site's stated position is that it
 * doesn't publish a rate card, and "fixed fee, agreed before it starts" is the
 * commitment that actually removes the risk. Add `fee` here if that changes.
 */
export const discoverySprint = {
	badge: "Start small",
	title: "Start with a Discovery Sprint",
	subtitle:
		"Two weeks, a fixed fee agreed in writing before it begins, and you own everything it produces — whether or not you build with us afterwards.",
	intro:
		"Most projects go wrong before a line of code is written, in the gap between what was asked for and what was understood. A Discovery Sprint closes that gap first, and prices the build honestly once it's closed.",
	deliverables: [
		{
			title: "Requirement specification",
			detail:
				"What the system has to do, written down and agreed — including the workflows we found that you didn't mention.",
		},
		{
			title: "Solution architecture",
			detail:
				"How it will be built, which technologies it uses and why, and what it will cost to run.",
		},
		{
			title: "Clickable prototype",
			detail:
				"The core screens as an interactive prototype, so your team reacts to something real rather than to a document.",
		},
		{
			title: "Delivery plan and fixed-price estimate",
			detail:
				"Sequenced milestones with a fixed price for the build, so the next decision is made with a number in front of you.",
		},
	],
	terms: [
		"The fee is fixed and agreed in writing before the sprint starts.",
		"You own the output outright — specification, architecture, designs and prototype.",
		"There is no obligation to continue. If you take the output to another firm, that is yours to do.",
	],
	cta: { text: "Ask about a Discovery Sprint", href: "/contact" },
};

// ============================================
// ENGINEERING PROCESS — Company Profile pp.15, 26
// ============================================
/**
 * One source for the seven stages, consumed by the compact homepage section
 * (`components/HowWeWork.tsx`) and the expanded accordion on `/services`.
 * They were previously only defined inside the services page, so a homepage
 * version would have been a second copy free to drift.
 *
 * `key` selects the icon in each consumer; icons are components and can't live
 * in a config module.
 */
export const engineeringProcess = {
	homepage: {
		title: "What actually happens after you get in touch",
		subtitle:
			"Seven stages from first conversation to long-term support. Each one is agreed before the next begins, so there is never a question about where a project stands.",
	},
	services: {
		title: "Seven stages, from first conversation to long-term support",
		// The old "Select a stage to read what happens in it" described an
		// accordion that no longer exists — the stages now open on hover as well
		// as on tap, so an instruction would be both stale and unnecessary.
		subtitle:
			"A structured, transparent process designed to reduce risk and deliver predictable results — each stage agreed before the next one begins.",
	},
	steps: [
		{
			id: 1,
			key: "discovery",
			title: "Discovery",
			description:
				"Requirements, stakeholders, and how the business actually works — before any technology is recommended.",
			color: "from-violet-500 to-purple-600",
		},
		{
			id: 2,
			key: "strategy",
			title: "Solution Strategy",
			description:
				"Architecture, technology selection and a sequenced roadmap, chosen deliberately rather than by default.",
			color: "from-blue-500 to-cyan-600",
		},
		{
			id: 3,
			key: "design",
			title: "UI / UX Design",
			description:
				"Journey mapping, interactive prototypes and interface design — agreed before engineering starts.",
			color: "from-pink-500 to-rose-600",
		},
		{
			id: 4,
			key: "engineering",
			title: "Engineering",
			description:
				"Sprint-based development, integrations and review. Work is planned and tracked in sprints, so progress stays visible throughout.",
			color: "from-indigo-500 to-violet-600",
		},
		{
			id: 5,
			key: "qa",
			title: "Quality Assurance",
			description:
				"Testing and security review throughout the build, not only in the week before launch.",
			color: "from-green-500 to-emerald-600",
		},
		{
			id: 6,
			key: "deployment",
			title: "Deployment",
			description:
				"Production launch, configuration and performance validation, with handover of all source, credentials and documentation.",
			color: "from-amber-500 to-orange-600",
		},
		{
			id: 7,
			key: "improvement",
			title: "Continuous Improvement",
			description:
				"Monitoring, enhancements and support after launch. We measure success by long-term growth, not by project completion.",
			color: "from-cyan-500 to-blue-600",
		},
	],
} as const;

// ============================================
// BUSINESS CHALLENGES — Company Profile p.12
// ============================================
export const businessChallenges = {
	title: "The problems we get called about",
	subtitle:
		"As businesses grow, the same operational problems show up. We start every engagement by understanding which of these you actually have.",
	groups: [
		{
			name: "Operational",
			items: [
				"Manual and repetitive processes",
				"Disconnected software systems",
				"No centralised business data",
				"Poor workflow visibility",
				"Limited reporting and analytics",
			],
		},
		{
			name: "Customer Experience",
			items: [
				"Outdated websites and poor mobile experiences",
				"Slow digital services",
				"Complicated customer journeys",
				"Low conversion rates",
				"Limited self-service capabilities",
			],
		},
		{
			name: "Growth",
			items: [
				"Software that cannot scale",
				"Legacy systems limiting innovation",
				"Lack of automation",
				"Difficult third-party integrations",
				"Rising operational costs",
			],
		},
	],
};

// ============================================
// SERVICES PAGE CONTENT
// ============================================
export const servicesPage = {
	hero: {
		title: {
			part1: "Our",
			part2: "Services",
		},
		subtitle:
			"Comprehensive digital solutions tailored to your business needs. From concept to launch, we're with you every step of the way.",
	},
	services: {
		title: "What We Offer",
		subtitle:
			"A full spectrum of digital services to help your business thrive in the digital age",
		items: [
			{
				title: "Web Development",
				description:
					"Custom web applications built with modern technologies. From responsive websites to complex web platforms, we deliver scalable solutions that perform.",
				gradient: "from-violet-400 to-purple-600",
				features: [
					"React & Next.js Development",
					"Full-Stack Solutions",
					"API Integration",
					"Performance Optimization",
				],
			},
			{
				title: "Mobile App Development",
				description:
					"Native and cross-platform mobile applications for iOS and Android. We create intuitive, high-performance apps that users love.",
				gradient: "from-blue-400 to-cyan-600",
				features: [
					"iOS & Android Apps",
					"React Native Development",
					"UI/UX Design",
					"App Store Optimization",
				],
			},
			{
				title: "UI/UX Design",
				description:
					"Beautiful, user-centered designs that combine aesthetics with functionality. We create interfaces that engage users and drive conversions.",
				gradient: "from-pink-400 to-rose-600",
				features: [
					"User Research",
					"Wireframing & Prototyping",
					"Visual Design",
					"Design Systems",
				],
			},
			{
				title: "E-Commerce Solutions",
				description:
					"Complete e-commerce platforms that drive sales. From product catalogs to payment integration, we build online stores that convert.",
				gradient: "from-yellow-400 to-orange-600",
				features: [
					"Online Store Development",
					"Payment Gateway Integration",
					"Inventory Management",
					"Analytics & Reporting",
				],
			},
			{
				title: "Digital Marketing",
				description:
					"Data-driven marketing strategies that grow your business. We help you reach the right audience and maximize your ROI.",
				gradient: "from-green-400 to-emerald-600",
				features: [
					"SEO & SEM",
					"Social Media Marketing",
					"Content Strategy",
					"Analytics & Insights",
				],
			},
			{
				title: "Maintenance & Support",
				description:
					"Ongoing support and maintenance to keep your digital assets running smoothly. We ensure your systems stay updated and secure.",
				gradient: "from-cyan-400 to-blue-600",
				features: [
					"Performance Monitoring",
					"Security Updates",
					"Bug Resolution",
					"Technical Support",
				],
			},
		],
	},
	process: {
		title: {
			part1: "Our",
			part2: "Process",
		},
		subtitle: "A proven methodology that ensures successful project delivery",
		steps: [
			{
				title: "Discovery",
				description:
					"We start by understanding your business, goals, and challenges to create a tailored strategy.",
				gradient: "from-violet-400 to-purple-600",
			},
			{
				title: "Planning",
				description:
					"Our team designs a comprehensive roadmap with clear milestones and deliverables.",
				gradient: "from-blue-400 to-cyan-600",
			},
			{
				title: "Development",
				description:
					"We build your solution using best practices, ensuring quality and scalability.",
				gradient: "from-pink-400 to-rose-600",
			},
			{
				title: "Testing & Launch",
				description:
					"Rigorous testing ensures everything works perfectly before we launch your project.",
				gradient: "from-green-400 to-emerald-600",
			},
			{
				title: "Optimization",
				description:
					"We continuously monitor and optimize to ensure peak performance and results.",
				gradient: "from-yellow-400 to-orange-600",
			},
		],
	},
	stats: {
		title: "Why Choose DROX?",
		subtitle: "What sets us apart in delivering exceptional digital solutions",
		items: [
			{
				value: "26+",
				label: "Projects Delivered",
				description:
					"Projects shipped by our team across web, mobile, AI, and cloud",
			},
			{
				value: "9+",
				label: "Years Combined Experience",
				description:
					"Engineering depth across modern web, mobile, AI, and cloud technologies",
			},
			{
				value: "50+",
				label: "Technologies",
				description:
					"We select the right tools for each project instead of forcing one stack",
			},
		],
	},
	cta: {
		title: "Ready to Get Started?",
		description:
			"Let's discuss how we can help transform your digital presence and achieve your business goals.",
		buttonText: "Get in Touch",
		buttonHref: "/contact",
	},
};

// ============================================
// FAQ — also emitted as FAQPage structured data from app/page.tsx,
// so the accordion and the schema can never drift apart.
// ============================================
/**
 * The questions that actually block a deal, not the ones that are easy to
 * answer. Ownership, exit terms and who writes the code are asked in every
 * serious engagement — the previous set answered none of them.
 */
export const faqContent = [
	{
		question: "What does a custom build typically cost?",
		answer:
			"It depends entirely on scope, so we don't publish a rate card — a number without a scope behind it is meaningless. What we can promise is a written proposal with scope, timeline and cost before anything is committed, and no invoice for work you didn't agree to. Tell us the problem and we'll tell you what solving it takes.",
	},
	{
		question: "Can we start with something smaller than a full build?",
		answer:
			"Yes — that is what our Discovery Sprint is for. Two weeks, a fixed fee agreed in writing before it starts, and at the end you own the requirement specification, the solution architecture, a clickable prototype and a fixed-price estimate for the build. If you decide not to continue, you keep all of it and we part ways. It turns a large decision into a small one, which is a reasonable thing to ask of a firm you haven't worked with before.",
	},
	{
		question: "Who owns the code and the intellectual property?",
		answer:
			"You do. On full payment, all custom code, designs and documentation produced for your project transfer to you outright. Two exceptions, stated upfront in every proposal: third-party open-source components stay under their own licences, and any pre-existing Drox Dev tooling used in your build stays ours but is licensed to you perpetually and royalty-free.",
	},
	{
		question: "Who actually writes the code? Is any of it subcontracted?",
		answer:
			"The four founders and our own engineers. Architecture and engineering standards sit with our CTO, delivery with our COO, and feature quality with our Head of Engineering — all named on our About page. Nothing is passed to an agency or a freelancer marketplace, and the person who scopes your project stays on it.",
	},
	{
		question: "How long does a project take?",
		answer:
			"A defined business platform is typically 6–12 weeks from first conversation to launch; smaller internal tools are faster. We work in sprints with visible progress throughout, and where a change affects the timeline we tell you at the same time as the price — not afterwards.",
	},
	{
		question: "What happens if we need to stop, or it goes wrong?",
		answer:
			"Either side can end an engagement with 30 days' written notice. You pay for work completed and costs already committed; we hand over all deliverables, source code, credentials and documentation. There is no exit fee, and we don't hold work hostage. We also fix defects reported within 30 days of delivery at no charge.",
	},
	{
		question: "Will you sign an NDA?",
		answer:
			"Yes. We'll sign yours or provide ours before receiving any confidential material. We also won't name you as a client or publish a case study about your project without your written consent.",
	},
	{
		question: "What happens after launch?",
		answer:
			"Launch is a stage in our process, not the end of it. Monitoring, security updates, bug resolution and feature enhancements are available under a monthly technology-partner retainer. We measure success by whether your system still holds up in three years, not by whether we shipped on a Friday.",
	},
	{
		question: "Do you work with small businesses, or only larger companies?",
		answer:
			"Both. Our work spans startups, small and mid-sized businesses and growing enterprises. What matters more than size is whether there's a real operational problem worth solving with software — if there isn't, we'll say so.",
	},
];

// ============================================
// CONTACT PAGE CONTENT
// ============================================
export const contactPage = {
	hero: {
		title: {
			part1: "Get in",
			part2: "Touch",
		},
		subtitle:
			"Have a project in mind? Let's discuss how we can bring your vision to life. We're here to help.",
	},
	contactInfo: {
		email: {
			address: "hello@droxdev.com",
			link: "mailto:hello@droxdev.com",
		},
		phone: {
			number: "+91 9946 642 643",
			display: "+91 9946 642 643",
			link: "tel:+91 9946 642 643",
			whatsapp: "919946642643", // For WhatsApp (no + or spaces)
		},
		location: {
			address: "Hilite Business Park, Kozhikode, Kerala, India",
			// Was "#" — a location card that looked clickable and went nowhere.
			link: "https://www.google.com/maps/search/?api=1&query=Hilite+Business+Park+Kozhikode+Kerala",
		},
	},
	form: {
		title: {
			part1: "Send us a",
			part2: "Message",
		},
		subtitle:
			"Fill out the form below and we'll get back to you as soon as possible",
		fields: {
			name: {
				label: "Name",
				// No placeholder. It read "Your name", which is exactly what the
				// label above the field already says — grey text repeating the label
				// is noise, and it makes an empty field look filled in.
			},
			email: {
				label: "Email",
				placeholder: "your.email@example.com",
			},
			message: {
				label: "Message",
				// Was a worked example lifted almost verbatim from the Alfa Events
				// case study — which quietly told anyone without an event-scheduling
				// problem that this form wasn't for them, and filled two lines of the
				// field doing it. The label already asks the question; a placeholder's
				// job here is to say how much detail is expected, which is the thing
				// that actually stops people starting.
				placeholder:
					"A few lines is plenty — what's not working, and what you'd like instead.",
			},
		},
		submitButton: {
			text: "Send enquiry via WhatsApp",
			loadingText: "Opening WhatsApp…",
		},
	},
	social: {
		title: "Connect With Us",
		subtitle:
			"Follow us on social media to stay updated with our latest projects and insights",
		links: [
			{
				name: "GitHub",
				url: "https://github.com/droxhub",
				gradient: "from-gray-400 to-gray-600",
			},
			{
				name: "Whatsapp",
				url: "https://wa.me/919946642643",
				gradient: "from-blue-400 to-blue-600",
			},
			{
				name: "LinkedIn",
				url: "https://www.linkedin.com/company/drox-dev/?viewAsMember=true",
				gradient: "from-blue-500 to-blue-700",
			},
			{
				name: "Instagram",
				url: "https://instagram.com/drox.dev",
				gradient: "from-pink-400 to-purple-600",
			},
		],
	},
	officeHours: {
		title: "Office Hours",
		hours: [
			{
				day: "Monday - Friday",
				time: "9:00 AM - 6:00 PM",
			},
			{
				day: "Saturday",
				time: "10:00 AM - 4:00 PM",
			},
			{
				day: "Sunday",
				time: "Closed",
			},
		],
	},
	responseTime: {
		title: "Response Time",
		description:
			"We typically respond to inquiries within 24 hours. For urgent matters, please call us directly or use our priority support channel.",
		time: "24 hours",
	},
};

// ============================================
// FOOTER CONTENT
// ============================================
export const footer = {
	copyright: {
		text: `© ${new Date().getFullYear()} DROX. All rights reserved.`,
	},
};

// ============================================
// SOCIAL MEDIA LINKS
// ============================================
export const socialLinks = {
	github: "https://github.com",
	twitter: "https://twitter.com",
	linkedin: "https://linkedin.com",
	instagram: "https://instagram.com",
	discord: "#",
	sponsor: "#",
};

// ============================================
// EXPORT ALL CONTENT
// ============================================
export const websiteContent = {
	siteMetadata,
	navigation,
	homepage,
	aboutPage,
	servicesPage,
	contactPage,
	footer,
	socialLinks,
};

export type WebsiteContent = typeof websiteContent;
