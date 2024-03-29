export type GalleryType = {
  id: string | number;
  title: string;
  image: string;
  url:string;
};

export type BannerType = {
  heading: string;
  subheading: string;
  image: string;
  gallery?: GalleryType[];
};
export interface PageInfo {
  title: string;
  description: string;
  banner: BannerType;
}
export type PageName =
  | "grocery"
  | "bakery"
  | "makeup"
  | "bags"
  | "clothing"
  | "furniture";

export const sitePages: Record<PageName, PageInfo> = {
  grocery: {
    title: "Grocery - Click-Univers",
    description: "Grocery Details",
    banner: {
      heading: "heading-grocery",
      subheading: "subheading-grocery",
      image: "/banner/click-games-light-1.jpeg",
      gallery: [
       /* {
          id: 1,
          title: "Buy One Get One Free",
          image: "/banner/click-games-light-1.jpeg",
        },
        {
          id: 2,
          title: "Buy One Get One Free",
          image: "/banner/click-games-light-2.jpeg",
        },*/
        {
          id: 3,
          title: "Buy One Get One Free",
          image: "/banner/banner-3.png",
          url:"/products/pokemon-ecarlate"
        },
        {
          id: 4,
          title: "Buy One Get One Free",
          image: "/banner/banner-4.png",
          url:"/products/pokemon-violet"
        },
      ],
      
    },
    banner1: {
      heading: "heading-grocery",
      subheading: "subheading-grocery",
      image: "/banner/click-games-light-1.jpeg",
      gallery: [
       {
          id: 1,
          title: "Buy One Get One Free",
          image: "/banner/banner-5.png",
        },
        {
          id: 2,
          title: "Buy One Get One Free",
          image: "/banner/banner-6.png",
        },
        {
          id: 3,
          title: "Buy One Get One Free",
          image: "/banner/banner-7.png",
        },
        {
          id: 4,
          title: "Buy One Get One Free",
          image: "/banner/banner-5.png",
        }]},
    banner2: {
      heading: "heading-grocery",
      subheading: "subheading-grocery",
      image: "/banner/click-games-light-1.jpeg",
      gallery: [
       {
          id: 1,
          title: "Buy One Get One Free",
          image: "/banner/banner-7.png",
        },
        {
          id: 2,
          title: "Buy One Get One Free",
          image: "/banner/banner-7.png",
        },
        {
          id: 3,
          title: "Buy One Get One Free",
          image: "/banner/banner-7.png",
        },
        {
          id: 4,
          title: "Buy One Get One Free",
          image: "/banner/banner-5.png",
        },
      ],
      
    },
  },
  bakery: {
    title: "Bakery - PickBazar",
    description: "Bakery Details",
    banner: {
      heading: "heading-bakery",
      subheading: "subheading-bakery",
      image: "/banner/bakery.jpg",
    },
  },
  makeup: {
    title: "Makeup - PickBazar",
    description: "Makeup Details",
    banner: {
      heading: "heading-makeup",
      subheading: "subheading-makeup",
      image: "/banner/makeup.png",
    },
  },
  bags: {
    title: "Bags - PickBazar",
    description: "Bags Details",
    banner: {
      heading: "heading-bags",
      subheading: "subheading-bags",
      image: "/banner/bags.png",
    },
  },
  clothing: {
    title: "Clothing - PickBazar",
    description: "Clothing Details",
    banner: {
      heading: "heading-clothing",
      subheading: "subheading-clothing",
      image: "/banner/cloths.png",
    },
  },
  furniture: {
    title: "Furniture - PickBazar",
    description: "Furniture Details",
    banner: {
      heading: "heading-furniture",
      subheading: "subheading-furniture",
      image: "/banner/furniture.png",
      gallery: [
        {
          id: 1,
          title: "Exclusives Furniture",
          image: "/banner/furniture-banner-1.jpg",
        },
        {
          id: 2,
          title: "Exclusives Furniture",
          image: "/banner/furniture-banner-2.jpg",
        },
      ],
    },
  },
};
