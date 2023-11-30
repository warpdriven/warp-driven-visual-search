import { AxiosRequestConfig } from "axios";
import { axiosShopline } from "./axios-shopline";

export function product_get(req: Req) {
  return axiosShopline<unknown, Res>({
    url: "/api/product/products.json",
    ...req,
  });
}

export interface Req extends AxiosRequestConfig {
  params: {
    handle: string;
  };
}

export interface Res {
  products: Product[];
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  url: string;
  description: string;
  brand: null;
  vendor: null;
  tags: string[];
  images: string[];
  price: number;
  options: [
    {
      name: "COLOR";
      values: ["Geen", "Grey"];
      values_images: {
        Geen: "";
        Grey: "";
      };
    },
    {
      name: "SIZE";
      values: ["S", "M", "L", "XL", "XXL"];
      values_images: {
        S: "";
        M: "";
        L: "";
        XL: "";
        XXL: "";
      };
    },
    {
      name: "GIFT BOX";
      values: ["Yes", "No"];
      values_images: {
        Yes: "";
        No: "";
      };
    }
  ];
  variants: [
    {
      id: "18060780072088088546291763";
      barcode: "";
      title: "Geen · S · Yes";
      option1: "Geen";
      option2: "S";
      option3: "Yes";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Geen · S · Yes";
      options: ["Geen", "S", "Yes"];
      weight: 20.0;
      price: 5969;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
      public_title: "Geen · S · Yes";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088546411763";
      barcode: "";
      title: "Geen · S · No";
      option1: "Geen";
      option2: "S";
      option3: "No";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Geen · S · No";
      options: ["Geen", "S", "No"];
      weight: 20.0;
      price: 5500;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
      public_title: "Geen · S · No";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088546481763";
      barcode: "";
      title: "Geen · M · Yes";
      option1: "Geen";
      option2: "M";
      option3: "Yes";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Geen · M · Yes";
      options: ["Geen", "M", "Yes"];
      weight: 20.0;
      price: 5399;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
      public_title: "Geen · M · Yes";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088546551763";
      barcode: "";
      title: "Geen · M · No";
      option1: "Geen";
      option2: "M";
      option3: "No";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Geen · M · No";
      options: ["Geen", "M", "No"];
      weight: 20.0;
      price: 4900;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
      public_title: "Geen · M · No";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088546611763";
      barcode: "";
      title: "Geen · L · Yes";
      option1: "Geen";
      option2: "L";
      option3: "Yes";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Geen · L · Yes";
      options: ["Geen", "L", "Yes"];
      weight: 20.0;
      price: 5399;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
      public_title: "Geen · L · Yes";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088546681763";
      barcode: "";
      title: "Geen · L · No";
      option1: "Geen";
      option2: "L";
      option3: "No";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Geen · L · No";
      options: ["Geen", "L", "No"];
      weight: 20.0;
      price: 4900;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
      public_title: "Geen · L · No";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088546741763";
      barcode: "";
      title: "Geen · XL · Yes";
      option1: "Geen";
      option2: "XL";
      option3: "Yes";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Geen · XL · Yes";
      options: ["Geen", "XL", "Yes"];
      weight: 20.0;
      price: 5399;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
      public_title: "Geen · XL · Yes";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088546811763";
      barcode: "";
      title: "Geen · XL · No";
      option1: "Geen";
      option2: "XL";
      option3: "No";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Geen · XL · No";
      options: ["Geen", "XL", "No"];
      weight: 20.0;
      price: 4900;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
      public_title: "Geen · XL · No";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088546871763";
      barcode: "";
      title: "Geen · XXL · Yes";
      option1: "Geen";
      option2: "XXL";
      option3: "Yes";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Geen · XXL · Yes";
      options: ["Geen", "XXL", "Yes"];
      weight: 20.0;
      price: 5399;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
      public_title: "Geen · XXL · Yes";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088546941763";
      barcode: "";
      title: "Geen · XXL · No";
      option1: "Geen";
      option2: "XXL";
      option3: "No";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Geen · XXL · No";
      options: ["Geen", "XXL", "No"];
      weight: 20.0;
      price: 4900;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
      public_title: "Geen · XXL · No";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088547001763";
      barcode: "";
      title: "Grey · S · Yes";
      option1: "Grey";
      option2: "S";
      option3: "Yes";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Grey · S · Yes";
      options: ["Grey", "S", "Yes"];
      weight: 20.0;
      price: 5399;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
      public_title: "Grey · S · Yes";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088547071763";
      barcode: "";
      title: "Grey · S · No";
      option1: "Grey";
      option2: "S";
      option3: "No";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Grey · S · No";
      options: ["Grey", "S", "No"];
      weight: 20.0;
      price: 4900;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
      public_title: "Grey · S · No";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088547131763";
      barcode: "";
      title: "Grey · M · Yes";
      option1: "Grey";
      option2: "M";
      option3: "Yes";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Grey · M · Yes";
      options: ["Grey", "M", "Yes"];
      weight: 20.0;
      price: 5399;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
      public_title: "Grey · M · Yes";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088547191763";
      barcode: "";
      title: "Grey · M · No";
      option1: "Grey";
      option2: "M";
      option3: "No";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Grey · M · No";
      options: ["Grey", "M", "No"];
      weight: 20.0;
      price: 4900;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
      public_title: "Grey · M · No";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088547251763";
      barcode: "";
      title: "Grey · L · Yes";
      option1: "Grey";
      option2: "L";
      option3: "Yes";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Grey · L · Yes";
      options: ["Grey", "L", "Yes"];
      weight: 20.0;
      price: 5399;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
      public_title: "Grey · L · Yes";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088547311763";
      barcode: "";
      title: "Grey · L · No";
      option1: "Grey";
      option2: "L";
      option3: "No";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Grey · L · No";
      options: ["Grey", "L", "No"];
      weight: 20.0;
      price: 4900;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
      public_title: "Grey · L · No";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088547371763";
      barcode: "";
      title: "Grey · XL · Yes";
      option1: "Grey";
      option2: "XL";
      option3: "Yes";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Grey · XL · Yes";
      options: ["Grey", "XL", "Yes"];
      weight: 20.0;
      price: 5399;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
      public_title: "Grey · XL · Yes";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088547431763";
      barcode: "";
      title: "Grey · XL · No";
      option1: "Grey";
      option2: "XL";
      option3: "No";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Grey · XL · No";
      options: ["Grey", "XL", "No"];
      weight: 20.0;
      price: 4900;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
      public_title: "Grey · XL · No";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088547491763";
      barcode: "";
      title: "Grey · XXL · Yes";
      option1: "Grey";
      option2: "XXL";
      option3: "Yes";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Grey · XXL · Yes";
      options: ["Grey", "XXL", "Yes"];
      weight: 20.0;
      price: 5399;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
      public_title: "Grey · XXL · Yes";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    },
    {
      id: "18060780072088088547551763";
      barcode: "";
      title: "Grey · XXL · No";
      option1: "Grey";
      option2: "XXL";
      option3: "No";
      option4: null;
      option5: null;
      sku: "";
      name: "Bohemian One-Shoulder Lace Dress · Grey · XXL · No";
      options: ["Grey", "XXL", "No"];
      weight: 20.0;
      price: 4900;
      available: true;
      featured_image: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
      public_title: "Grey · XXL · No";
      weight_unit: "g";
      compare_at_price: 0;
      inventory_policy: "continue";
      inventory_tracker: true;
      requires_selling_plan: null;
      selling_plan_alloactions: null;
      featured_image_v2: {
        url: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
        height: 1333;
        width: 1000;
        alt: null;
      };
    }
  ];
  visible: true;
  featured_image: string;
  medias: [
    {
      resource: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
      cover: null;
      type: "IMAGE";
      alt: null;
    },
    {
      resource: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
      cover: null;
      type: "IMAGE";
      alt: null;
    },
    {
      resource: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0023-SKU-01.jpg?w=1000&h=1333";
      cover: null;
      type: "IMAGE";
      alt: null;
    },
    {
      resource: "https://img-va.myshopline.com/image/store/2007668530/1684913343872/1-0000-04-0000-06-psd-0022-SKU-02.jpg?w=1000&h=1333";
      cover: null;
      type: "IMAGE";
      alt: null;
    }
  ];
  sold_out: boolean;
  price_min: number;
  price_max: number;
  price_varies: boolean;
  compare_at_price: number;
  compare_at_price_min: number;
  compare_at_price_max: number;
  compare_at_price_varies: boolean;
  created_at: string;
  published_at: string;
  requires_selling_plan: boolean;
  selling_plan_groups: null;
  featured_image_v2: {
    url: string;
    height: number;
    width: number;
    alt: null;
  };
  custom_category_name: string;
}
