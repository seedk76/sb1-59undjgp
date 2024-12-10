import React from 'react';
import { motion } from 'framer-motion';
import { SearchBar } from './SearchBar';
import { ServiceCard } from './ServiceCard';
import { FeaturedProvider } from './FeaturedProvider';
import { ParallaxSection } from '../ui/ParallaxSection';
import { SERVICE_ICONS } from '../../lib/serviceIcons';
import { AnimatedContainer } from '../ui/AnimatedContainer';
import type { Provider } from '../../types';

const FEATURED_PROVIDERS: Provider[] = [
  {
    id: '1',
    name: 'Elena\'s Hair Studio',
    services: ['hairSalons'],
    rating: 4.9,
    reviewCount: 128,
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
    location: 'Bucharest, Sector 1'
  },
  {
    id: '2',
    name: 'Pro Electrical Services',
    services: ['electricians'],
    rating: 4.8,
    reviewCount: 93,
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
    location: 'Bucharest, Sector 2'
  },
  {
    id: '3',
    name: 'Green Gardens',
    services: ['landscapers'],
    rating: 4.7,
    reviewCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=800',
    location: 'Bucharest, Sector 3'
  }
];

export const ClientHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ParallaxSection className="relative mb-12 bg-gradient-to-br from-primary-600 to-primary-700 pb-32 pt-16">
        <div className="container mx-auto px-4">
          <SearchBar />
        </div>
      </ParallaxSection>

      <div className="container mx-auto -mt-24 px-4">
        <AnimatedContainer className="mb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {SERVICE_ICONS.map(({ nameKey, icon: Icon }, index) => (
            <motion.div
              key={nameKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ServiceCard nameKey={nameKey} Icon={Icon} />
            </motion.div>
          ))}
        </AnimatedContainer>

        <section className="mb-12">
          <AnimatedContainer>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Featured Providers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURED_PROVIDERS.map((provider, index) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FeaturedProvider provider={provider} />
                </motion.div>
              ))}
            </div>
          </AnimatedContainer>
        </section>
      </div>
    </div>
  );
};