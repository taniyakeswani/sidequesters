import avatarAastha from "@/assets/avatar-aastha.png";
import avatarTanya from "@/assets/avatar-tanya.png";
import avatarAarushi from "@/assets/avatar-aarushi.png";

export type Founder = {
  name: string;
  superpower: string;
  description: string;
  avatar: string;
};

export const founders: Founder[] = [
  {
    name: "Aastha",
    superpower: "Clarity over complexity",
    description: "We simplify problems before solving them.",
    avatar: avatarAastha,
  },
  {
    name: "Tanya",
    superpower: "Built for scale",
    description: "Everything we ship is designed to grow with you.",
    avatar: avatarTanya,
  },
  {
    name: "Aarushi",
    superpower: "Partnership mindset",
    description: "We work with clients, not just for them.",
    avatar: avatarAarushi,
  },
];