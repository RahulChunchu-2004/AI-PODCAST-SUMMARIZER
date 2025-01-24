import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const address = "123 Wedding Street, Photo City, PC 12345";
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Let's discuss your special day and create memories that will last a lifetime
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg border border-gray-100">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Event Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-rose-500 text-white py-4 rounded-lg hover:bg-rose-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-rose-50 rounded-xl group-hover:bg-rose-100 transition-colors">
                    <MapPin className="h-6 w-6 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Visit Our Studio</h3>
                    <p className="text-gray-600">{address}</p>
                  </div>
                </div>
                <a 
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-48 bg-gray-200 relative overflow-hidden rounded-lg mt-4 group"
                >
                  <iframe
                    title="Location Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(address)}`}
                    allowFullScreen
                    className="group-hover:scale-105 transition-transform duration-300"
                  ></iframe>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
                    <span className="bg-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                      Open in Google Maps
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-rose-50 rounded-xl group-hover:bg-rose-100 transition-colors">
                    <Phone className="h-6 w-6 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Call Us</h3>
                    <a href="tel:+15551234567" className="text-gray-600 hover:text-rose-500 transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-rose-50 rounded-xl group-hover:bg-rose-100 transition-colors">
                    <Mail className="h-6 w-6 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Email Us</h3>
                    <a href="mailto:contact@eternalmoments.com" className="text-gray-600 hover:text-rose-500 transition-colors">
                      contact@eternalmoments.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;