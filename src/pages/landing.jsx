import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import React from 'react'
import { Link } from 'react-router-dom';
import companies from "../data/companies.json"
import Autoplay from 'embla-carousel-autoplay';
import faqs from "../data/faq.json"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


const Landing = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center'>
        <h1 className='flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl tracking-tighter py-4'>
          Find Your Dream Job{" "}
          <span className='flex items-center gap-2 sm:gap-6'>
            And Get{" "}
            <img
              src='src\images\logo.png'
              alt='hirewirelogo'
              className='h14 sm:h-24 lg:h-32'
            />
          </span>
        </h1>
        <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl'>
          Explore Thousands of Job Listing or Find The Perfect Candidate
        </p>
      </section>
      <div className='flex gap-6 justify-center'>
        {/* buttons */}
        <Link to='/jobs'>
          <Button variant="blue" size="xl">FIND JOBS</Button>
        </Link>
        <Link to='/post-job'>
          <Button variant="red" size="xl">POST A JOBS</Button>
        </Link>
      </div>

      {/* carousel */}
      <Carousel plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]} className="w-full py-10">
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => {
            return <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
              <img
                src={path}
                key={id}
                className='h-9 sm:h-14 object-contain'
              />
            </CarouselItem>
          })}
        </CarouselContent>
      </Carousel>

      {/* banner */}


      <section className='px-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>FOR JOB SEEKERS</CardTitle>
          </CardHeader>
          <CardContent>
            search and apply for a job
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>FOR EMPLOYEER</CardTitle>
          </CardHeader>
          <CardContent>
            Post Jobs, Manage Applications and find the best candidates.
          </CardContent>
        </Card>
      </section>

      {/* accordian */}
      <section className='px-5'>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => {
            return (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>
    </main>
  )
}

export default Landing;