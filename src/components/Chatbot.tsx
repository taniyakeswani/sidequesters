import { useState, useRef, useEffect } from "react";
import { Zap, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

const KB = [
  {
    keys: ["hi", "hello", "hey", "good morning", "good evening", "namaste", "hii", "helo", "howdy"],
    answer: "Hello.\n\nI can help you with:\n- Services we offer\n- Pricing and timelines\n- How to get started\n\nWhat are you looking to build?",
    next: null,
  },
  {
    keys: ["okay fine", "thank you", "thanks", "ok", "okay", "got it", "understood", "noted", "sure", "great", "perfect", "sounds good", "alright", "cool"],
    answer: "Glad I could help.\n\nIf you have any other questions about our services or want to discuss a project, feel free to ask.\n\nOr visit our Contact page to get started.",
    next: null,
  },
  {
    keys: ["what services", "what do you offer", "what do you do", "offerings", "our services", "services"],
    answer: "We offer end-to-end digital solutions across three areas:\n\nDevelopment:\n- Website Design & Development\n- Web & Mobile App Development\n- Software Development\n- Chatbots & Automation\n\nMarketing:\n- SEO (Audit, Starter, Growth)\n- Google & Meta Ads\n- Cold Email Campaigns\n\nDesign:\n- Branding & Brand Kits\n- Social Media Design\n- Complete Branding Packages\n\nWould you like details on any specific service?",
    next: null,
  },
  {
    keys: ["website", "web design", "landing page", "static site", "build site", "develop site", "redesign"],
    answer: "We build:\n- Landing Pages\n- Static Websites (up to 5 pages)\n- Business Websites (6-8 pages + SEO)\n- Website Redesigns\n- Custom Web Applications\n\nBusiness Website includes: responsive design, SEO setup, speed optimization, analytics integration.\nTimeline: 3-5 weeks.\n\nScope and pricing depend on requirements.",
    next: "Would you like to discuss your project or see our past work?",
  },
  {
    keys: ["web app", "software", "mvp", "saas", "application", "platform", "portal"],
    answer: "We build:\n- Web App (Basic MVP): core features, user auth, admin panel. Timeline: 4-8 weeks.\n- Advanced Web App: SaaS, enterprise-grade systems.\n- Custom Software: built for scale and real-world business operations.",
    next: "Are you looking for an MVP or a full product build?",
  },
  {
    keys: ["mobile app", "android", "ios", "app development"],
    answer: "We build mobile applications:\n- Mobile App (Basic): single platform, core features.\n- Mobile App (Advanced): cross-platform, complex workflows.\n\nTimeline: 6-12 weeks depending on scope.",
    next: "Would you like to discuss your app requirements?",
  }, 
  {
    keys: ["chatbot", "bot", "whatsapp", "automate", "workflow", "automation"],
    answer: "We build:\n- Website Chatbots: FAQ automation, lead capture.\n- WhatsApp Chatbots: automated flows, CRM integration.\n- Advanced Automation: workflow automation, third-party integrations.\n\nResults: up to 60% faster response time, 25% increase in lead capture.",
    next: "Would you like to explore chatbot or automation options?",
  },
  {
    keys: ["seo", "search engine", "organic", "google rank", "ranking", "keyword"],
    answer: "We provide:\n- SEO Audit & Setup\n- SEO Monthly Starter: on-page optimization, local SEO.\n- SEO Monthly Growth: technical SEO, keyword targeting, backlink strategy, monthly reporting.\n\nExpected timeline for measurable results: 3-6 months.",
    next: "What is your current website status and target industry?",
  },
  {
    keys: ["google ads", "meta ads", "facebook ads", "paid ads", "performance marketing", "ppc", "advertising"],
    answer: "We manage:\n- Google Ads & Meta Ads setup\n- Ongoing ads management\n- A/B testing and audience targeting\n- Conversion tracking and reporting\n\nKPIs: Cost per lead, ROAS improvement.",
    next: "What is your approximate monthly ad budget?",
  },
  {
    keys: ["cold email", "email campaign", "outreach", "b2b email", "lead gen", "lead generation"],
    answer: "We offer:\n- Cold Email Infrastructure Setup\n- Cold Email Copywriting\n- Full Campaign Management\n\nResults: one B2B client generated 15 qualified leads in 60 days.",
    next: "Are you targeting a specific industry or geography?",
  },
  {
    keys: ["social media", "instagram post", "content", "social"],
    answer: "We provide social media design including:\n- Social media post design\n- Ad creatives\n- YouTube thumbnails\n- Banners and promotional assets",
    next: "Would you like to discuss your social media requirements?",
  },
  {
    keys: ["branding", "brand kit", "brand identity", "visual identity", "brand package"],
    answer: "Our design services:\n- Logo Design\n- Brand Kit (Logo, Colors, Typography)\n- Complete Branding Package\n- Business Card & Letterhead\n- Poster, Banner, Ad Creatives\n\nWe build complete brand systems from scratch.",
    next: "Are you starting from scratch or refreshing an existing brand?",
  },
  {
    keys: ["logo", "logo design"],
    answer: "Yes, we design logos as part of:\n- Standalone logo design\n- Brand Kit (Logo + Colors + Typography)\n- Complete Branding Package\n\nAll design work is tailored to your industry and audience.",
    next: null,
  },
  {
    keys: ["cost", "price", "pricing", "how much", "charge", "fee", "rate", "budget"],
    answer: "Pricing depends on scope, deliverables, and timeline.\n\nWe do not share fixed rates without understanding your requirements.\n\nOur process: Discovery > Scope > Proposal > Build.\n\nTo get an accurate quote, share:\n- Type of service needed\n- Timeline expectation\n- Industry or business type",
    next: "Would you like to submit your requirements via our Contact form?",
  },
  {
    keys: ["how long", "timeline", "duration", "time take", "days", "weeks", "deadline"],
    answer: "Typical timelines:\n- Landing Page: 1-2 weeks\n- Business Website: 3-5 weeks\n- Web App MVP: 4-8 weeks\n- Mobile App: 6-12 weeks\n- SEO results: 3-6 months\n\nAll timelines are confirmed after scope is defined.",
    next: "Do you have a specific deadline we should work around?",
  },
  {
    keys: ["process", "how do you work", "methodology", "approach", "how does it work"],
    answer: "Our process:\n1. Discovery - understand your goals\n2. Scope - define deliverables and cost\n3. Build - execute with full transparency\n4. Optimize - refine based on data\n\nEvery project follows this model.",
    next: "Would you like to start with a discovery call?",
  },
  {
    keys: ["guarantee", "guaranteed", "promise", "ensure result"],
    answer: "We do not guarantee specific rankings or revenue outcomes.\n\nWe guarantee:\n- Structured execution\n- Transparent reporting\n- Data-driven optimization\n- Milestone-based delivery",
    next: null,
  },
  {
    keys: ["expensive", "too costly", "cheaper", "another agency", "freelancer", "quoted less"],
    answer: "Pricing varies based on depth, systems, and post-launch support.\n\nLower-cost alternatives may lack structure or long-term performance.\n\nWe focus on integrated growth - not just delivery.",
    next: "Would you like a breakdown of what our engagement covers?",
  },
  {
    keys: ["think about it", "will consider", "not sure", "maybe later", "not ready"],
    answer: "Understood.\n\nWhen ready, we can share a tailored roadmap outlining expected milestones and outcomes.\n\nOur Contact form is always open.",
    next: null,
  },
  {
    keys: ["startup", "early stage", "new business", "just starting"],
    answer: "We work with startups regularly.\n\nRecommended stack for startups:\n- MVP Web App + Landing Page + Performance Marketing\n\nFocus: validate fast, drive early traction, build for scale.\n\nResults: one SaaS client saw 42% increase in demo requests within 90 days.",
    next: "What stage is your startup at currently?",
  },
  {
    keys: ["local business", "small business", "local shop"],
    answer: "For local businesses we recommend:\n- Business Website + Local SEO + Google Ads\n\nFocus: lead calls, Google Maps visibility.\n\nResults: one client ranked in top 3 map results within 4 months.",
    next: "What city or region are you targeting?",
  },
  {
    keys: ["ecommerce", "e-commerce", "online store", "shop"],
    answer: "For e-commerce businesses we recommend:\n- Conversion-optimized website + Performance Marketing + Automation\n\nFocus: ROAS improvement, cart recovery, conversion rate.\n\nResults: 28% reduction in CPA, 1.8x ROAS improvement for one client.",
    next: "What platform are you currently on?",
  },
  {
    keys: ["b2b", "consulting", "agency", "professional service"],
    answer: "For B2B businesses we recommend:\n- Authority Website + SEO + Cold Email Outreach\n\nFocus: inbound lead generation and credibility positioning.\n\nResults: one B2B client generated 15 qualified leads within 60 days.",
    next: "What is your target client profile?",
  },
  {
    keys: ["nda", "confidential", "data privacy", "secure"],
    answer: "Yes, we sign NDAs on request.\n\nAll project information and business details are kept strictly confidential throughout and after the engagement.",
    next: null,
  },
  {
    keys: ["who owns", "ownership", "rights", "intellectual property"],
    answer: "You own 100% of everything we build.\n\nAll code, design files, and assets are fully transferred to you upon project completion.",
    next: null,
  },
  {
    keys: ["refund", "money back", "not satisfied", "unhappy"],
    answer: "We follow a structured revision process to ensure deliverables meet agreed scope.\n\nRefund terms are documented in the project agreement before work begins.",
    next: null,
  },
  {
    keys: ["payment", "pay", "upfront", "advance", "installment", "milestone"],
    answer: "We use milestone-based payments aligned to project delivery phases.\n\nYou pay as we deliver - not everything upfront.",
    next: null,
  },
  {
    keys: ["maintenance", "support", "after launch", "post launch"],
    answer: "Yes, we offer post-launch support and maintenance.\n\nScope is agreed upon separately after delivery.",
    next: null,
  },
  {
    keys: ["hosting", "server", "domain", "deployment"],
    answer: "Yes, we assist with hosting and deployment.\n\nWe work with Vercel, AWS, and DigitalOcean depending on project requirements.",
    next: null,
  },
  {
    keys: ["scale", "grow", "upgrade", "expand"],
    answer: "All our solutions are built for scalability from day one.\n\nYou can expand any product or upgrade any package as your business grows. No lock-in agreements.",
    next: null,
  },
  {
    keys: ["analytics", "tracking", "reporting", "metrics"],
    answer: "Yes, we set up analytics and provide monthly performance reports covering traffic, rankings, ad performance, and conversion metrics.",
    next: null,
  },
  {
    keys: ["crm", "integration", "third party", "api"],
    answer: "Yes, we integrate CRMs, third-party APIs, and business tools into your digital products.",
    next: null,
  },
  {
    keys: ["payment gateway", "razorpay", "stripe", "paypal"],
    answer: "Yes, we integrate payment gateways including Razorpay, Stripe, PayPal, and others based on your business model.",
    next: null,
  },
  {
    keys: ["roadmap", "plan", "milestones", "strategy"],
    answer: "Yes, we provide a project roadmap before work begins outlining deliverables, timelines, and expected outcomes.",
    next: null,
  },
  {
    keys: ["wordpress", "wix", "webflow", "tech stack", "technology"],
    answer: "We choose the technology stack based on your business requirements.\n\nWe work with modern frameworks like React and Next.js.\n\nWe do not default to WordPress unless it is the right fit.",
    next: null,
  },
  {
    keys: ["get started", "start", "begin", "how to start", "next step", "onboard"],
    answer: "To get started:\n\n1. Fill out our Contact form on the website.\n2. We schedule a discovery call.\n3. We define scope and send a proposal.\n4. Work begins.",
    next: null,
  },
  {
    keys: ["consultation", "free call", "free consult", "discuss", "meeting"],
    answer: "Yes, we offer a free initial consultation.\n\nWe discuss your goals and recommend the right solution - no obligation.\n\nVisit our Contact page to get started.",
    next: null,
  },
  {
    keys: ["speak to human", "talk to person", "talk to someone", "speak to team", "phone number", "contact number", "call you", "call me"],
    answer: "To speak with our team directly:\n\nPhone: 8329545413\n\nYou can also reach us at sidequesters.in@gmail.com or use the Contact form on the website.",
    next: null,
  },
  {
    keys: ["who are you", "about sidequesters", "about you", "what is sidequesters", "company", "team"],
    answer: "SideQuesters is a digital studio providing end-to-end solutions across design, development, and marketing.\n\nTagline: Your Digital Unfair Advantage.\n\nPhilosophy:\n- Everything in One Place\n- End-to-End Execution\n- Built for Growth\n- True Partnership",
    next: "Would you like to explore our services or see our work?",
  },
  {
    keys: ["case study", "results", "example", "proof", "portfolio", "past work"],
    answer: "Results we have delivered:\n\n- SaaS Startup: 42% increase in demo requests in 90 days\n- E-commerce: 28% reduction in CPA, 1.8x ROAS improvement\n- Local Business: Top 3 Google Maps ranking in 4 months\n- B2B Consultant: 15 qualified leads in 60 days\n- Automation Client: 60% faster response time",
    next: "Would you like to discuss a similar goal for your business?",
  },
  {
    keys: ["contact", "email", "reach out", "reach us", "gmail"],
    answer: "You can reach us at:\n\nEmail: sidequesters.in@gmail.com\n\nOr use the Contact form on our website. We respond within 24 hours.",
    next: null,
  },
];

const offTopicKeys = [
  "world cup", "cricket", "football", "movie", "music", "weather", "news",
  "politics", "recipe", "cook", "travel", "joke", "funny", "chatgpt",
  "openai", "write code", "help me code", "python", "javascript",
  "history", "science", "math", "calculate", "translate", "poem", "story",
];

const getResponse = (input: string): { answer: string; next: string | null } => {
  const lower = input.toLowerCase().trim();

  if (offTopicKeys.some((k) => lower.includes(k))) {
    return {
      answer: "I can assist only with SideQuesters-related queries.\n\nWould you like to explore our services or discuss a project?",
      next: null,
    };
  }

  for (const entry of KB) {
    if (entry.keys.some((k) => lower.includes(k))) {
      return { answer: entry.answer, next: entry.next ?? null };
    }
  }

  return {
    answer: "I don't have specific information on that.\n\nCould you clarify whether you are asking about our services, pricing, timelines, or a specific project?\n\nAlternatively, use our Contact form for detailed queries.",
    next: null,
  };
};

const quickReplies = [
  { label: "Our Services", value: "what services do you offer" },
  { label: "Pricing", value: "pricing cost" },
  { label: "Timeline", value: "how long timeline" },
  { label: "Get Started", value: "get started" },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi, I'm Paai.\n\nI can help you with SideQuesters services, pricing, timelines, and projects.\n\nWhat are you looking to build?",
      isBot: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const { answer, next } = getResponse(text);
      const fullResponse = next ? `${answer}\n\n${next}` : answer;

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: fullResponse,
        isBot: true,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-pink to-purple p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Paai</h3>
                <p className="text-white/70 text-xs">SideQuesters Assistant</p>
              </div>
            </div>
            <Button
              aria-label="Close chat"
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="h-[320px] overflow-y-auto p-4 space-y-3 bg-background/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                    msg.isBot
                      ? "bg-muted text-foreground"
                      : "bg-gradient-to-r from-pink to-purple text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-3 py-2 flex flex-wrap gap-1.5 bg-card border-t border-border/30">
            {quickReplies.map((q) => (
              <button
                key={q.label}
                onClick={() => sendMessage(q.value)}
                className="text-xs px-3 py-1.5 rounded-full border border-pink/30 text-pink hover:bg-pink/10 transition-colors"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border/50 bg-card flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(inputValue)}
              placeholder="Type a message..."
              className="flex-1 rounded-xl bg-background/50 border-border/50 text-sm h-10"
            />
            <Button
              onClick={() => sendMessage(inputValue)}
              size="icon"
              className="rounded-xl bg-gradient-to-r from-pink to-purple hover:opacity-90 h-10 w-10 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
          isOpen
            ? "bg-muted text-foreground"
            : "bg-gradient-to-r from-pink to-purple text-white"
        } hover:scale-105 hover:shadow-xl`}
        aria-label="Open chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Zap className="w-6 h-6" fill="white" />}
      </button>
    </>
  );
};

export default Chatbot;