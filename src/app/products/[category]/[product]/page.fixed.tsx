import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MainLayout from "../../../../components/layout/MainLayout";
import Section from "../../../../components/ui/Section";
import Button from "../../../../components/ui/Button";
import { getProduct, getRelatedProducts } from "../../../../lib/api/mockData";

type ProductSpecifications = Record<string, string | number>;

type PageProps = {
  params: {
    category: string;
    product: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const product = await getProduct(params.product);
  
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }
  
  return {
    title: `${product.title} | B2B Showcase`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const productSlug = params.product;
  const product = await getProduct(productSlug);
  
  if (!product) {
    notFound();
  }
  
  const relatedProducts = await getRelatedProducts(product.id);
  
  return (
    <MainLayout>
      <Section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-96 w-full bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                <ul className="space-y-2">
                  {Object.entries(product.specifications || {}).map(([key, value]) => (
                    <li key={key} className="flex justify-between border-b border-gray-100 py-2">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Request Quote
                </Button>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{relatedProduct.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedProduct.description}</p>
                    <Button 
                      as="a"
                      href={`/products/${relatedProduct.category}/${relatedProduct.slug}`}
                      className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}
    </MainLayout>
  );
}
