export interface ProductVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  image?: {
    url: string;
  };
  product: {
    id: string;
    title: string;
    handle: string;
  };
}
