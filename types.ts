import React from 'react';

export interface Product {
  id: string;
  rank: number;
  image: string;
  title: string;
  revenue: string;
  priceRange: string;
}

export interface FeatureCardProps {
  // Added missing React import to resolve React.ReactNode type namespace
  icon: React.ReactNode;
  title: string;
  description: string;
}