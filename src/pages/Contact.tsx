import { useState } from "react";
import { Mail, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
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

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ fullName: "", email: "", projectType: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <main className="pt-32 pb-24">
        <div className="container mx-auto max-w-[1440px] px-6 lg:px-12">
          {/* Page Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let's talk about how we can build your digital unfair advantage.
            </p>
          </div>

          {/* Contact Form Card */}
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-card rounded-3xl p-8 md:p-10 shadow-card border border-border/30 overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-pink/20 via-lavender/20 to-purple/20 blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-lavender/20 to-pink/10 blur-2xl -z-10" />

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="bg-background/50 border-border/50 rounded-xl h-12 focus:border-pink focus:ring-pink/20"
                    maxLength={100}
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-background/50 border-border/50 rounded-xl h-12 focus:border-pink focus:ring-pink/20"
                    maxLength={255}
                  />
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Project Type
                  </label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, projectType: value })
                    }
                  >
                    <SelectTrigger className="bg-background/50 border-border/50 rounded-xl h-12 focus:border-pink focus:ring-pink/20">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border rounded-xl z-50">
                      <SelectItem value="it-services">IT Services</SelectItem>
                      <SelectItem value="digital-marketing">
                        Digital Marketing
                      </SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <Textarea
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="bg-background/50 border-border/50 rounded-xl min-h-[120px] resize-none focus:border-pink focus:ring-pink/20"
                    maxLength={1000}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full rounded-xl"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink" />
                <span>hello@sidequest.co</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink" />
                <span>Remote / India</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-pink" />
                <span>We usually respond within 24 hours.</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
