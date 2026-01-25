import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import avatarAastha from "@/assets/avatar-aastha.png";
import avatarTanya from "@/assets/avatar-tanya.png";
import avatarAarushi from "@/assets/avatar-aarushi.png";

const founders = [
  {
    name: "Aastha",
    role: "Design & Creative",
    avatar: avatarAastha,
    skills: ["UI/UX Design", "Brand Design", "Visual Systems"],
    gradient: "from-pink/20 to-lavender/20",
  },
  {
    name: "Tanya",
    role: "Technology & Development",
    avatar: avatarTanya,
    skills: ["Web Development", "App Development", "Chatbots & Automation"],
    gradient: "from-lavender/20 to-purple/20",
  },
  {
    name: "Aarushi",
    role: "Marketing & Strategy",
    avatar: avatarAarushi,
    skills: ["Digital Marketing", "Ads & Growth Strategy", "SEO & Brand Visibility"],
    gradient: "from-purple/20 to-magenta/20",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-32 pb-24">
        <div className="container mx-auto max-w-[1440px] px-6 lg:px-12">
          {/* Page Title Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three minds. One mission. Building digital unfair advantages.
            </p>
          </div>

          {/* Founders Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className={`bg-gradient-to-br ${founder.gradient} bg-card rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/30`}
              >
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-pink/30 to-lavender/30 p-1">
                    <img
                      src={founder.avatar}
                      alt={`${founder.name} avatar`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Name & Role */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {founder.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {founder.role}
                  </p>
                </div>

                {/* Skills */}
                <ul className="space-y-3">
                  {founder.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-pink flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
