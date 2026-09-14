import { Hero } from '@/components/home/hero/Hero';
import { About } from '@/components/home/about/About';
import { Services } from '@/components/home/services/Services';
import { Process } from '@/components/home/process/Process';
import { Projects } from '@/components/home/projects/Projects';
import { BrandMarquee } from '@/components/ui/BrandMarquee';
import { Advantages } from '@/components/home/advantages/Advantges';
import { Testimonials } from '@/components/home/testimonials/Testimonials';
import { Faqs } from '@/components/ui/faqs/Faqs';
import { Blogs } from '@/components/home/blogs/Blogs';
import { CtaSection } from '@/components/ui/CtaSection';

export default function HomePage() {
  return (
    <main>
      <Hero />    
      <About />        
      <Services /> 
      <Process />     
      <Projects />     
      <BrandMarquee />
      <Advantages />  
      <CtaSection /> 
      <Faqs />       
      <Testimonials />
      <Blogs />   
    </main>
  );
}
