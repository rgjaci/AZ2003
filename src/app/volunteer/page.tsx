// src/app/volunteer/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Image from "next/image";

const opportunities = [
    "Assisting with citizenship application paperwork.",
    "Tutoring applicants for the civics test.",
    "Conducting mock interviews.",
    "Helping with community outreach events.",
    "Providing language support (translators/interpreters).",
    "Mentoring new citizens.",
];

export default function VolunteerPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
           <Image
            src="https://picsum.photos/800/600?random=11"
            alt="Volunteers helping people"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            data-ai-hint="volunteers helping community group diverse"
           />
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-primary">
            Volunteer with Us
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Your time and skills can make a profound difference in the lives of immigrants seeking
            U.S. citizenship. Join our dedicated team of volunteers and help build a more welcoming
            and inclusive community.
          </p>
           <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-4">Why Volunteer?</h2>
           <ul className="list-none space-y-2 text-lg text-muted-foreground mb-6">
                <li className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Directly impact individuals and families.</li>
                <li className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Gain valuable experience and cultural insights.</li>
                <li className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Be part of a supportive and passionate team.</li>
                <li className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Strengthen your community.</li>
           </ul>

        </div>

      </div>
        <Card className="mt-12 shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl md:text-3xl text-center">Volunteer Opportunities</CardTitle>
                <CardDescription className="text-center text-muted-foreground">
                We have various roles available. Find one that matches your interests and availability!
                </CardDescription>
            </CardHeader>
             <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {opportunities.map((opp, index) => (
                    <div key={index} className="flex items-start p-4 border rounded-lg bg-accent">
                         <Check className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                         <p className="text-muted-foreground">{opp}</p>
                    </div>
                ))}
             </CardContent>
             <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">Ready to Join Us?</h3>
                <p className="text-muted-foreground mb-6">
                    Click the button below to fill out our volunteer application form, and we'll be in touch soon!
                </p>
                <Button size="lg" asChild>
                    {/* Link to an actual form or application page */}
                    <a href="/volunteer-application">Apply to Volunteer</a>
                </Button>
             </div>
        </Card>
    </div>
  );
}
