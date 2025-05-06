// src/app/donate/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Gift, Heart } from "lucide-react";
import Image from "next/image";

const donationImpact = [
    { amount: "$25", description: "Provides study materials for one citizenship applicant." },
    { amount: "$50", description: "Supports a mock interview session." },
    { amount: "$100", description: "Helps cover partial costs for application assistance." },
    { amount: "$725", description: "Covers the full USCIS application fee for one eligible individual (scholarship fund)." },
];

export default function DonatePage() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
       <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-primary">
            Support Our Mission
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Your generous donation empowers immigrants on their path to U.S. citizenship. Every contribution,
            no matter the size, helps provide vital resources, guidance, and support to those navigating the
            complex naturalization process.
          </p>
          <p className="text-lg text-muted-foreground">
            By donating to Citizenship Bridge Inc., you invest in stronger individuals, families, and communities.
            Help us build bridges to opportunity and belonging.
          </p>
           <div className="mt-8">
                 {/* Replace with actual donation button/link to platform */}
                <Button size="lg" className="w-full sm:w-auto">
                    <Heart className="mr-2 h-5 w-5" /> Donate Now
                </Button>
            </div>
        </div>
         <div className="relative h-96 md:h-[450px] rounded-lg overflow-hidden shadow-lg">
           <Image
            src="https://picsum.photos/800/500?random=12"
            alt="Hands holding a plant or giving money"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            data-ai-hint="donation charity giving support hands"
           />
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl">Your Impact</CardTitle>
          <CardDescription className="text-muted-foreground">
            See how your contribution makes a difference:
          </CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {donationImpact.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 border rounded-lg bg-accent h-full">
              <DollarSign className="h-10 w-10 text-primary mb-3" />
              <p className="text-2xl font-semibold mb-2">{item.amount}</p>
              <p className="text-muted-foreground flex-grow">{item.description}</p>
            </div>
          ))}
        </CardContent>
         <CardFooter className="flex-col items-center text-center pt-6">
             <p className="text-muted-foreground mb-4">
                 Citizenship Bridge Inc. is a 501(c)(3) non-profit organization. Your donation is tax-deductible to the extent allowed by law.
             </p>
             {/* Replace with actual donation button/link to platform */}
             <Button size="lg">
                <Gift className="mr-2 h-5 w-5" /> Make a Secure Donation
            </Button>
         </CardFooter>
      </Card>
    </div>
  );
}
