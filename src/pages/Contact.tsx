import { useState } from "react";
import { Mail, MapPin, Clock, Linkedin, Instagram } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const FORMSPREE_URL = "https://formspree.io/f/xreaagrz";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    projectType: "",
    customProjectType: "",
    message: "",
  });

  const isCustom = formData.projectType === "custom-service";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    if (isCustom && !formData.customProjectType.trim()) {
      toast({ title: "Please describe your custom requirement", variant: "destructive" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          projectType: isCustom
            ? `Custom Service: ${formData.customProjectType}`
            : formData.projectType || "Not specified",
          message: formData.message,
        }),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you within 24 hours.",
        });

        setFormData({
          fullName: "",
          email: "",
          projectType: "",
          customProjectType: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      toast({
        title: "Something went wrong!",
        description:
          "Please try again or email us directly at sidequesters.in@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let's talk about how we can build your digital unfair advantage.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative bg-card rounded-3xl p-8 md:p-10 shadow-card border border-border/30 overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Full Name */}
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />

                {/* Email */}
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                {/* Project Type */}
                <Select
                  value={formData.projectType}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      projectType: value,
                      customProjectType: "",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it-services">IT Services</SelectItem>
                    <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="custom-service">Custom Service</SelectItem>
                  </SelectContent>
                </Select>

                {isCustom && (
                  <Input
                    type="text"
                    placeholder="Describe your custom requirement..."
                    value={formData.customProjectType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customProjectType: e.target.value,
                      })
                    }
                  />
                )}

                {/* Message */}
                <Textarea
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-sm text-muted-foreground">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sidequesters.in@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-pink" />
                <span>sidequesters.in@gmail.com</span>
              </a>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink" />
                <span>Remote / India</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-pink" />
                <span>We usually respond within 24 hours.</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <a
                href="https://www.linkedin.com/in/sidequesters-in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4 text-pink" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://www.instagram.com/sidequesters.in/?utm_source=ig_web_button_share_sheet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;