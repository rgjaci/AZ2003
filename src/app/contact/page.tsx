import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";


export default function ContactPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-12 text-center text-primary">
        Get In Touch
      </h1>
      <div className="grid md:grid-cols-2 gap-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Send Us a Message</CardTitle>
            <CardDescription>
              Have questions? Fill out the form below and we'll get back to you soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="name">Name</Label>
                   <Input id="name" placeholder="Your Name" required />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="email">Email</Label>
                   <Input id="email" type="email" placeholder="your.email@example.com" required />
                 </div>
              </div>
               <div className="space-y-2">
                 <Label htmlFor="subject">Subject</Label>
                 <Input id="subject" placeholder="Subject of your message" required />
               </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here." rows={5} required />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
            <h2 className="text-3xl font-semibold tracking-tight">Contact Information</h2>
            <p className="text-muted-foreground text-lg">
                We're here to help! Reach out through any of the methods below.
            </p>
             <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <a href="mailto:info@citizenshipbridge.org" className="text-muted-foreground hover:text-primary transition-colors">
                        info@citizenshipbridge.org
                    </a>
                </div>
             </div>
             <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <a href="tel:+1-555-123-4567" className="text-muted-foreground hover:text-primary transition-colors">
                        +1 (555) 123-4567
                    </a>
                     <p className="text-sm text-muted-foreground">(Mon-Fri, 9am - 5pm EST)</p>
                </div>
             </div>
              <div className="flex items-start gap-4">
                 <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                 <div>
                     <h3 className="font-semibold">Visit Us (By Appointment)</h3>
                     <p className="text-muted-foreground">
                         123 Liberty Lane<br />
                         Suite 400<br />
                         Anytown, USA 12345
                     </p>
                 </div>
              </div>
        </div>
      </div>
    </div>
  );
}
