import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Users, HeartHandshake, PiggyBank, Briefcase, Megaphone, ChevronDown } from 'lucide-react';
import { DigitalAssistant } from '@/components/digital-assistant';

const services = [
  {
    icon: FileText,
    title: 'Naturalization Application Assistance',
    description: 'Receive one-on-one guidance through every step of your N-400 application.',
    dataAiHint: 'document application',
  },
  {
    icon: Users,
    title: 'Citizenship Test Preparation',
    description: 'Join workshops, access study materials, and practice with mock interviews.',
     dataAiHint: 'group learning study',
  },
  {
    icon: HeartHandshake,
    title: 'Community Integration Support',
    description: 'Find cultural orientation, language classes, and mentorship opportunities.',
     dataAiHint: 'community connection support',
  },
   {
     icon: Megaphone,
     title: 'Advocacy and Awareness',
     description: 'Learn about our efforts to promote immigrant rights and awareness.',
      dataAiHint: 'advocacy rights awareness',
   },
  {
    icon: PiggyBank,
    title: 'Financial Aid & Scholarships',
    description: 'Explore resources to help cover naturalization application fees.',
     dataAiHint: 'money finance help',
  },
];

const sponsors = [
  { name: 'Sponsor Logo 1', src: '/sponsor1.svg', dataAiHint: 'company logo abstract' },
  { name: 'Sponsor Logo 2', src: '/sponsor2.svg', dataAiHint: 'brand logo modern' },
  { name: 'Sponsor Logo 3', src: '/sponsor3.svg', dataAiHint: 'corporate logo simple' },
  { name: 'Sponsor Logo 4', src: '/sponsor4.svg', dataAiHint: 'partner logo clean' },
  { name: 'Sponsor Logo 5', src: '/sponsor5.svg', dataAiHint: 'tech logo minimal' },
  { name: 'Sponsor Logo 6', src: '/sponsor6.svg', dataAiHint: 'foundation logo elegant' },
   { name: 'Sponsor Logo 7', src: '/sponsor7.svg', dataAiHint: 'sponsor logo geometric' },
   { name: 'Sponsor Logo 8', src: '/sponsor8.svg', dataAiHint: 'logo mark tech' },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section - Digital Assistant */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center py-12 md:py-16 lg:py-20 bg-gradient-to-b from-orange-100 via-white to-white dark:from-orange-900/20 dark:via-background dark:to-background">
        <div className="container px-4 md:px-6 flex flex-col items-center justify-center text-center flex-grow">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
              Your Bridge to U.S. Citizenship
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Ask our AI assistant anything about the naturalization process.
            </p>
          </div>
          <div className="w-full max-w-xl mt-8">
            <DigitalAssistant />
          </div>
           <p className="text-xs text-muted-foreground mt-2">
            Sign up to save chat history and track progress.
          </p>
        </div>
        <a
          href="#about"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground hover:text-primary transition-colors animate-bounce z-10"
          aria-label="Scroll to explore more content"
        >
          <span className="text-sm">Scroll to Explore</span>
          <ChevronDown className="w-6 h-6 mt-1" />
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-accent">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
             <Image
                src="https://picsum.photos/600/400"
                alt="Diverse group smiling"
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                data-ai-hint="diverse group happy community"
              />
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                Our Mission
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Empowering Immigrants on Their Path to Citizenship
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Citizenship Bridge Inc. is dedicated to providing comprehensive guidance and resources for the naturalization process. We help immigrants achieve citizenship and fully integrate into American society, building stronger communities for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
              Our Services
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How We Can Help You
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We offer a range of services designed to support you at every stage of your naturalization journey.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} className="transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <service.icon className="w-8 h-8 text-primary" />
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                    <div className="mt-4 h-24 relative overflow-hidden rounded-md">
                     <Image
                       src={`https://picsum.photos/300/100?random=${index}`}
                       alt={service.title}
                       fill
                       style={{ objectFit: 'cover' }}
                       className="transition-opacity duration-300 ease-in-out group-hover:opacity-75"
                       data-ai-hint={service.dataAiHint}
                     />
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section id="join-us" className="w-full py-12 md:py-24 lg:py-32 bg-accent">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
             <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
              Get Involved
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Join Us & Make a Difference
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Your support helps build bridges to opportunity. Get involved today and help empower immigrants in our community.
            </p>
          </div>
          <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="/volunteer">Volunteer</a>
            </Button>
            <Button size="lg" asChild>
              <a href="/donate">Donate Now</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/partner">Partner With Us</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
           <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Supporters</h2>
             <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
               We are grateful for the generous support of our sponsors and partners.
             </p>
           </div>
          <div className="relative w-full overflow-hidden">
             <div className="flex animate-scroll space-x-16">
              {[...sponsors, ...sponsors].map((sponsor, index) => ( // Duplicate for seamless loop
                <div key={index} className="flex-shrink-0 h-12 w-32 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300">
                  {/* Placeholder SVG - replace with actual image loading */}
                   <Image
                     src={`https://picsum.photos/128/48?random=${index+10}`} // Use picsum for placeholders
                     alt={sponsor.name}
                     width={128}
                     height={48}
                     className="max-h-full max-w-full object-contain"
                     data-ai-hint={sponsor.dataAiHint}
                   />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
