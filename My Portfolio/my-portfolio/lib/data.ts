export const meta = {
  name:     "Rushikesh Bhatjire",
  role:     "Cloud & Infrastructure Engineer",
  location: "Nashik, Maharashtra",
  email:    "rushikeshbhatjire@gmail.com",
  phone:    "+91-9022081551",
  linkedin: "linkedin.com/in/rushikeshbhatjire",
}

export const experience = [
  {
    id: "01",
    period: "Jan 2026 – Present",
    company: "Leapswitch Networks Pvt Ltd",
    title: "Cloud & Infrastructure Engineer",
    tags: ["OpenStack", "KVM", "Linux", "DNS", "Data Center", "HostBill"],
    description: "Manage IaaS/PaaS private cloud on OpenStack for production workloads. Resolve L2/L3 incidents across cloud, OS, networking, and database layers. Handle bare-metal provisioning and contribute to CloudPe v2 cluster architecture.",
    current: true,
  },
  {
    id: "02",
    period: "Apr 2025 – Dec 2025",
    company: "Sequretek IT Solutions Ltd",
    title: "Associate Consultant",
    tags: ["BigFix", "Patch Management", "RHEL", "Bash", "Python", "Compliance"],
    description: "Critical Linux patch management for Axis Bank across 9000+ servers. Maintained 100% patch compliance, resolved 500+ vulnerabilities monthly, and reduced manual tasks by 70% through scripting and automation.",
    current: false,
  },
  {
    id: "03",
    period: "Jan 2023 – Mar 2025",
    company: "ESDS Software Solution Ltd",
    title: "Technical Associate",
    tags: ["Linux", "LDAP", "Ansible", "LVM", "Bash", "Python"],
    description: "Administered Linux environments achieving 99.9% uptime across 200+ servers. Built 25+ automation scripts saving 20 hours weekly. Optimized filesystems and LVM, reducing storage costs by 30%.",
    current: false,
  },
]

export const skills = [
  {
    category: "Cloud & Virtualization",
    span: "lg:col-span-2",
    items: ["OpenStack", "Private Cloud (IaaS/PaaS)", "KVM", "Bare-Metal Provisioning"],
  },
  {
    category: "Linux & Systems",
    span: "col-span-1",
    items: ["RHEL", "CentOS", "Ubuntu", "SUSE", "Performance Tuning", "OS Hardening"],
  },
  {
    category: "Networking & Security",
    span: "col-span-1",
    items: ["TCP/IP", "DNS", "Firewalls", "NAT", "VLANs", "Load Balancing", "SSL/TLS"],
  },
  {
    category: "Automation & Scripting",
    span: "lg:col-span-2",
    items: ["Bash", "Python", "Ansible", "Shell Scripting"],
  },
  {
    category: "Storage & Filesystems",
    span: "col-span-1",
    items: ["LVM", "RAID", "ext4", "XFS", "Btrfs", "Block Storage"],
  },
  {
    category: "Operations & Reliability",
    span: "lg:col-span-2",
    items: ["Incident Management", "RCA", "SLA", "Monitoring", "Data Center Ops"],
  },
  {
    category: "Compliance & Security",
    span: "col-span-1",
    items: ["Patch Management", "Vulnerability Management", "Access Control", "Auditing"],
  },
  {
    category: "Tools & Platforms",
    span: "col-span-1",
    items: ["BigFix", "HostBill", "cPanel", "Plesk", "LDAP"],
  },
]

export const certifications = [
  {
    title: "AWS Certified Solutions Architect",
    subtitle: "Associate",
    issuer: "Amazon Web Services",
    date: "Sep 2024",
    id: "CHB3HPK7MVQ1CCR",
    logo: "[AWS LOGO]",
  },
  {
    title: "Red Hat Certified System Administrator",
    subtitle: "RHCSA",
    issuer: "Red Hat",
    date: "Apr 2022",
    id: "220-066-799",
    logo: "[REDHAT LOGO]",
  },
  {
    title: "Docker Foundations Professional Certificate",
    subtitle: "",
    issuer: "Docker Inc.",
    date: "Mar 2025",
    id: "",
    logo: "[DOCKER LOGO]",
  },
]

export const projects = [
  {
    number: "01",
    title: "OpenStack Private Cloud Monitoring & Auto-Healing Platform",
    tags: ["OpenStack", "Python", "Bash", "Nova", "Neutron", "Cinder"],
    placeholder: "[PROJECT SCREENSHOT / ARCHITECTURE DIAGRAM]",
    bullets: [
      "Automated monitoring and self-healing for OpenStack cloud infra",
      "60% reduction in manual incident response time",
      "VM lifecycle anomaly detection and cluster recovery workflows",
      "Health checks with auto-remediation for Nova, Neutron, Cinder",
    ],
  },
  {
    number: "02",
    title: "Enterprise Linux Patch Compliance & Vulnerability Remediation",
    tags: ["Bash", "Python", "Ansible", "RHEL", "Ubuntu", "CentOS", "SUSE"],
    placeholder: "[PROJECT SCREENSHOT / COMPLIANCE DASHBOARD]",
    bullets: [
      "End-to-end patch automation across heterogeneous Linux environments",
      "Inventory collection, missing patch detection, compliance reporting",
      "OS hardening validation — exposed services, outdated packages",
      "Structured audit reports for operations and compliance teams",
    ],
  },
  {
    number: "03",
    title: "Automated Linux Hosting Stack Provisioning with DNS, SSL & Proxy",
    tags: ["Nginx", "Apache", "DNS", "SSL", "Bash", "Python", "cPanel", "Plesk"],
    placeholder: "[PROJECT SCREENSHOT / SERVER SETUP VISUAL]",
    bullets: [
      "Full-stack provisioning: Nginx/Apache, DNS, SSL, reverse proxy",
      "Let's Encrypt certificate issuance and renewal automation",
      "70% reduction in manual setup time across hosting environments",
      "Health checks: DNS resolution, SSL trust chain, web service, upstream",
    ],
  },
]

export const education = [
  {
    degree: "MCA — Master of Computer Application",
    institution: "Savitribai Phule Pune University",
    period: "2023 – 2025",
    score: "7.65 CGPA",
  },
  {
    degree: "BBA (Computer Application)",
    institution: "Savitribai Phule Pune University",
    period: "2020 – 2023",
    score: "8.89 CGPA",
  },
  {
    degree: "HSC — Science Stream",
    institution: "Maharashtra State Board",
    period: "2018 – 2020",
    score: "68.48%",
  },
  {
    degree: "SSC",
    institution: "Maharashtra State Board",
    period: "2013 – 2018",
    score: "78.80%",
  },
]

export const marqueeItems = [
  "OPENSTACK", "LINUX", "RHCSA", "AWS SAA", "BASH", "PYTHON",
  "ANSIBLE", "KVM", "LVM", "DNS", "SSL", "BARE METAL",
  "INCIDENT RESPONSE", "PATCH COMPLIANCE", "DOCKER", "NETWORKING",
]

export const stats = [
  { value: 3,   suffix: "+", label: "Years of Experience" },
  { value: 200, suffix: "+", label: "Production Servers Managed" },
  { value: 500, suffix: "+", label: "Vulnerabilities Resolved Monthly" },
  { value: 70,  suffix: "%", label: "Manual Tasks Reduced via Automation" },
]
