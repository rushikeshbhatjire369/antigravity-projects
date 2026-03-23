# RUSHIKESH BHATJIRE — PORTFOLIO WEBSITE
## Build Plan · Next.js Edition
### Reference Aesthetic: lightweight.info/en
### Version: 2.0

---

## STACK & TECH DECISIONS

```
Framework:        Next.js 14 (App Router)
Language:         TypeScript
Styling:          Tailwind CSS + CSS Modules for complex animations
Animation:        Framer Motion
Fonts:            next/font/google — Syne (800), DM Sans (400,500), JetBrains Mono (400)
Icons:            lucide-react
Cursor:           Custom — useEffect + useRef
Scroll Trigger:   Framer Motion whileInView / useInView
Deployment:       Vercel
```

---

## PROJECT STRUCTURE

```
my-portfolio/
├── app/
│   ├── layout.tsx               ← Root layout, fonts, metadata, cursor
│   ├── page.tsx                 ← Assembles all sections in order
│   └── globals.css              ← CSS variables, resets, base styles
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx              ← Sticky nav, blur backdrop
│   │   └── Footer.tsx           ← Minimal footer
│   │
│   ├── sections/
│   │   ├── Hero.tsx             ← Full viewport hero
│   │   ├── About.tsx            ← About + stats
│   │   ├── Experience.tsx       ← Timeline
│   │   ├── Skills.tsx           ← Bento grid
│   │   ├── Certifications.tsx   ← 3 cert cards
│   │   ├── Projects.tsx         ← 3 project cards
│   │   ├── Education.tsx        ← Education list
│   │   └── Contact.tsx          ← CTA + contact cards
│   │
│   └── ui/
│       ├── SectionLabel.tsx     ← Reusable monospace section tag
│       ├── PlaceholderImage.tsx ← Dashed placeholder box
│       ├── SkillPill.tsx        ← Tag/pill badge
│       ├── StatBlock.tsx        ← Animated number + label
│       ├── Marquee.tsx          ← Infinite scrolling ticker
│       └── CustomCursor.tsx     ← Dot + ring cursor
│
├── lib/
│   └── data.ts                  ← All content data (no content in components)
│
├── public/
│   └── images/                  ← Drop real images here later
│
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## DESIGN TOKENS

### Define in `globals.css` as CSS variables + Tailwind config

```css
/* app/globals.css */
:root {
  --bg:            #0A0A0A;
  --surface:       #111111;
  --surface-2:     #1A1A1A;
  --border:        #222222;
  --border-bright: #333333;
  --accent:        #2563EB;
  --accent-glow:   #3B82F6;
  --highlight:     #F59E0B;
  --text:          #F5F5F5;
  --text-muted:    #6B7280;
  --text-dim:      #374151;
  --white:         #FFFFFF;
}
```

```ts
// tailwind.config.ts
extend: {
  colors: {
    bg:       'var(--bg)',
    surface:  'var(--surface)',
    surface2: 'var(--surface-2)',
    border:   'var(--border)',
    accent:   'var(--accent)',
    highlight:'var(--highlight)',
    text:     'var(--text)',
    muted:    'var(--text-muted)',
    dim:      'var(--text-dim)',
  },
  fontFamily: {
    display: ['Syne', 'sans-serif'],
    body:    ['DM Sans', 'sans-serif'],
    mono:    ['JetBrains Mono', 'monospace'],
  },
  animation: {
    marquee: 'marquee 30s linear infinite',
    fadeUp:  'fadeUp 0.7s ease-out forwards',
  },
  keyframes: {
    marquee: {
      '0%':   { transform: 'translateX(0%)' },
      '100%': { transform: 'translateX(-50%)' },
    },
    fadeUp: {
      from: { opacity: '0', transform: 'translateY(32px)' },
      to:   { opacity: '1', transform: 'translateY(0)' },
    },
  },
}
```

---

## DATA LAYER

### `lib/data.ts` — All content lives here, imported by components

```ts
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
```

---

## COMPONENT SPECS

---

### `app/layout.tsx`

- Import Syne, DM Sans, JetBrains Mono via `next/font/google`
- Apply font CSS variables to `<html>` classNames
- Set metadata — title, description, OG tags
- Render `<CustomCursor />` and `<Nav />` above `{children}`
- Set `<body>` bg to `var(--bg)`, text to `var(--text)`

---

### `app/page.tsx`

Assemble sections in this exact order:

```tsx
<Hero />
<About />
<Experience />
<Skills />
<Certifications />
<Projects />
<Education />
<Contact />
<Footer />
```

No logic here — pure assembly.

---

### `components/ui/CustomCursor.tsx`

**Behavior:**
- Small dot: 8px circle, `bg-accent`, fixed, pointer-events-none, z-50
- Ring: 32px circle, border `border-accent`, fixed, pointer-events-none, z-50
- Ring follows mouse with slight lag (lerp or `transition: transform 0.12s ease`)
- On hover over `a`, `button`: ring scales to 2× and fills lightly
- Hide on mobile (md:block only)

**Implementation:** `"use client"` + useEffect + mousemove event listener + useRef

---

### `components/ui/SectionLabel.tsx`

```tsx
// Props: label: string  e.g. "ABOUT / 02"
// Renders small monospace uppercase text in accent color above headings

