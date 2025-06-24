import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MainLayout from "../../../../components/layout/MainLayout";
import Section from "../../../../components/ui/Section";
import Button from "../../../../components/ui/Button";
import { getProduct, getRelatedProducts } from "../../../../lib/api/mockData";

type ProductSpecifications = Record<string, string | number>;

interface ProductPageParams {
  params: {
    category: string;
    product: string;
  };
}

export async function generateMetadata(
  { params }: ProductPageParams
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

export default async function ProductPage({ params }: ProductPageParams) {
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
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100">
                <Image 
                  src={product.image} 
                  alt={product.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            
            {/* Product Info */}
            <div className="w-full md:w-1/2">
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium mb-4">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace(/-/g, ' ')}
              </span>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>
              
              <p className="text-gray-600 mb-8 text-lg">
                {product.description}
              </p>
              
              {/* Specifications */}
              {product.specifications && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Specifications</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      {Object.entries(product.specifications as ProductSpecifications).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <dt className="text-sm font-medium text-gray-500">{key}</dt>
                          <dd className="mt-1 text-base font-medium text-gray-900">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  href={`mailto:sales@b2bshowcase.com?subject=Inquiry about ${encodeURIComponent(product.title)}&body=I am interested in learning more about ${encodeURIComponent(product.title)}. Please provide additional information.`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  Request Quote
                </Button>
                <Button 
                  href="/contact" 
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
                  <div className="relative aspect-video w-full bg-gray-100">
                    <Image 
                      src={relatedProduct.image} 
                      alt={relatedProduct.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{relatedProduct.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{relatedProduct.description}</p>
                    <Button 
                      as="a" 
                      href={`/products/${relatedProduct.category}/${relatedProduct.slug}`}
                      className="w-full justify-center bg-gray-800 hover:bg-gray-900 text-white"
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