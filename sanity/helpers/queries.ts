import { defineQuery } from "next-sanity";

export const HERO_QUERY = defineQuery(`
    *[_type == "hero"] | order(name asc)
    `);

// export const ALL_PRODUCT_QUERY = defineQuery(`
//         *[_type == "product"] | order(name asc)
//     `);

// export const ALL_PRODUCT_QUERY = defineQuery(`
//   *[_type == "product" && (!defined($categorySlug) || category->slug.current == $categorySlug)] | order(name asc)
// `);

export const ALL_PRODUCT_QUERY = defineQuery(`
  *[
    _type == "product" &&
    (!defined($categorySlug) || $categorySlug in categories[]->slug.current) &&
    (!defined($volumeSlug) || volume <= $volumeSlug)
  ] | order(volume desc)
`);

export const PRODUCT_BY_SLUG = defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(name asc)[0] {
    ...,
    "relatedCaps": relatedCaps[]->{
  ...
}
  }`
);

export const PRODUCTS_ON_SALE = defineQuery(
  `*[_type == "product" && status == "AKCIJA"] | order(name asc) {
    ...,
    "relatedCaps": relatedCaps[]->{
      ...
    }
  }`
);

export const PRODUCTS_NEW = defineQuery(
  `*[_type == "product" && status == "NOVO"] | order(name asc) {
    ...,
    "relatedCaps": relatedCaps[]->{
      ...
    }
  }`
);

export const PRODUCT_BY_CATEGORY_QUERY = defineQuery(
  `*[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)`
);

export const MAIN_CATEGORIES_QUERY = defineQuery(
  `*[_type == "category" && isMainCategory == true] | order(title asc) {
    title,
    slug,
    "subcategories": subcategories[]->{
      title,
      slug
    }
  }`
);

export const MY_ORDERS_QUERY = defineQuery(`
  *[
      _type == "order" && clerkUserId == $userId
  ] | order(_createdAt desc) {
      ...,
      products[]{
          ...,
          product->
      }
  }
  `);

export const ALL_ORDERS_QUERY = defineQuery(`
  *[
      _type == "order"
  ] | order(_createdAt desc) {
      ...,
      products[]{
          ...,
          product->
      }
  }
  `);

export const ALL_USERS_QUERY = defineQuery(`
  *[
    _type == "user"
  ] | order(_createdAt desc) {
    ...,
    orders[] {
      ...,
      order-> 
    }
  }
`);

export const RETURN_FORM_QUERY = defineQuery(`
*[_type == "pdfFile"]{
      title,
      "url": file.asset->url
    }
  `);

export const ALL_ORDERS_COUNT_QUERY = defineQuery(`
  count(*[_type == "order"])
`);

export const ALL_PRODUCTS_COUNT_QUERY = defineQuery(`
  count(*[_type == "product"])
`);

export const ALL_USERS_COUNT_QUERY = defineQuery(`
  count(*[_type == "user"])
`);

export const ALL_ORDERS_QUERY_SUMMARY = defineQuery(`
  *[_type == "order"] {
      priceOfProducts,
      deliveryPrice,
      totalPrice,
      createdAt,
    }
`);
