"use client";

import Link from "next/link";
import MainLayout from "../components/layout/MainLayout";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <MainLayout>
      <Section background="white" paddingY="xl">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <svg
              className="w-32 h-32 text-blue-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-delay-1">
            Page Not Found
          </h1>

          <p className="text-lg text-gray-600 mb-8 animate-fade-in-delay-2">
            We couldn&apos;t find the page you&apos;re looking for. The page might have been moved, 
            deleted, or never existed in the first place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-3">
            <Button as="a" href="/" size="lg">
              Return Home
            </Button>
            <Button as="a" href="/products" variant="secondary" size="lg">
              Browse Products
            </Button>
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg animate-fade-in-delay-4">
            <p className="text-gray-600 mb-4">
              Try searching our site or check out these helpful links:
            </p>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Looking for something specific?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                href="/products" 
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center"
              >
                <svg className="w-6 h-6 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>Products</span>
              </Link>
              <Link 
                href="/services" 
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center"
              >
                <svg className="w-6 h-6 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Services</span>
              </Link>
              <Link 
                href="/contact" 
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center"
              >
                <svg className="w-6 h-6 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </MainLayout>
  );
}
