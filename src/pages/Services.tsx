import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Globe, 
  Smartphone, 
  Bot, 
  Search, 
  TrendingUp, 
  Mail, 
  Palette, 
  Briefcase,
  Sparkles,
  Users,
  Shield,
  Code,
  Megaphone,
  PenTool,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

interface ServiceItem {
  name: string;
  price: string;
  keywords?: string[];
}

interface ServiceCategory {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  items: ServiceItem[];
  gradient: string;
}

const serviceCategories = {
  development: {
    label: "Development",
    icon: Code,
    description: "Custom websites, web apps, mobile apps & chatbots built for performance",
    services: [
      {
        icon: Globe,
        title: "Website Design & Development",
        description: "Professional websites that convert visitors into customers",
        gradient: "from-pink to-lavender",
        items: [
          { name: "Website UI Design", price: "₹6,000+", keywords: ["web design", "UI design"] },
          { name: "Landing Page (Design + Dev)", price: "₹8,000+", keywords: ["landing page", "conversion"] },
          { name: "Static Website (Up to 5 Pages)", price: "₹12,000+", keywords: ["business website", "company website"] },
          { name: "Business Website (6–8 Pages + SEO)", price: "₹20,000+", keywords: ["corporate website", "SEO"] },
          { name: "Website Development (Per Page)", price: "₹2,000/page", keywords: ["web development"] },
          { name: "Website Redesign", price: "₹10,000+", keywords: ["website makeover", "redesign"] },
        ],
      },
      {
        icon: Smartphone,
        title: "Web & Mobile App Development",
        description: "Scalable applications for web and mobile platforms",
        gradient: "from-lavender to-purple",
        items: [
          { name: "Web App (Basic MVP)", price: "₹50,000+", keywords: ["web application", "MVP", "startup"] },
          { name: "Advanced Web App", price: "₹1,00,000+", keywords: ["SaaS", "enterprise app"] },
          { name: "Mobile App (Basic)", price: "₹70,000+", keywords: ["Android app", "iOS app"] },
          { name: "Mobile App (Advanced)", price: "₹1,30,000+", keywords: ["cross-platform", "React Native"] },
        ],
      },
      {
        icon: Bot,
        title: "Chatbots & Automation",
        description: "AI-powered bots to automate customer support & sales",
        gradient: "from-purple to-magenta",
        items: [
          { name: "Website Chatbot", price: "₹8,000+", keywords: ["customer support", "AI chatbot"] },
          { name: "WhatsApp Chatbot", price: "₹12,000+", keywords: ["WhatsApp automation", "business bot"] },
          { name: "Advanced Automation", price: "₹25,000+", keywords: ["workflow automation", "Zapier"] },
        ],
      },
    ] as ServiceCategory[],
  },
  marketing: {
    label: "Marketing",
    icon: Megaphone,
    description: "SEO, paid ads & outreach strategies to grow your online presence",
    services: [
      {
        icon: Search,
        title: "Search Engine Optimization (SEO)",
        description: "Rank higher on Google and drive organic traffic",
        gradient: "from-pink to-lavender",
        items: [
          { name: "SEO Audit & Setup", price: "₹10,000+", keywords: ["SEO audit", "technical SEO"] },
          { name: "SEO Monthly (Starter)", price: "₹12,000/mo", keywords: ["local SEO", "on-page SEO"] },
          { name: "SEO Monthly (Growth)", price: "₹20,000/mo", keywords: ["content marketing", "link building"] },
        ],
      },
      {
        icon: TrendingUp,
        title: "Paid Ads & Performance Marketing",
        description: "Google Ads, Meta Ads & campaigns that deliver ROI",
        gradient: "from-lavender to-purple",
        items: [
          { name: "Ads Setup (One-time)", price: "₹6,000+", keywords: ["Google Ads", "Facebook Ads"] },
          { name: "Ads Management", price: "₹12,000/mo", keywords: ["PPC management", "ad optimization"] },
          { name: "Performance Marketing", price: "₹25,000/mo", keywords: ["growth marketing", "ROAS"] },
        ],
      },
      {
        icon: Mail,
        title: "Cold Email & Outreach",
        description: "B2B lead generation through targeted email campaigns",
        gradient: "from-purple to-magenta",
        items: [
          { name: "Cold Email Setup", price: "₹6,000+", keywords: ["email infrastructure", "deliverability"] },
          { name: "Cold Email Copywriting", price: "₹4,000+", keywords: ["email copy", "B2B outreach"] },
          { name: "Cold Email Campaign", price: "₹12,000/mo", keywords: ["lead generation", "sales outreach"] },
        ],
      },
    ] as ServiceCategory[],
  },
  design: {
    label: "Design",
    icon: PenTool,
    description: "Branding, graphics & visual content that makes you stand out",
    services: [
      {
        icon: Palette,
        title: "Marketing & Social Media Design",
        description: "Eye-catching visuals for digital marketing",
        gradient: "from-pink to-lavender",
        items: [
          { name: "Poster Design", price: "₹800+", keywords: ["event poster", "promotional design"] },
          { name: "Banner Design", price: "₹1,200+", keywords: ["web banner", "display ads"] },
          { name: "Social Media Post", price: "₹800+", keywords: ["Instagram design", "social graphics"] },
          { name: "YouTube Thumbnail", price: "₹600+", keywords: ["thumbnail design", "YouTube"] },
          { name: "Ad Creative Design", price: "₹1,200+", keywords: ["ad design", "creative assets"] },
        ],
      },
      {
        icon: Briefcase,
        title: "Branding & Business Collateral",
        description: "Complete brand identity that builds trust",
        gradient: "from-lavender to-purple",
        items: [
          { name: "Business Card Design", price: "₹1,200+", keywords: ["visiting card", "corporate identity"] },
          { name: "Letterhead / Invoice", price: "₹800+", keywords: ["stationery design", "invoice template"] },
          { name: "Brand Kit (Logo, Colors)", price: "₹6,000+", keywords: ["logo design", "brand guidelines"] },
          { name: "Complete Branding Package", price: "₹15,000+", keywords: ["brand identity", "visual identity"] },
        ],
      },
    ] as ServiceCategory[],
  },
};

