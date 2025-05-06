import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-primary">
            About Citizenship Bridge Inc.
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Citizenship Bridge Inc. is a non-profit organization committed to empowering immigrants
            in the United States on their journey towards naturalization. We believe that becoming
            a U.S. citizen is a transformative step, opening doors to full participation in American
            civic and social life.
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            Our mission is to provide accessible, comprehensive, and trustworthy resources and guidance
            throughout the complex naturalization process. We strive to demystify the requirements,
            prepare applicants for success, and foster a sense of belonging within the community.
          </p>
          <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">Our Vision</h2>
          <p className="text-lg text-muted-foreground mb-4">
            We envision a society where all eligible immigrants have the support and knowledge
            they need to achieve U.S. citizenship, enabling them to fully integrate, contribute,
            and thrive.
          </p>
           <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">Our Values</h2>
           <ul className="list-disc list-inside text-lg text-muted-foreground space-y-2">
                <li>Empowerment: Equipping individuals with knowledge and confidence.</li>
                <li>Accessibility: Providing services regardless of background or means.</li>
                <li>Integrity: Offering accurate and ethical guidance.</li>
                <li>Community: Fostering connection and mutual support.</li>
                <li>Inclusivity: Welcoming immigrants from all walks of life.</li>
           </ul>
        </div>
        <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
           <Image
            src="https://picsum.photos/800/600"
            alt="Team collaborating or helping clients"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            data-ai-hint="team collaboration diverse meeting"
           />
        </div>
      </div>
    </div>
  );
}
