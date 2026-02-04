// Centralized founders data so UI/animation components stay small.

import avatarAastha from "@/assets/avatar-aastha.jpg";
import avatarTanya from "@/assets/avatar-tanya.jpg";
import avatarAarushi from "@/assets/avatar-aarushi.jpg";

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
