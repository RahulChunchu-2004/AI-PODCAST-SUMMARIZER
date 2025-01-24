import React from 'react';
import { Camera, Heart, Calendar } from 'lucide-react';

const services = [
  {
    icon: Heart,
    title: 'Wedding Photography',
    description: 'Capture every precious moment of your special day with our professional wedding photography services.',
    price: 'Starting at $2,499'
  },
  {
    icon: Camera,
    title: 'Engagement Sessions',
    description: 'Beautiful pre-wedding photoshoots to celebrate your engagement and create lasting memories.',
    price: 'Starting at $599'
  },
  {
    icon: Calendar,
    title: 'Event Coverage',
    description: 'Professional photography for special events, parties, and celebrations of all kinds.',
    price: 'Starting at $899'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a range of professional photography services to capture your special moments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-6">
                <service.icon className="h-12 w-12 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <p className="text-rose-500 font-semibold">{service.price}</p>
              <button className="mt-6 w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;