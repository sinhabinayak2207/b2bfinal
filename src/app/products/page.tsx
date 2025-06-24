import { Metadata } from "next";
import Section from "../../components/ui/Section";
import FeaturedCategories from "../../components/home/FeaturedCategories";
import FeaturedProducts from "../../components/home/FeaturedProducts";

export const metadata: Metadata = {
  title: 'Products - B2B Showcase',
  description: 'Explore our extensive range of high-quality bulk products including rice, seeds, oil, raw polymers, and bromine salt for your business needs.',
};

export default function ProductsPage() {
  return (
    <>
      <Section background="gradient" paddingY="lg">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">Products</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Explore our extensive range of high-quality bulk products for your business needs.
            We source the finest materials from trusted suppliers worldwide.
          </p>
        </div>
      </Section>
      
      <FeaturedCategories />
      <FeaturedProducts />
    </>
  );
}