import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  ExternalLink,
  Facebook,
  GraduationCap,
  Instagram,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  TrendingUp,
  Twitter,
  Users,
  Youtube,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Data ────────────────────────────────────────────────────────

const leaders = [
  {
    name: "Shri Vishnu Deo Sai",
    nameHindi: "श्री विष्णु देव साय",
    title: "Chief Minister, Chhattisgarh",
    titleHindi: "मुख्यमंत्री, छत्तीसगढ़",
    initial: "VS",
    quote: '"युवाओं का उज्जवल भविष्य ही हमारी सबसे बड़ी प्राथमिकता है।"',
    quoteEn: "A bright future for youth is our highest priority.",
    color: "from-primary to-orange-600",
  },
  {
    name: "Shri Vijay Sharma",
    nameHindi: "श्री विजय शर्मा",
    title: "Deputy Chief Minister, Chhattisgarh",
    titleHindi: "उप मुख्यमंत्री, छत्तीसगढ़",
    initial: "VJ",
    quote: '"कौशल विकास और रोजगार सृजन हमारे एजेंडे के केंद्र में हैं।"',
    quoteEn:
      "Skill development and job creation are at the center of our agenda.",
    color: "from-amber-500 to-primary",
  },
  {
    name: "Shri Tankaram Verma",
    nameHindi: "श्री टंकराम वर्मा",
    title: "Revenue Minister, Chhattisgarh",
    titleHindi: "राजस्व मंत्री, छत्तीसगढ़",
    initial: "TV",
    quote: '"शिक्षा और स्वरोजगार से ही समृद्ध छत्तीसगढ़ बनेगा।"',
    quoteEn:
      "A prosperous Chhattisgarh will be built through education and self-employment.",
    color: "from-orange-600 to-amber-600",
  },
];

const stats = [
  {
    label: "Students Enrolled",
    labelHindi: "छात्र नामांकित",
    value: "5,000+",
    icon: <Users size={20} />,
  },
  {
    label: "Courses Available",
    labelHindi: "पाठ्यक्रम उपलब्ध",
    value: "50+",
    icon: <BookOpen size={20} />,
  },
  {
    label: "Placement Rate",
    labelHindi: "प्लेसमेंट दर",
    value: "78%",
    icon: <TrendingUp size={20} />,
  },
];

const modules = [
  {
    id: "ctc",
    title: "CTC",
    titleHindi: "सीटीसी",
    subtitle: "Career & Technical Coaching",
    description:
      "Hands-on technical training across digital skills, computer literacy, and industry certifications.",
    icon: <GraduationCap size={24} />,
  },
  {
    id: "motivational",
    title: "Motivational Workshop",
    titleHindi: "प्रेरणा कार्यशाला",
    subtitle: "Motivational Workshop",
    description:
      "Inspiring sessions with industry leaders and mentors to ignite ambition and build confidence.",
    icon: <Lightbulb size={24} />,
  },
  {
    id: "placement",
    title: "Placement Camp",
    titleHindi: "प्लेसमेंट कैंप",
    subtitle: "Placement Camp",
    description:
      "Direct campus recruitment drives connecting youth with top employers across Chhattisgarh.",
    icon: <Briefcase size={24} />,
  },
  {
    id: "coaching",
    title: "Coaching Classes",
    titleHindi: "कोचिंग क्लासेस",
    subtitle: "Coaching Classes",
    description:
      "Competitive exam preparation and subject-specific coaching for government and private sector jobs.",
    icon: <BookOpen size={24} />,
  },
  {
    id: "msme",
    title: "MSME",
    titleHindi: "एमएसएमई",
    subtitle: "Small Business Support",
    description:
      "Micro, Small & Medium Enterprise support for aspiring entrepreneurs with funding guidance.",
    icon: <Building2 size={24} />,
  },
  {
    id: "nasha",
    title: "Nasha Mukti",
    titleHindi: "नशा मुक्ति",
    subtitle: "Drug De-addiction",
    description:
      "Anti-drug awareness initiatives and rehabilitation support for healthier communities.",
    icon: <Shield size={24} />,
  },
];