const highlights = [
  { icon: Sparkles, text: "Transparent pricing — no hidden costs" },
  { icon: Users, text: "Founder-led execution on every project" },
  { icon: Shield, text: "No long-term lock-ins or contracts" },
  { icon: CheckCircle2, text: "Dedicated support & revisions included" },
];

type CategoryKey = keyof typeof serviceCategories;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 },
  },
};

const ServiceCard = ({ category, index }: { category: ServiceCategory; index: number }) => (
  <motion.div
    variants={itemVariants}
    className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300 relative overflow-hidden border border-border/50"
  >
    {/* Background gradient glow */}
    <motion.div 
      className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${category.gradient} opacity-10 blur-3xl pointer-events-none`}
      animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
    />
    
    <div className="relative">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} shadow-md`}>
          <category.icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {category.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {category.description}
          </p>
        </div>
      </div>
      
      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-border via-border/50 to-transparent mb-4" />
      
      {/* Service items */}
      <div className="space-y-3">
        {category.items.map((item) => (
          <motion.div 
            key={item.name} 
            className="flex justify-between items-start gap-4 group/item"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-pink/60 group-hover/item:bg-pink transition-colors" />
              <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
                {item.name}
              </span>
            </div>
            <span className="text-sm font-semibold text-foreground whitespace-nowrap">
              {item.price}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const Services = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("development");

  useEffect(() => {
    document.title = "Services & Pricing | Web Development, SEO, Digital Marketing | SideQuesters";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Professional web development, SEO, digital marketing, and design services in India. Transparent pricing starting ₹600. Custom websites, apps, branding & growth marketing.");
    }
  }, []);

  const currentCategory = serviceCategories[activeCategory];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-lavender/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-[1440px] text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink/10 text-pink text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Transparent Pricing
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Services That <span className="gradient-text">Grow Your Business</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              From custom websites to SEO and branding — everything you need to build and scale your digital presence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="pb-8 px-6 lg:px-12 sticky top-16 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto max-w-[1440px]">
          <div className="flex justify-center gap-2 md:gap-4">
            {(Object.keys(serviceCategories) as CategoryKey[]).map((key) => {
              const cat = serviceCategories[key];
              const isActive = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-pink to-lavender text-primary-foreground shadow-button"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <cat.icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Description */}
      <section className="py-8 px-6 lg:px-12">
        <div className="container mx-auto max-w-[1440px] text-center">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              {currentCategory.label} Services
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {currentCategory.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-16 px-6 lg:px-12">
        <div className="container mx-auto max-w-[1440px]">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid gap-6 max-w-6xl mx-auto ${
              currentCategory.services.length === 2 
                ? "md:grid-cols-2" 
                : "md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {currentCategory.services.map((category, index) => (
              <ServiceCard key={category.title} category={category} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why SideQuesters */}
      <section className="py-16 px-6 lg:px-12 bg-muted/30">
        <div className="container mx-auto max-w-[1440px]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Why Clients Choose Us
              </h2>
              <p className="text-muted-foreground">
                We deliver quality work with complete transparency
              </p>
            </motion.div>

            <motion.div 
              className="grid sm:grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {highlights.map((item) => (
                <motion.div
                  key={item.text}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink/20 to-lavender/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-pink" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="container mx-auto max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-card relative overflow-hidden border border-border/50">
              {/* Background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-pink/20 to-lavender/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Not Sure What You Need?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Tell us about your business goals and we'll recommend the right solution — no obligation.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="hero" size="xl" asChild>
                    <Link to="/contact" className="gap-2">
                      Get Free Consultation
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="heroOutline" size="xl" asChild>
                    <Link to="/work">View Our Work</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "SideQuesters",
            url: "https://sidequesters.in",
            description: "Professional web development, SEO, digital marketing, and design services in India.",
            areaServed: "India",
            priceRange: "₹600 - ₹1,30,000+",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Digital Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Website Development",
                    description: "Custom website design and development services",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "SEO Services",
                    description: "Search engine optimization to improve rankings",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Digital Marketing",
                    description: "Paid ads, performance marketing, and growth strategies",
                  },
                },
              ],
            },
          }),
        }}
      />
    </div>
  );
};

export default Services;
