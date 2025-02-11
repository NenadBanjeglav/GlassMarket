/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type User = {
  _id: string;
  _type: "user";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  clerkUserId?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: {
    city?: string;
    street?: string;
    postalCode?: string;
  };
  companyName?: string;
  pib?: string;
  orders?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "order";
  }>;
  createdAt?: string;
  userStatus?: "active" | "banned";
};

export type PdfFile = {
  _id: string;
  _type: "pdfFile";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  file?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
    };
    _type: "file";
  };
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type Order = {
  _id: string;
  _type: "order";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  orderNumber?: string;
  clerkUserId?: string;
  customerName?: string;
  email?: string;
  phone?: string;
  city?: string;
  street?: string;
  postalCode?: string;
  paymentMethod?: "bankTransfer" | "cashOnDelivery";
  deliveryMethod?: "store" | "delivery";
  companyName?: string;
  pib?: string;
  message?: string;
  priceOfProducts?: number;
  deliveryPrice?: number;
  totalPrice?: number;
  products?: Array<{
    product?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "product";
    };
    quantity?: number;
    _key: string;
  }>;
  createdAt?: string;
  status?: "confirmed" | "shipped" | "cancelled" | "readyForPickUp";
};

export type Product = {
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  description?: string;
  volume?: number;
  width?: number;
  height?: number;
  weight?: number;
  price?: number;
  discount?: number;
  categories?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  inStock?: boolean;
  status?: "NOVO" | "AKCIJA";
  relatedCaps?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "product";
  }>;
};

export type Hero = {
  _id: string;
  _type: "hero";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  description?: string;
  badge?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  isActive?: boolean;
};

