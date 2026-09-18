import type { Metadata } from 'next';
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
import { getTestimonialsService } from '@/services/server/testimonials.service';
import { getProjectsService } from '@/services/server/projects.service';
import { getBlogsService } from '@/services/server/blogs.service';

/** Titulo, descripcion y Open Graph vienen del layout raiz; aqui solo la canonica. */
export const metadata: Metadata = { alternates: { canonical: '/' } };

export default async function HomePage() {
  const [testimonials, { projects }, { blogs }] = await Promise.all([
    getTestimonialsService(),
    getProjectsService(),
    getBlogsService(),
  ]);

  return (
    <>
      <Hero />    
      <About />        
      <Services /> 
      <Process />     
      <Projects projects={projects} />     
      <BrandMarquee />
      <Advantages />  
      <CtaSection /> 
      <Faqs />       
      <Testimonials testimonials={testimonials} />
      <Blogs blogs={blogs} />   
    </>
  );
}
