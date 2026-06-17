// USEMETA — Product catalogue
// All products are software / digital product solutions by USEMETA (founded by Santhosh)

export const products = [
  {
    id: 1,
    name: 'FlowBuilder',
    tagline: 'Visual Workflow Automation Platform',
    description:
      'Automate your business processes with an intuitive visual builder. FlowBuilder connects your software tools, eliminates manual tasks, and delivers real-time operational insights for your team.',
    longDescription:
      'FlowBuilder is a business process automation platform that simplifies complex workflows through a drag-and-drop interface. Connect any software system, define business rules, and automate repeatable processes — from data entry to report generation — so your team can focus on high-value work.',
    category: 'Automation',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      { title: 'Workflow Canvas', subtitle: 'Define sophisticated automation flows with drag-and-drop precision.' },
      { title: 'Execution Monitoring', subtitle: 'Track each process in real time and review detailed event logs.' },
      { title: 'Operational Insights', subtitle: 'Visualize efficiency gains and automation health at a glance.' },
    ],
    price: 49,
    priceYearly: 470,
    rating: 4.9,
    reviewCount: 2847,
    badge: 'Best Seller',
    badgeColor: 'from-yellow-500 to-orange-500',
    features: [
      'Visual drag-and-drop workflow builder',
      '500+ pre-built software integrations',
      'Real-time execution monitoring',
      'Automatic error handling and retry',
      'Custom webhook triggers',
      'Advanced reporting dashboard',
    ],
    reviews: [
      { user: 'Sarah K.', avatar: 'S', rating: 5, comment: 'Completely transformed how our team operates. Saved us 30+ hours per week.', date: 'Mar 2025' },
      { user: 'James T.', avatar: 'J', rating: 5, comment: 'The error handling alone is worth the subscription price. Outstanding product.', date: 'Feb 2025' },
      { user: 'Priya M.', avatar: 'P', rating: 4, comment: 'Extremely powerful. Took a week to set up but now it runs everything automatically.', date: 'Jan 2025' },
    ],
  },
  {
    id: 2,
    name: 'CloudVault',
    tagline: 'Enterprise Cloud Storage & Security',
    description:
      'Enterprise-grade encrypted cloud storage with granular access controls, compliance-ready infrastructure, and zero-knowledge architecture for organisations that take data security seriously.',
    longDescription:
      'CloudVault redefines what enterprise cloud storage looks like. With zero-knowledge architecture, your data is encrypted before it leaves your device. Advanced data loss prevention, full audit trails, and HIPAA/SOC2 compliance make CloudVault the trusted choice for regulated industries.',
    category: 'Storage',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      { title: 'Secure Vault', subtitle: 'Manage encrypted repositories with enterprise-level access rules.' },
      { title: 'Audit Insights', subtitle: 'Review complete user activity and compliance records instantly.' },
      { title: 'Collaboration Hub', subtitle: 'Share files securely across teams while keeping control over access.' },
    ],
    price: 79,
    priceYearly: 758,
    rating: 4.8,
    reviewCount: 1923,
    badge: 'Enterprise',
    badgeColor: 'from-blue-500 to-cyan-500',
    features: [
      'Zero-knowledge encryption',
      'Unlimited storage tiers',
      'SOC2 & HIPAA compliant',
      'Granular permission management',
      'Real-time collaboration',
      'Automated backup & versioning',
    ],
    reviews: [
      { user: 'Michael B.', avatar: 'M', rating: 5, comment: 'Our compliance team finally approved a cloud solution. CloudVault made it possible.', date: 'Apr 2025' },
      { user: 'Lena W.', avatar: 'L', rating: 5, comment: 'Zero-knowledge encryption gives us peace of mind. Excellent performance too.', date: 'Mar 2025' },
      { user: 'David C.', avatar: 'D', rating: 4, comment: 'Solid product with great support. Migration was seamless.', date: 'Feb 2025' },
    ],
  },
  {
    id: 3,
    name: 'InsightBoard',
    tagline: 'Real-Time Business Intelligence Platform',
    description:
      'Turn raw data into clear, actionable dashboards. InsightBoard aggregates data from every source and delivers real-time reporting your team can act on immediately — no technical expertise required.',
    longDescription:
      'InsightBoard is a full-stack business intelligence platform that works out of the box. Connect to any data source in minutes, build interactive dashboards with drag-and-drop simplicity, and surface the metrics that matter most to your organisation.',
    category: 'Analytics',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      { title: 'Live Dashboards', subtitle: 'Build tailored dashboards with industry-focused metrics and alerts.' },
      { title: 'Data Connectors', subtitle: 'Connect sources instantly and keep the business data fresh.' },
      { title: 'Collaboration Insights', subtitle: 'Share reports and align teams around the most important outcomes.' },
    ],
    price: 59,
    priceYearly: 566,
    rating: 4.7,
    reviewCount: 3412,
    badge: 'Popular',
    badgeColor: 'from-purple-500 to-pink-500',
    features: [
      '300+ data source connectors',
      'Drag-and-drop dashboard builder',
      'Automated anomaly alerts',
      'Scheduled reports & notifications',
      'Team collaboration tools',
      'White-label export options',
    ],
    reviews: [
      { user: 'Anna R.', avatar: 'A', rating: 5, comment: 'We replaced three separate tools with InsightBoard. The reporting is outstanding.', date: 'May 2025' },
      { user: 'Tom H.', avatar: 'T', rating: 5, comment: 'Best BI tool I have used in 10 years. Clean, fast, and powerful.', date: 'Apr 2025' },
      { user: 'Chloe S.', avatar: 'C', rating: 4, comment: 'Very intuitive. Onboarded our whole team in one afternoon.', date: 'Mar 2025' },
    ],
  },
  {
    id: 4,
    name: 'SecureAuth',
    tagline: 'Identity & Access Management',
    description:
      'Enterprise authentication infrastructure for modern applications. SecureAuth provides SSO, multi-factor authentication, passwordless login, and advanced threat detection in one unified platform.',
    longDescription:
      'SecureAuth is the identity layer your applications need. From consumer-facing web apps to internal tools, SecureAuth handles authentication at any scale with sub-50ms response times. Adaptive MFA, biometric options, and risk-based access controls keep your users safe without adding friction.',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      { title: 'Identity Dashboard', subtitle: 'Control access policies and monitor login activity centrally.' },
      { title: 'MFA Flow', subtitle: 'Configure adaptive authentication journeys for every user scenario.' },
      { title: 'Threat Alerts', subtitle: 'Receive live notifications for risky sign-ins and abnormal behavior.' },
    ],
    price: 39,
    priceYearly: 374,
    rating: 4.9,
    reviewCount: 1567,
    badge: 'New',
    badgeColor: 'from-green-500 to-teal-500',
    features: [
      'Single Sign-On (SSO)',
      'Passwordless & biometric authentication',
      'Adaptive Multi-Factor Authentication',
      'Real-time threat detection & blocking',
      'SDK for 12+ programming languages',
      '99.99% uptime SLA',
    ],
    reviews: [
      { user: 'Chris P.', avatar: 'C', rating: 5, comment: 'Dropped our auth implementation time from 3 weeks to 2 days. Brilliant product.', date: 'May 2025' },
      { user: 'Nina F.', avatar: 'N', rating: 5, comment: 'The adaptive MFA is exactly what we needed. No more user complaints about friction.', date: 'Apr 2025' },
      { user: 'Omar K.', avatar: 'O', rating: 5, comment: 'Best-in-class security with developer-first APIs. Highly recommended.', date: 'Mar 2025' },
    ],
  },
  {
    id: 5,
    name: 'MessageHub',
    tagline: 'Omnichannel Communication Platform',
    description:
      'Unify all customer communication channels in one platform. MessageHub powers email, SMS, push notifications, in-app messaging, and WhatsApp at scale with reliable delivery and rich analytics.',
    longDescription:
      'MessageHub is the communication backbone for growing companies. Send millions of messages across every channel with guaranteed delivery. Smart scheduling, audience segmentation, and rich campaign analytics help you craft messages that drive real results.',
    category: 'Communication',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      { title: 'Campaign Center', subtitle: 'Launch campaigns across channels with a single coordinated workflow.' },
      { title: 'Delivery Analytics', subtitle: 'Track opens, clicks and conversions in real time.' },
      { title: 'Audience Builder', subtitle: 'Segment contacts and deliver targeted communications with precision.' },
    ],
    price: 69,
    priceYearly: 662,
    rating: 4.6,
    reviewCount: 2189,
    badge: 'Hot',
    badgeColor: 'from-red-500 to-orange-500',
    features: [
      'Email, SMS, Push & WhatsApp',
      'Audience segmentation engine',
      'Visual campaign builder',
      'A/B testing at scale',
      'Delivery rate optimisation',
      'Real-time engagement analytics',
    ],
    reviews: [
      { user: 'Lisa M.', avatar: 'L', rating: 5, comment: 'Our open rates jumped 40% after switching to MessageHub. Excellent platform.', date: 'May 2025' },
      { user: 'Ben A.', avatar: 'B', rating: 4, comment: 'Excellent deliverability. The visual campaign builder is intuitive and powerful.', date: 'Apr 2025' },
      { user: 'Sophie T.', avatar: 'S', rating: 5, comment: 'Handles our 50M monthly sends without a hitch. Rock-solid infrastructure.', date: 'Mar 2025' },
    ],
  },
  {
    id: 6,
    name: 'DevPipeline',
    tagline: 'CI/CD & Software Delivery Platform',
    description:
      'Modern continuous integration and delivery platform built for speed and reliability. DevPipeline automates your entire software delivery lifecycle from code commit to production deployment.',
    longDescription:
      'DevPipeline removes the complexity from modern software delivery. With zero-config setup for popular frameworks, intelligent test parallelisation, and one-click rollbacks, your team ships faster with confidence. Built-in security scanning, cost monitoring, and automated failure diagnosis make DevPipeline the complete delivery partner.',
    category: 'DevOps',
    image: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      { title: 'Pipeline Overview', subtitle: 'Visualise every deployment stage and release status in one place.' },
      { title: 'Test Insights', subtitle: 'See parallel execution results and performance trends fast.' },
      { title: 'Deployment Control', subtitle: 'Manage rollbacks, approvals, and environments with confidence.' },
    ],
    price: 89,
    priceYearly: 854,
    rating: 4.8,
    reviewCount: 1344,
    badge: 'Pro',
    badgeColor: 'from-indigo-500 to-blue-500',
    features: [
      'Zero-config framework detection',
      'Parallel test execution',
      'One-click production rollback',
      'Built-in security scanning',
      'Multi-cloud deployment targets',
      'Automated failure diagnosis',
    ],
    reviews: [
      { user: 'Ryan D.', avatar: 'R', rating: 5, comment: 'Cut our deployment time from 45 minutes to 8. The failure diagnosis is a lifesaver.', date: 'May 2025' },
      { user: 'Emma L.', avatar: 'E', rating: 5, comment: 'Finally a CI/CD tool that just works. Setup took 10 minutes for our monorepo.', date: 'Apr 2025' },
      { user: 'Jake S.', avatar: 'J', rating: 4, comment: 'Excellent platform. The parallel testing alone paid for itself in the first week.', date: 'Mar 2025' },
    ],
  },
];

export const categories = ['All', 'Automation', 'Storage', 'Analytics', 'Security', 'Communication', 'DevOps'];

export const getProductById = (id) => products.find((p) => p.id === Number(id));