const jobs = [
  {
    id: "job-1",
    num: 1,
    title: "Plant Operator",
    company: "Shree Raipur Cement Plant",
    location: "Raipur, Chhattisgarh",
    type: "Full-Time",
    closing: "15 Oct 2024",
  },
  {
    id: "job-2",
    num: 2,
    title: "Electrical Technician",
    company: "Shree Raipur Cement Plant",
    location: "Bhilai, Chhattisgarh",
    type: "Full-Time",
    closing: "20 Oct 2024",
  },
  {
    id: "job-3",
    num: 3,
    title: "Accounts Assistant",
    company: "Shree Raipur Cement Plant",
    location: "Bilaspur, Chhattisgarh",
    type: "Full-Time",
    closing: "15 Oct 2024",
  },
  {
    id: "job-4",
    num: 4,
    title: "Admin Officer",
    company: "Shree Raipur Cement Plant",
    location: "Bilaspur, Chhattisgarh",
    type: "Full-Time",
    closing: "15 Oct 2024",
  },
  {
    id: "job-5",
    num: 5,
    title: "Field Sales Executive",
    company: "Shree Raipur Cement Plant",
    location: "Raipur, Chhattisgarh",
    type: "Part-Time",
    closing: "30 Oct 2024",
  },
  {
    id: "job-6",
    num: 6,
    title: "Data Entry Operator",
    company: "Shree Raipur Cement Plant",
    location: "Durg, Chhattisgarh",
    type: "Full-Time",
    closing: "25 Oct 2024",
  },
];

const schemes = [
  {
    id: "pmkvy",
    name: "Pradhan Mantri Kaushal Vikas Yojana",
    nameHindi: "प्रधानमंत्री कौशल विकास योजना (PMKVY)",
    desc: "Free skill training with certification for youth across 40+ sectors.",
  },
  {
    id: "kvy",
    name: "Kaushal Vikas Yojana",
    nameHindi: "कौशल विकास योजना",
    desc: "State-level skill development program for Chhattisgarh youth.",
  },
  {
    id: "mmsvy",
    name: "Mukhyamantri Yuva Swavalambam Yojana",
    nameHindi: "मुख्यमंत्री युवा स्वावलंबन योजना",
    desc: "Self-employment support scheme providing loans and subsidies to young entrepreneurs.",
  },
  {
    id: "skill-india",
    name: "Skill India Mission",
    nameHindi: "स्किल इंडिया मिशन",
    desc: "National initiative to train 400 million youth with industry-relevant skills by 2022.",
  },
  {
    id: "startup",
    name: "Start-Up India Yojana",
    nameHindi: "स्टार्ट-अप इंडिया योजना",
    desc: "Government funding and mentorship program for budding entrepreneurs and innovators.",
  },
  {
    id: "rnapsy",
    name: "Rashtriya Apprenticeship Promotion Yojana",
    nameHindi: "राष्ट्रीय शिक्षुता प्रोत्साहन योजना",
    desc: "Paid apprenticeship program connecting youth with industry for hands-on experience.",
  },
];

const highlights = [
  { label: "Chhattisgarh-wide program network", icon: <MapPin size={14} /> },
  {
    label: "Direct placement partnerships with industries",
    icon: <Briefcase size={14} />,
  },
  { label: "Free enrollment for eligible youth", icon: <Star size={14} /> },
  { label: "Government-backed certification", icon: <Shield size={14} /> },
];

const footerLinks = [
  { label: "Jobs", path: "/jobseeker/jobs" },
  { label: "Government Schemes", path: "/" },
  { label: "Vacancies", path: "/jobseeker/jobs" },
  { label: "About Us", path: "/" },
  { label: "Contact", path: "/" },
];

// ─── Sub-components ──────────────────────────────────────────────