export type Category = {
  _id: string;
  _type: "category";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  isMainCategory?: boolean;
  description?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  subcategories?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type Slug = {
  _type: "slug";
  current?: string;
  source?: string;
};

export type AllSanitySchemaTypes = SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | Geopoint | User | PdfFile | SanityFileAsset | Order | Product | Hero | Category | SanityImageCrop | SanityImageHotspot | SanityImageAsset | SanityAssetSourceData | SanityImageMetadata | Slug;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./sanity/helpers/queries.ts
// Variable: HERO_QUERY
// Query: *[_type == "hero"] | order(name asc)
export type HERO_QUERYResult = Array<{
  _id: string;
  _type: "hero";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  description?: string;
  badge?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  isActive?: boolean;
}>;
// Variable: ALL_PRODUCT_QUERY
// Query: *[    _type == "product" &&    (!defined($categorySlug) || $categorySlug in categories[]->slug.current) &&    (!defined($volumeSlug) || volume <= $volumeSlug)  ] | order(volume desc)
export type ALL_PRODUCT_QUERYResult = Array<{
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  description?: string;
  volume?: number;
  width?: number;
  height?: number;
  weight?: number;
  price?: number;
  discount?: number;
  categories?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  inStock?: boolean;
  status?: "AKCIJA" | "NOVO";
  relatedCaps?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "product";
  }>;
}>;
// Variable: PRODUCT_BY_SLUG
// Query: *[_type == "product" && slug.current == $slug] | order(name asc)[0] {    ...,    "relatedCaps": relatedCaps[]->{  ...}  }
export type PRODUCT_BY_SLUGResult = {
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  description?: string;
  volume?: number;
  width?: number;
  height?: number;
  weight?: number;
  price?: number;
  discount?: number;
  categories?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  inStock?: boolean;
  status?: "AKCIJA" | "NOVO";
  relatedCaps: Array<{
    _id: string;
    _type: "product";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    name?: string;
    slug?: Slug;
    image?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
    description?: string;
    volume?: number;
    width?: number;
    height?: number;
    weight?: number;
    price?: number;
    discount?: number;
    categories?: Array<{
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      _key: string;
      [internalGroqTypeReferenceTo]?: "category";
    }>;
    inStock?: boolean;
    status?: "AKCIJA" | "NOVO";
    relatedCaps?: Array<{
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      _key: string;
      [internalGroqTypeReferenceTo]?: "product";
    }>;
  }> | null;
} | null;
// Variable: PRODUCTS_ON_SALE
// Query: *[_type == "product" && status == "AKCIJA"] | order(name asc) {    ...,    "relatedCaps": relatedCaps[]->{      ...    }  }
export type PRODUCTS_ON_SALEResult = Array<{
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  description?: string;
  volume?: number;
  width?: number;
  height?: number;
  weight?: number;
  price?: number;
  discount?: number;
  categories?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  inStock?: boolean;
  status?: "AKCIJA" | "NOVO";
  relatedCaps: Array<{
    _id: string;
    _type: "product";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    name?: string;
    slug?: Slug;
    image?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
    description?: string;
    volume?: number;
    width?: number;
    height?: number;
    weight?: number;
    price?: number;
    discount?: number;
    categories?: Array<{
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      _key: string;
      [internalGroqTypeReferenceTo]?: "category";
    }>;
    inStock?: boolean;
    status?: "AKCIJA" | "NOVO";
    relatedCaps?: Array<{
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      _key: string;
      [internalGroqTypeReferenceTo]?: "product";
    }>;
  }> | null;
}>;
// Variable: PRODUCTS_NEW
// Query: *[_type == "product" && status == "NOVO"] | order(name asc) {    ...,    "relatedCaps": relatedCaps[]->{      ...    }  }
export type PRODUCTS_NEWResult = Array<{
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  description?: string;
  volume?: number;
  width?: number;
  height?: number;
  weight?: number;
  price?: number;
  discount?: number;
  categories?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  inStock?: boolean;
  status?: "AKCIJA" | "NOVO";
  relatedCaps: Array<{
    _id: string;
    _type: "product";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    name?: string;
    slug?: Slug;
    image?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
    description?: string;
    volume?: number;
    width?: number;
    height?: number;
    weight?: number;
    price?: number;
    discount?: number;
    categories?: Array<{
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      _key: string;
      [internalGroqTypeReferenceTo]?: "category";
    }>;
    inStock?: boolean;
    status?: "AKCIJA" | "NOVO";
    relatedCaps?: Array<{
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      _key: string;
      [internalGroqTypeReferenceTo]?: "product";
    }>;
  }> | null;
}>;
// Variable: PRODUCT_BY_CATEGORY_QUERY
// Query: *[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)
export type PRODUCT_BY_CATEGORY_QUERYResult = Array<{
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  description?: string;
  volume?: number;
  width?: number;
  height?: number;
  weight?: number;
  price?: number;
  discount?: number;
  categories?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  inStock?: boolean;
  status?: "AKCIJA" | "NOVO";
  relatedCaps?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "product";
  }>;
}>;
// Variable: MAIN_CATEGORIES_QUERY
// Query: *[_type == "category" && isMainCategory == true] | order(title asc) {    ...,    "subcategories": subcategories[]->{      ...    }  }
export type MAIN_CATEGORIES_QUERYResult = Array<{
  _id: string;
  _type: "category";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  isMainCategory?: boolean;
  description?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  subcategories: Array<{
    _id: string;
    _type: "category";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title?: string;
    slug?: Slug;
    isMainCategory?: boolean;
    description?: string;
    image?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
    subcategories?: Array<{
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      _key: string;
      [internalGroqTypeReferenceTo]?: "category";
    }>;
  }> | null;
}>;
// Variable: NON_MAIN_CATEGORIES_QUERY
// Query: *[_type == "category" && isMainCategory != true] | order(createdAt asc) {    ...  }
export type NON_MAIN_CATEGORIES_QUERYResult = Array<{
  _id: string;
  _type: "category";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  isMainCategory?: boolean;
  description?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  subcategories?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
}>;
// Variable: GET_ALL_CATEGORIES_QUERY
// Query: *[_type == 'category'] | order(title asc)
export type GET_ALL_CATEGORIES_QUERYResult = Array<{
  _id: string;
  _type: "category";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  isMainCategory?: boolean;
  description?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  subcategories?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
}>;
// Variable: MY_ORDERS_QUERY
// Query: *[      _type == "order" && clerkUserId == $userId  ] | order(_createdAt desc) {      ...,      products[]{          ...,          product->      }  }
export type MY_ORDERS_QUERYResult = Array<{
  _id: string;
  _type: "order";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  orderNumber?: string;
  clerkUserId?: string;
  customerName?: string;
  email?: string;
  phone?: string;
  city?: string;
  street?: string;
  postalCode?: string;
  paymentMethod?: "bankTransfer" | "cashOnDelivery";
  deliveryMethod?: "delivery" | "store";
  companyName?: string;
  pib?: string;
  message?: string;
  priceOfProducts?: number;
  deliveryPrice?: number;
  totalPrice?: number;
  products: Array<{
    product: {
      _id: string;
      _type: "product";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      name?: string;
      slug?: Slug;
      image?: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
      };
      description?: string;
      volume?: number;
      width?: number;
      height?: number;
      weight?: number;
      price?: number;
      discount?: number;
      categories?: Array<{
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        _key: string;
        [internalGroqTypeReferenceTo]?: "category";
      }>;
      inStock?: boolean;
      status?: "AKCIJA" | "NOVO";
      relatedCaps?: Array<{
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        _key: string;
        [internalGroqTypeReferenceTo]?: "product";
      }>;
    } | null;
    quantity?: number;
    _key: string;
  }> | null;
  createdAt?: string;
  status?: "cancelled" | "confirmed" | "readyForPickUp" | "shipped";
}>;
// Variable: ALL_ORDERS_QUERY
// Query: *[      _type == "order"  ] | order(_createdAt desc) {      ...,      products[]{          ...,          product->      }  }
export type ALL_ORDERS_QUERYResult = Array<{
  _id: string;
  _type: "order";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  orderNumber?: string;
  clerkUserId?: string;
  customerName?: string;
  email?: string;
  phone?: string;
  city?: string;
  street?: string;
  postalCode?: string;
  paymentMethod?: "bankTransfer" | "cashOnDelivery";
  deliveryMethod?: "delivery" | "store";
  companyName?: string;
  pib?: string;
  message?: string;
  priceOfProducts?: number;
  deliveryPrice?: number;
  totalPrice?: number;
  products: Array<{
    product: {
      _id: string;
      _type: "product";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      name?: string;
      slug?: Slug;
      image?: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
      };
      description?: string;
      volume?: number;
      width?: number;
      height?: number;
      weight?: number;
      price?: number;
      discount?: number;
      categories?: Array<{
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        _key: string;
        [internalGroqTypeReferenceTo]?: "category";
      }>;
      inStock?: boolean;
      status?: "AKCIJA" | "NOVO";
      relatedCaps?: Array<{
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        _key: string;
        [internalGroqTypeReferenceTo]?: "product";
      }>;
    } | null;
    quantity?: number;
    _key: string;
  }> | null;
  createdAt?: string;
  status?: "cancelled" | "confirmed" | "readyForPickUp" | "shipped";
}>;
// Variable: ALL_USERS_QUERY
// Query: *[    _type == "user"  ] | order(_createdAt desc) {    ...,    orders[] {      ...,      order->     }  }
export type ALL_USERS_QUERYResult = Array<{
  _id: string;
  _type: "user";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  clerkUserId?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: {
    city?: string;
    street?: string;
    postalCode?: string;
  };
  companyName?: string;
  pib?: string;
  orders: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    order: null;
  }> | null;
  createdAt?: string;
  userStatus?: "active" | "banned";
}>;
// Variable: RETURN_FORM_QUERY
// Query: *[_type == "pdfFile"]{      title,      "url": file.asset->url    }
export type RETURN_FORM_QUERYResult = Array<{
  title: string | null;
  url: string | null;
}>;
// Variable: ALL_ORDERS_COUNT_QUERY
// Query: count(*[_type == "order"])
export type ALL_ORDERS_COUNT_QUERYResult = number;
// Variable: ALL_PRODUCTS_COUNT_QUERY
// Query: count(*[_type == "product"])
export type ALL_PRODUCTS_COUNT_QUERYResult = number;
// Variable: ALL_USERS_COUNT_QUERY
// Query: count(*[_type == "user"])
export type ALL_USERS_COUNT_QUERYResult = number;
// Variable: ALL_ORDERS_QUERY_SUMMARY
// Query: *[_type == "order"] {      priceOfProducts,      deliveryPrice,      totalPrice,      createdAt,    }
export type ALL_ORDERS_QUERY_SUMMARYResult = Array<{
  priceOfProducts: number | null;
  deliveryPrice: number | null;
  totalPrice: number | null;
  createdAt: string | null;
}>;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "\n    *[_type == \"hero\"] | order(name asc)\n    ": HERO_QUERYResult;
    "\n  *[\n    _type == \"product\" &&\n    (!defined($categorySlug) || $categorySlug in categories[]->slug.current) &&\n    (!defined($volumeSlug) || volume <= $volumeSlug)\n  ] | order(volume desc)\n": ALL_PRODUCT_QUERYResult;
    "*[_type == \"product\" && slug.current == $slug] | order(name asc)[0] {\n    ...,\n    \"relatedCaps\": relatedCaps[]->{\n  ...\n}\n  }": PRODUCT_BY_SLUGResult;
    "*[_type == \"product\" && status == \"AKCIJA\"] | order(name asc) {\n    ...,\n    \"relatedCaps\": relatedCaps[]->{\n      ...\n    }\n  }": PRODUCTS_ON_SALEResult;
    "*[_type == \"product\" && status == \"NOVO\"] | order(name asc) {\n    ...,\n    \"relatedCaps\": relatedCaps[]->{\n      ...\n    }\n  }": PRODUCTS_NEWResult;
    "*[_type == \"product\" && references(*[_type == \"category\" && slug.current == $categorySlug]._id)] | order(name asc)": PRODUCT_BY_CATEGORY_QUERYResult;
    "*[_type == \"category\" && isMainCategory == true] | order(title asc) {\n    ...,\n    \"subcategories\": subcategories[]->{\n      ...\n    }\n  }": MAIN_CATEGORIES_QUERYResult;
    "*[_type == \"category\" && isMainCategory != true] | order(createdAt asc) {\n    ...\n  }": NON_MAIN_CATEGORIES_QUERYResult;
    "*[_type == 'category'] | order(title asc)": GET_ALL_CATEGORIES_QUERYResult;
    "\n  *[\n      _type == \"order\" && clerkUserId == $userId\n  ] | order(_createdAt desc) {\n      ...,\n      products[]{\n          ...,\n          product->\n      }\n  }\n  ": MY_ORDERS_QUERYResult;
    "\n  *[\n      _type == \"order\"\n  ] | order(_createdAt desc) {\n      ...,\n      products[]{\n          ...,\n          product->\n      }\n  }\n  ": ALL_ORDERS_QUERYResult;
    "\n  *[\n    _type == \"user\"\n  ] | order(_createdAt desc) {\n    ...,\n    orders[] {\n      ...,\n      order-> \n    }\n  }\n": ALL_USERS_QUERYResult;
    "\n*[_type == \"pdfFile\"]{\n      title,\n      \"url\": file.asset->url\n    }\n  ": RETURN_FORM_QUERYResult;
    "\n  count(*[_type == \"order\"])\n": ALL_ORDERS_COUNT_QUERYResult;
    "\n  count(*[_type == \"product\"])\n": ALL_PRODUCTS_COUNT_QUERYResult;
    "\n  count(*[_type == \"user\"])\n": ALL_USERS_COUNT_QUERYResult;
    "\n  *[_type == \"order\"] {\n      priceOfProducts,\n      deliveryPrice,\n      totalPrice,\n      createdAt,\n    }\n": ALL_ORDERS_QUERY_SUMMARYResult;
  }
}