className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4 block"
```

---

### `components/ui/PlaceholderImage.tsx`

```tsx
// Props: label: string, className?: string
// Dashed border box with centered label — replaced with next/image later

className="border border-dashed border-[#333333] bg-surface flex items-center 
           justify-center font-mono text-xs text-[#444444] uppercase tracking-widest"
```

---

### `components/ui/SkillPill.tsx`

```tsx
// Props: label: string
// Small pill badge — border, monospace text, sharp corners

className="border border-[var(--border-bright)] text-muted font-mono text-[11px] 
           px-3 py-1 rounded-[4px] whitespace-nowrap"
```

---

### `components/ui/StatBlock.tsx`

```tsx
// Props: value: number, suffix: string, label: string
// Large accent number + label below
// Count-up animation using Framer Motion useInView + useMotionValue + useTransform
```

---

### `components/ui/Marquee.tsx`

```tsx
// Props: items: string[]
// Duplicates items array for seamless loop
// CSS animation: animate-marquee (defined in tailwind.config.ts)
// hover:[animation-play-state:paused]
// overflow-hidden flex flex-row
```

---

### `components/layout/Nav.tsx`

```
"use client"
Position:    fixed top-0 left-0 right-0 z-50
Background:  bg-[rgba(10,10,10,0.85)] backdrop-blur-xl
Border:      border-b border-[var(--border)]
Height:      h-16
Padding:     px-8 md:px-16

Left:        "RB" monogram — font-display font-bold text-xl text-text
Right links: About · Work · Skills · Contact
             font-mono text-xs tracking-widest text-muted
             hover:text-text + underline slides from left (CSS after pseudo)

Mobile:      Hamburger button (lucide-react Menu icon)
             Full-screen overlay: bg-bg, links centered, font-display text-4xl
             Close on link click

Active section: useEffect + IntersectionObserver on section IDs
                Active link gets text-accent color
```

---

### `components/sections/Hero.tsx`

```
"use client"
Height:      min-h-screen
Background:  bg-bg
Padding:     px-8 md:px-16 pt-32 pb-16

OUTER LAYOUT:
  flex flex-col gap-0

MAIN GRID:
  grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 items-center flex-1

LEFT COLUMN:
  <SectionLabel label="CLOUD & INFRASTRUCTURE ENGINEER // NASHIK, INDIA" />

  <h1>
    font-display font-extrabold text-text leading-[0.9] tracking-tight
    text-[clamp(56px,8vw,120px)]
    "BUILDING INFRA
     THAT DOESN'T
     BREAK."

  <p>
    font-body text-muted text-lg leading-relaxed mt-6 max-w-md
    "3+ years managing OpenStack private clouds, Linux systems,
     and data center operations at production scale."

  BUTTONS — flex flex-wrap gap-4 mt-10:
    Primary button:
      bg-accent text-white px-8 py-4 rounded-[4px]
      font-mono text-sm tracking-widest uppercase
      hover:bg-accent-glow transition-colors duration-200
      "View My Work →"

    Ghost button:
      border border-[var(--border-bright)] text-text px-8 py-4 rounded-[4px]
      font-mono text-sm tracking-widest uppercase
      hover:border-text transition-colors duration-200
      "Download Resume"

RIGHT COLUMN:
  <PlaceholderImage
    label="[PROFILE PHOTO]"
    className="w-full aspect-[3/4] lg:aspect-[4/5] lg:-rotate-1 lg:translate-y-4"
  />

BOTTOM (full width):
  border-t border-[var(--border)] mt-16 pt-0
  <Marquee items={marqueeItems} />

ANIMATION:
  Framer Motion staggerContainer wraps left column
  Each child: variants={fadeUp}, custom stagger delay
  Image: whileInView fadeUp with 0.3s delay
```

---

### `components/sections/About.tsx`

```
Background:  bg-bg
Padding:     px-8 md:px-16 py-32

GRID: grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-16 items-start

LEFT:
  <SectionLabel label="ABOUT / 02" />

  <h2>
    font-display font-extrabold text-5xl md:text-6xl text-text leading-tight
    "Infrastructure is my native language."

  <p> × 2 — font-body text-muted text-lg leading-relaxed mt-6

  STATS — grid grid-cols-2 gap-8 mt-12:
    <StatBlock value={3}   suffix="+" label="Years of Experience" />
    <StatBlock value={200} suffix="+" label="Production Servers Managed" />

RIGHT:
  <PlaceholderImage
    label="[PROFILE / WORKSPACE PHOTO]"
    className="w-full aspect-square sticky top-24"
  />
  <p className="font-mono text-xs text-muted mt-4 tracking-widest uppercase">
    Nashik, Maharashtra · Open to Remote & Relocation
  </p>

ANIMATION: staggerContainer + fadeUp children, whileInView
```

---

### `components/sections/Experience.tsx`

```
Background:  bg-surface
Padding:     px-8 md:px-16 py-32

<SectionLabel label="WORK HISTORY / 03" />
<h2 className="font-display font-extrabold text-5xl text-text mt-2">
  Where I've Operated.
</h2>

TIMELINE — relative ml-0 md:ml-48 mt-16:
  Vertical line:
    before:content-[''] before:absolute before:left-[-2px] md:before:left-[-200px]
    before:top-0 before:bottom-0 before:w-px before:bg-[var(--border)]

  Each entry (map over experience):
    relative flex flex-col md:flex-row gap-6 md:gap-12 mb-16 group

    DATE (md:absolute md:right-full md:pr-12 md:w-48 md:text-right):
      font-mono text-xs text-muted tracking-widest
      Connector dot:
        hidden md:block absolute right-[-7px] top-1 w-3 h-3 rounded-full
        current → bg-accent ring-2 ring-accent/20
        not current → bg-surface border-2 border-[var(--border-bright)]

    CONTENT (flex-1 bg-surface-2 border border-[var(--border)] p-8 rounded-[4px]):
      Company — font-mono text-[11px] text-accent tracking-[0.2em] uppercase mb-1
      Title — font-display font-bold text-2xl text-text mb-3
      Tags — flex flex-wrap gap-2 mb-4 → <SkillPill> each
      Description — font-body text-muted leading-relaxed

      HOVER STATE on CONTENT card:
        group-hover:border-[var(--border-bright)] transition-colors duration-300
        Left accent stripe via before: pseudo on content div

ANIMATION: Each entry motion.div whileInView fadeUp staggered 0.15s
```

---

### `components/sections/Skills.tsx`

```
Background:  bg-bg
Padding:     px-8 md:px-16 py-32

<SectionLabel label="SKILLS & TOOLS / 04" />
<h2> — "The Stack I Live In."
<p>  — "Not a list of buzzwords — tools I use daily in production."
       font-body text-muted mt-4 text-lg

BENTO GRID — grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16:
  Each card (map over skills):
    className={cn(
      "bg-surface-2 border border-[var(--border)] p-8 rounded-[4px]",
      "hover:border-[var(--border-bright)] hover:-translate-y-1",
      "transition-all duration-300",
      item.span  // applies lg:col-span-2 where needed
    )}

    Category label:
      font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-5

    Skills:
      flex flex-wrap gap-2
      <SkillPill label={item} /> for each

SPAN RULES (from data.ts span field):
  Cloud & Virtualization   → lg:col-span-2
  Automation & Scripting   → lg:col-span-2
  Operations & Reliability → lg:col-span-2
  All others               → default (col-span-1)

ANIMATION: stagger grid — each card motion.div with 0.05s delay increment
```

---

### `components/sections/Certifications.tsx`

```
Background:  bg-[#0D0D0D]
Padding:     px-8 md:px-16 py-32

<SectionLabel label="CERTIFICATIONS / 05" />
<h2> — "Certified. Verified. Production-Tested."

CARDS — grid grid-cols-1 md:grid-cols-3 gap-6 mt-16:
  Each cert card:
    relative overflow-hidden
    bg-surface border border-[var(--border)] p-8 rounded-[4px]
    hover:border-accent transition-all duration-300 group

    Accent left stripe (before pseudo):
      absolute left-0 top-0 bottom-0 w-[3px] bg-accent
      scale-y-0 group-hover:scale-y-100
      transition-transform duration-300 origin-top

    <PlaceholderImage label={cert.logo} className="w-16 h-16 mb-6" />
    Title — font-display font-bold text-xl text-text
    Subtitle — font-mono text-xs text-accent tracking-widest mt-1
    Issuer — font-body text-muted text-sm mt-4
    Date — font-mono text-xs text-muted mt-1
    ID (if cert.id):
      font-mono text-[10px] text-dim mt-3
      "ID: {cert.id}"

ANIMATION: 3 cards whileInView staggered fadeUp
```

---

### `components/sections/Projects.tsx`

```
Background:  bg-[#0F0F0F]
Padding:     px-8 md:px-16 py-32

<SectionLabel label="PROJECTS / 06" />
<h2> — "Things I've Actually Built."

CARDS — flex flex-col gap-6 mt-16:
  Each project card (map over projects):
    bg-surface border border-[var(--border)] rounded-[4px] overflow-hidden
    hover:border-[var(--border-bright)] hover:-translate-y-1
    transition-all duration-300 group

    INNER GRID: grid grid-cols-1 lg:grid-cols-[40fr_60fr]

    LEFT — Image placeholder:
      <PlaceholderImage
        label={project.placeholder}
        className="w-full h-64 lg:h-full min-h-[280px]"
      />

    RIGHT — Content: p-8 md:p-12 relative

      Faded BG number (decorative):
        absolute top-2 right-4 select-none pointer-events-none
        font-display font-extrabold text-[120px] leading-none text-white
        opacity-[0.04]
        {project.number}

      Project number tag:
        font-mono text-[11px] text-accent tracking-widest mb-3
        "PROJECT {project.number}"

      Title:
        font-display font-bold text-2xl md:text-3xl text-text leading-tight mb-4

      Tags — flex flex-wrap gap-2 mb-6:
        <SkillPill> for each tag

      Bullets — ul space-y-2:
        Each li: flex items-start gap-3
          Dot: w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0
          Text: font-body text-muted text-sm leading-relaxed

ANIMATION: Each card motion.div whileInView fadeUp staggered 0.15s
```

---

### `components/sections/Education.tsx`

```
Background:  bg-bg
Padding:     px-8 md:px-16 py-32

<SectionLabel label="EDUCATION / 07" />
<h2> — "Academic Foundation."

LIST — flex flex-col mt-12:
  Each entry — border-b border-[var(--border)] py-8:
    grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end
    hover:bg-surface/30 transition-colors duration-200 px-4 -mx-4 rounded-[4px]

    LEFT:
      Degree — font-display font-bold text-xl text-text
      Institution — font-mono text-xs text-muted tracking-widest mt-1 uppercase

    RIGHT (text-right):
      Period — font-mono text-xs text-muted
      Score — font-mono text-sm text-accent font-bold mt-1

ANIMATION: Each row whileInView fadeUp staggered 0.1s
```

---

### `components/sections/Contact.tsx`

```
"use client"
Height:      min-h-screen
Background:  bg-bg
Padding:     px-8 md:px-16 py-32
Layout:      flex flex-col items-center justify-center text-center relative overflow-hidden

FADED BG TEXT:
  absolute inset-0 flex items-center justify-center
  font-display font-extrabold leading-none whitespace-nowrap select-none
  pointer-events-none text-white opacity-[0.025]
  text-[clamp(80px,18vw,200px)]
  "LET'S CONNECT"

FOREGROUND — relative z-10 max-w-3xl mx-auto w-full:
  <SectionLabel label="CONTACT / 08" />

  <h2>
    font-display font-extrabold text-text leading-tight mt-4
    text-[clamp(40px,6vw,80px)]
    "Let's Build Something Reliable."

  <p>
    font-body text-muted text-lg mt-6 max-w-xl mx-auto leading-relaxed
    "Available for roles in cloud infrastructure, Linux systems,
     and DevOps engineering. Open to full-time, contract, and remote."

  CONTACT CARDS — grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 w-full max-w-2xl mx-auto:
    Card data:
      { icon: Mail,      label: "EMAIL",    value: meta.email }
      { icon: Phone,     label: "PHONE",    value: meta.phone }
      { icon: Linkedin,  label: "LINKEDIN", value: meta.linkedin }

    Each card:
      bg-surface border border-[var(--border)] p-6 rounded-[4px]
      hover:border-accent transition-all duration-300 text-left

      Icon — text-accent w-5 h-5 mb-3 (lucide-react)
      Label — font-mono text-[11px] text-muted uppercase tracking-widest mb-1
      Value — font-body text-text text-sm break-all

  CTA BUTTON — mt-12:
    bg-accent text-white font-mono text-sm tracking-widest uppercase
    px-12 py-5 rounded-[4px] inline-flex items-center gap-3
    hover:bg-accent-glow transition-colors duration-200
    "Send Me a Message →"
    href="mailto:{meta.email}"

ANIMATION: All elements whileInView staggered
```

---

### `components/layout/Footer.tsx`

```
Background:  bg-[#060606]
Border-top:  border-t border-[var(--border)]
Height:      h-20
Padding:     px-8 md:px-16

Layout: flex items-center justify-between

Left:   © 2026 Rushikesh Bhatjire
        font-mono text-xs text-muted

Center: Cloud & Infrastructure Engineer · Nashik, India
        font-mono text-xs text-muted hidden md:block

Right:  Icon links — Linkedin, Github, Mail (lucide-react)
        text-muted hover:text-accent transition-colors w-4 h-4
        flex gap-5 items-center
```

---

## FRAMER MOTION PATTERNS

### `lib/animations.ts` — Define once, import everywhere

```ts
import { Variants } from "framer-motion"

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  },
}

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const viewportConfig = { once: true, margin: "-80px" }
```

### Standard usage pattern in every section

```tsx
import { motion } from "framer-motion"
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations"

<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={viewportConfig}
>
  <motion.div variants={fadeUp}>...</motion.div>
  <motion.div variants={fadeUp}>...</motion.div>
</motion.div>
```

---

## MOBILE RESPONSIVE RULES

```
< 768px (mobile):
  - Nav: hamburger, full screen overlay
  - Hero: single column, image below text
         headline: clamp(40px,10vw,72px)
  - About: single column
  - Experience: date above content, no absolute positioning
  - Skills: all cards col-span-1
  - Certifications: single column stack
  - Projects: image top, content below
  - Contact cards: single column
  - Footer: centered, 2 rows, h-auto py-6
  - CustomCursor: hidden
  - Section padding: py-16 px-6

768px – 1024px (tablet):
  - 2-col grids where defined
  - Skills: 2-col grid
  - Nav: full links visible
```

---

## PERFORMANCE CHECKLIST

- [ ] All fonts via `next/font/google` — no layout shift
- [ ] `"use client"` only on interactive components (Nav, Cursor, Contact, StatBlock)
- [ ] Server components by default for all static sections
- [ ] `LazyMotion` + `domAnimation` from framer-motion for smaller bundle
- [ ] Tailwind purge configured — no unused classes in build
- [ ] `whileInView` with `once: true` — no re-trigger on scroll up
- [ ] Marquee is pure CSS animation — zero JS
- [ ] `next/image` ready slots in `<PlaceholderImage />` — easy swap later
- [ ] `metadata` export in `layout.tsx` for SEO

---

## BUILD ORDER FOR ANTIGRAVITY

```
Step 01 — Config files
  next.config.ts
  tailwind.config.ts
  tsconfig.json

Step 02 — Foundation
  app/globals.css         (CSS variables + resets + base)
  lib/data.ts             (ALL content)
  lib/animations.ts       (Framer Motion variants)

Step 03 — UI Primitives (build these first — all sections depend on them)
  components/ui/SectionLabel.tsx
  components/ui/PlaceholderImage.tsx
  components/ui/SkillPill.tsx
  components/ui/StatBlock.tsx
  components/ui/Marquee.tsx
  components/ui/CustomCursor.tsx

Step 04 — Layout shell
  components/layout/Nav.tsx
  components/layout/Footer.tsx
  app/layout.tsx

Step 05 — Sections (build in page order)
  components/sections/Hero.tsx
  components/sections/About.tsx
  components/sections/Experience.tsx
  components/sections/Skills.tsx
  components/sections/Certifications.tsx
  components/sections/Projects.tsx
  components/sections/Education.tsx
  components/sections/Contact.tsx

Step 06 — Assembly
  app/page.tsx            (imports and orders all sections)
```

---

## DO NOT DO

- ❌ No styled-components, emotion, or inline styles — Tailwind only
- ❌ No purple gradients or light mode anywhere
- ❌ No Inter, Roboto, Arial as display fonts (use Syne for display)
- ❌ No border-radius above 4px — keep sharp corners throughout
- ❌ No skill progress bars or percentage meters
- ❌ No content hardcoded in components — all data from `lib/data.ts`
- ❌ No `pages/` directory — App Router only
- ❌ No placeholder images from picsum/unsplash — use `<PlaceholderImage />`
- ❌ No `useEffect` for animations Framer Motion already handles
- ❌ Do not put `"use client"` on every component — only where needed

---

*Design Plan v2.0 · Next.js 14 App Router · Rushikesh Bhatjire Portfolio · 2026*
