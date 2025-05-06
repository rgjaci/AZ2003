// src/app/partner/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, Building, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const partnershipBenefits = [
    { title: "Community Impact", description: "Align your brand with a vital cause, demonstrating corporate social responsibility." },
    { title: "Employee Engagement", description: "Offer meaningful volunteer opportunities for your team." },
    { title: "Brand Visibility", description: "Gain recognition among diverse communities and supporters." },
    { title: "Talent Pool Access", description: "Connect with a diverse and motivated pool of potential employees." },
];

export default function PartnerPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-primary">
            Partner With Us
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Collaborate with Citizenship Bridge Inc. to create a lasting impact on the lives of immigrants
            and strengthen our communities. We welcome partnerships with corporations, foundations, community
            organizations, and educational institutions.
          </p>
          <p className="text-lg text-muted-foreground">
            Together, we can expand our reach, enhance our services, and build bridges to opportunity
            for aspiring U.S. citizens.
          </p>
           <div className="mt-8">
                 <Button size="lg" asChild className="w-full sm:w-auto">
                    <Link href="/contact">
                         <Handshake className="mr-2 h-5 w-5" /> Discuss Partnership
                    </Link>
                </Button>
            </div>
        </div>
         <div className="relative h-96 md:h-[450px] rounded-lg overflow-hidden shadow-lg">
           <Image
            src="https://picsum.photos/800/500?random=13"
            alt="Business handshake or diverse group meeting"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            data-ai-hint="partnership business handshake collaboration diverse"
           />
        </div>
      </div>

       <Card className="shadow-lg mb-12">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl">Why Partner With Citizenship Bridge?</CardTitle>
          <CardDescription className="text-muted-foreground">
            Partnering with us offers mutual benefits and contributes to a more inclusive society.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-6">
          {partnershipBenefits.map((item, index) => (
            <div key={index} className="p-6 border rounded-lg bg-accent h-full">
              <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

       <div className="text-center">
             <h2 className="text-3xl font-semibold tracking-tight mb-4">Ways to Partner</h2>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
                We offer flexible partnership opportunities tailored to your organization's goals, including corporate sponsorships, foundation grants, program collaborations, in-kind donations, and employee volunteer programs.
            </p>
            <Button size="lg" asChild>
                 <Link href="/contact">
                     <Building className="mr-2 h-5 w-5" /> Let's Connect
                 </Link>
            </Button>
       </div>
    </div>
  );
}
