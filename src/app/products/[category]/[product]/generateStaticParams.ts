import { products } from '../../../../lib/api/mockData';

interface ProductParams {
  category: string;
  product: string;
}

export async function generateStaticParams(): Promise<ProductParams[]> {
  return products.map(product => ({
    category: product.category,
    product: product.slug,
  }));
}

export default generateStaticParams;
