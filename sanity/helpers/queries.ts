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

export const PRODUCT_BY_CATEGORY_QUERY = defineQuery(
  `*[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)`
);

export const CATEGORIES_QUERY = defineQuery(
  `*[_type == "category"] | order(name asc)`
);

export const MY_ORDERS_QUERY = defineQuery(`
  *[
      _type == "order" && clerkUserId == $userId
  ] | order(orderDate asc) {
      ...,
      products[]{
          ...,
          product->
      }
  }
  `);
