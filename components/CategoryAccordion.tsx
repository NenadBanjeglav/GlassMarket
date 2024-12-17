"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface BaseCategory {
  title: string;
}

interface CategoryChild extends BaseCategory {
  categoryParam: string;
  minVolume: number;
  maxVolume: number;
}

interface Subcategory extends BaseCategory {
  children?: CategoryChild[];
}

interface Category extends BaseCategory {
  subcategories?: Subcategory[];
}

// Categories data with types
const categories: Category[] = [
  {
    title: "Flase",
    subcategories: [
      {
        title: "Flaše za rakiju",
        children: [
          {
            title: "Flaše od 30ml",
            categoryParam: "flase-za-rakiju",
            minVolume: 0,
            maxVolume: 30,
          },
          {
            title: "Flaše od 50ml",
            categoryParam: "flase-za-rakiju",
            minVolume: 30,
            maxVolume: 50,
          },
          {
            title: "Flaše od 0.2L",
            categoryParam: "flase-za-rakiju",
            minVolume: 50,
            maxVolume: 200,
          },
          {
            title: "Flaše od 0.5L",
            categoryParam: "flase-za-rakiju",
            minVolume: 200,
            maxVolume: 500,
          },
          {
            title: "Flaše od 0.7L",
            categoryParam: "flase-za-rakiju",
            minVolume: 500,
            maxVolume: 700,
          },
          {
            title: "Flaše od 1L",
            categoryParam: "flase-za-rakiju",
            minVolume: 700,
            maxVolume: 1000,
          },
          {
            title: "Flaše preko 1L",
            categoryParam: "flase-za-rakiju",
            minVolume: 1000,
            maxVolume: Infinity,
          },
        ],
      },
    ],
  },
];

interface CategoryAccordionProps {
  categoriesData?: Category[];
}

const CategoryAccordion: React.FC<CategoryAccordionProps> = ({
  categoriesData = categories,
}) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubcategory, setOpenSubcategory] = useState<string | null>(null);
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const handleSubcategoryClick = (subcategory: string) => {
    setOpenSubcategory(openSubcategory === subcategory ? null : subcategory);
  };

  const handleParamChange = (
    categoryParam: string,
    minVolume: number,
    maxVolume: number
  ) => {
    router.replace(
      `/?category=${categoryParam}&minVolume=${minVolume}&maxVolume=${maxVolume}`,
      { scroll: false }
    );
  };

  return (
    <div className="w-64 font-sans">
      {categoriesData.map((category, index) => (
        <div key={index} className="border-b">
          <div
            className="cursor-pointer bg-gray-100 px-4 py-2 hover:bg-yellow-400"
            onClick={() => handleCategoryClick(category.title)}
          >
            {category.title}
          </div>
          {openCategory === category.title && category.subcategories && (
            <div className="bg-gray-200">
              {category.subcategories.map((sub, idx) => (
                <div key={idx}>
                  <div
                    className="cursor-pointer px-6 py-2 hover:bg-yellow-300"
                    onClick={() =>
                      sub.children
                        ? handleSubcategoryClick(sub.title)
                        : handleParamChange("", 0, 0)
                    }
                  >
                    {sub.title}
                  </div>
                  {openSubcategory === sub.title && sub.children && (
                    <div className="bg-gray-300">
                      {sub.children.map((child, childIdx) => (
                        <div
                          key={childIdx}
                          className="cursor-pointer px-8 py-2 hover:bg-yellow-200"
                          onClick={() =>
                            handleParamChange(
                              child.categoryParam,
                              child.minVolume,
                              child.maxVolume
                            )
                          }
                        >
                          {child.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryAccordion;
