import { Hero } from '@/components/home/hero/Hero';
import { About } from '@/components/home/About';
import { Services } from '@/components/home/services/Services';
import { Process } from '@/components/home/process/Process';
import { Projects } from '@/components/home/Projects';
import { BrandMarquee } from '@/components/sections/BrandMarquee';
import { Advantages } from '@/components/home/advantages/Advantages';
import { Testimonials } from '@/components/testimonials/section/Testimonials';
import { Faqs } from '@/components/sections/faqs/Faqs';
import { Blogs } from '@/components/home/Blogs';
import { CtaSection } from '@/components/sections/CtaSection';

export default function HomePage() {
  return (
    <>
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
    </>
  );
}
