import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import Recommendations from './Recommendations';
import CallToAction from './CallToAction';
import Footer from './Footer';


function EntryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Recommendations />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default EntryPage;


// import React from 'react'

// const EntryPage = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default EntryPage