function SectionHeading({
  hindi,
  english,
  sub,
  light = false,
}: {
  hindi: string;
  english: string;
  sub?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-10 text-center">
      <p
        className={`text-sm font-body uppercase tracking-widest mb-1 ${light ? "text-primary-foreground/60" : "text-primary"}`}
      >
        {english}
      </p>
      <h2
        className={`text-3xl md:text-4xl font-display font-bold mb-2 ${light ? "text-primary-foreground" : "text-foreground"}`}
      >
        {hindi}
      </h2>
      {sub && (
        <p
          className={`text-base max-w-2xl mx-auto ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}
        >
          {sub}
        </p>
      )}
      <div
        className={`mt-4 w-16 h-1 mx-auto rounded-full ${light ? "bg-primary-foreground/40" : "bg-primary"}`}
      />
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* ── 1. HERO BANNER ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #d44f00 0%, #FF6B35 40%, #ff8c42 70%, #ffad60 100%)",
        }}
        data-ocid="hero-section"
      >
        {/* Hero image layer */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-hhk-banner.dim_1400x500.jpg')",
          }}
          aria-hidden="true"
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              className="mb-5 inline-flex bg-white/20 text-white border-white/30 text-sm px-4 py-1 font-body"
              data-ocid="hero-badge"
            >
              Shree Raipur Cement Plant — CSR Initiative
            </Badge>

            <h1
              className="font-display font-bold text-white leading-tight mb-3"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              हम होंगे कामयाब
            </h1>

            <p className="text-white/90 font-display text-xl md:text-2xl mb-2 font-medium">
              युवाओं के सपनों को उड़ान देना
            </p>
            <p className="text-white/75 text-base md:text-lg mb-10 font-body">
              Shree Raipur Cement Plant — CSR Career Development Program
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-display font-bold px-8 shadow-lg gap-2 text-base"
                  data-ocid="hero-cta-register"
                >
                  अपने आप को रजिस्टर करें
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("programs-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white/60 text-white font-display font-semibold text-base rounded-md hover:bg-white/10 transition-smooth"
                data-ocid="hero-cta-explore"
              >
                Explore Programs
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="relative h-12 overflow-hidden">
          <svg
            viewBox="0 0 1440 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 48L60 42C120 36 240 24 360 18C480 12 600 12 720 18C840 24 960 36 1080 40C1200 44 1320 40 1380 38L1440 36V48H1380C1320 48 1200 48 1080 48C960 48 840 48 720 48C600 48 480 48 360 48C240 48 120 48 60 48H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* ── 2. LEADERSHIP ──────────────────────────────────────────── */}
      <section className="bg-background py-16" data-ocid="leadership-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            english="Our Leadership"
            hindi="हमारा नेतृत्व"
            sub="Guided by the vision of Chhattisgarh's leaders committed to youth empowerment."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <Card className="card-elevated text-center overflow-hidden hover:shadow-md transition-smooth">
                  <div className={`h-1.5 bg-gradient-to-r ${leader.color}`} />
                  <CardContent className="pt-8 pb-6 px-6">
                    <div
                      className={`w-20 h-20 rounded-full bg-gradient-to-br ${leader.color} mx-auto mb-4 flex items-center justify-center shadow-md`}
                    >
                      <span className="text-white font-display font-bold text-2xl">
                        {leader.initial}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-foreground text-base mb-0.5">
                      {leader.nameHindi}
                    </h3>
                    <p className="text-xs text-muted-foreground font-body mb-1">
                      {leader.name}
                    </p>
                    <Badge variant="secondary" className="text-xs mb-4 px-2">
                      {leader.titleHindi}
                    </Badge>
                    <Separator className="mb-4" />
                    <p className="text-sm text-primary font-body italic leading-relaxed mb-1">
                      {leader.quote}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {leader.quoteEn}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. ABOUT ───────────────────────────────────────────────── */}
      <section className="bg-muted/30 border-y border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-body uppercase tracking-widest text-primary mb-2">
                About the Program
              </p>
              <h2 className="text-3xl font-display font-bold text-foreground mb-4 leading-tight">
                Hum Honge Kamyab —{" "}
                <span className="text-primary">हम होंगे कामयाब</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 font-body">
                A flagship CSR initiative by Shree Raipur Cement Plant,
                dedicated to empowering the youth of Chhattisgarh through skill
                development, career guidance, and direct placement support.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 font-body">
                We bridge the gap between talent and opportunity — offering free
                courses, motivational workshops, placement camps, and
                government-backed certification programs across the region.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-3 rounded-md bg-card border border-border shadow-sm"
                  >
                    <div className="flex justify-center text-primary mb-1">
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-display font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                      {stat.labelHindi}
                    </p>
                    <p className="text-[10px] text-muted-foreground/70">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link to="/signup">
                <Button
                  size="lg"
                  className="btn-primary gap-2"
                  data-ocid="about-cta"
                >
                  Join the Program <ArrowRight size={15} />
                </Button>
              </Link>
            </motion.div>

            {/* Right — highlights card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="card-elevated overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary to-amber-500" />
                <CardContent className="p-8">
                  <h3 className="font-display font-bold text-foreground text-lg mb-1">
                    Program Highlights
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    कार्यक्रम की विशेषताएं
                  </p>
                  <ul className="space-y-4 mb-6">
                    {highlights.map((h) => (
                      <li key={h.label} className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          {h.icon}
                        </span>
                        <span className="text-sm text-foreground font-body">
                          {h.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Separator className="mb-6" />
                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-md border border-primary/15">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Star size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm text-foreground mb-0.5">
                        Shree Raipur Cement — CSR Commitment
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Investing in communities through sustainable skills
                        development and meaningful employment since 2018.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. PROGRAM MODULES ─────────────────────────────────────── */}
      <section
        id="programs-section"
        className="bg-background py-16"
        data-ocid="programs-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            english="Our Programs"
            hindi="हमारे कार्यक्रम"
            sub="Six focused programs designed to build skills, confidence, and careers for Chhattisgarh youth."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((mod, i) => (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card
                  className="card-elevated hover:shadow-lg transition-smooth cursor-pointer group h-full"
                  data-ocid={`module-card-${mod.id}`}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary group-hover:text-white rounded-lg flex items-center justify-center text-primary mb-4 transition-smooth shrink-0">
                      {mod.icon}
                    </div>
                    <h3 className="font-display font-bold text-foreground text-base mb-0.5">
                      {mod.titleHindi}
                    </h3>
                    <p className="text-xs text-primary font-body mb-2 font-semibold">
                      {mod.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {mod.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-primary text-xs font-semibold opacity-0 group-hover:opacity-100 transition-smooth">
                      Learn More <ArrowRight size={12} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. UPCOMING JOBS ───────────────────────────────────────── */}
      <section
        className="bg-muted/30 border-y border-border py-16"
        data-ocid="jobs-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
            <div>
              <p className="text-sm font-body uppercase tracking-widest text-primary mb-1">
                Upcoming Jobs
              </p>
              <h2 className="text-3xl font-display font-bold text-foreground leading-tight">
                रोजगार के अवसर
              </h2>
              <div className="mt-3 w-16 h-1 bg-primary rounded-full" />
            </div>
            <Link to="/jobseeker/jobs">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                data-ocid="jobs-view-all"
              >
                View All Jobs <ArrowRight size={12} />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="card-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:border-primary/30 hover:shadow-sm transition-smooth"
                data-ocid={`job-row-${job.id}`}
              >
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-display font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    {job.num}
                  </span>
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm">
                      {job.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground font-body">
                        {job.company}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin size={10} /> {job.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-12 sm:ml-0 shrink-0">
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    Closes: {job.closing}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {job.type}
                  </Badge>
                  <Link to="/signup">
                    <Button
                      size="sm"
                      className="btn-primary text-xs gap-1"
                      data-ocid={`job-apply-${job.id}`}
                    >
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. GOVERNMENT SCHEMES ──────────────────────────────────── */}
      <section className="bg-background py-16" data-ocid="schemes-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            english="Yuwao Se Sambandhit Shasan Ki Yojnae"
            hindi="युवाओं से संबंधित शासन की योजनाएं"
            sub="Government Schemes for Youth — Click to learn more and apply."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schemes.map((scheme, i) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group flex items-start gap-4 p-4 rounded-md border border-border hover:border-primary/40 hover:bg-primary/5 transition-smooth cursor-pointer"
                data-ocid={`scheme-item-${scheme.id}`}
              >
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-display font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-foreground text-sm mb-0.5">
                    {scheme.nameHindi}
                  </p>
                  <p className="text-xs text-muted-foreground mb-1">
                    {scheme.name}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {scheme.desc}
                  </p>
                </div>
                <ExternalLink
                  size={14}
                  className="text-muted-foreground group-hover:text-primary transition-smooth shrink-0 mt-1"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. REGISTER CTA ────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20"
        style={{
          background:
            "linear-gradient(135deg, #c43d00 0%, #FF6B35 50%, #ff9a5c 100%)",
        }}
        data-ocid="register-cta-section"
      >
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 20px)",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-white/70 uppercase tracking-widest text-sm font-body mb-3">
              Join the Movement
            </p>
            <h2
              className="font-display font-bold text-white leading-tight mb-3"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              अपने आप को रजिस्टर करें
            </h2>
            <p className="text-white/85 text-xl font-display font-semibold mb-2">
              Register Yourself for Free Career Development
            </p>
            <p className="text-white/65 text-base font-body mb-10">
              Join thousands of youth already on the path to success — हम होंगे
              कामयाब
            </p>
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/92 font-display font-bold px-10 shadow-xl gap-2 text-lg"
                data-ocid="cta-register-btn"
              >
                अपने आप को रजिस्टर करें | Register Yourself Now
                <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 8. DARK FOOTER ─────────────────────────────────────────── */}
      <footer
        className="bg-foreground text-background py-12"
        data-ocid="landing-footer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-white font-display font-bold text-sm">
                    HHK
                  </span>
                </div>
                <div>
                  <p className="font-display font-bold text-background text-sm leading-tight">
                    हम होंगे कामयाब
                  </p>
                  <p className="text-background/50 text-xs">
                    Hum Honge Kamyaab
                  </p>
                </div>
              </div>
              <p className="text-background/60 text-sm leading-relaxed font-body mb-4">
                A CSR initiative by Shree Raipur Cement Plant empowering the
                youth of Chhattisgarh since 2018.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3">
                {[
                  {
                    Icon: Facebook,
                    label: "Facebook",
                    href: "https://facebook.com",
                  },
                  {
                    Icon: Twitter,
                    label: "Twitter",
                    href: "https://twitter.com",
                  },
                  {
                    Icon: Youtube,
                    label: "YouTube",
                    href: "https://youtube.com",
                  },
                  {
                    Icon: Instagram,
                    label: "Instagram",
                    href: "https://instagram.com",
                  },
                ].map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-smooth"
                  >
                    <Icon size={14} className="text-background" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-bold text-background text-sm mb-4 uppercase tracking-wide">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-background/60 hover:text-primary transition-colors flex items-center gap-1.5"
                    >
                      <ArrowRight size={10} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-bold text-background text-sm mb-4 uppercase tracking-wide">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin size={14} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-background/60 font-body leading-relaxed">
                    Shree Raipur Cement Plant, NH-30, Raipur, Chhattisgarh —
                    493221
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={14} className="text-primary shrink-0" />
                  <span className="text-sm text-background/60 font-body">
                    +91 771 250 0000
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={14} className="text-primary shrink-0" />
                  <span className="text-sm text-background/60 font-body">
                    csr@shreecementlimited.com
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="bg-background/10 mb-6" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-background/40">
            <p>
              © {new Date().getFullYear()} Hum Honge Kamyaab — Shree Raipur
              Cement Plant CSR Initiative. All rights reserved.
            </p>
            <p>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
