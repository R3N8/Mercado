export type Category = {
  slug: string;
  title: string;
  image: string;
  color: string;
};

export const categories: Category[] = [
  {
    slug: "electronics",
    title: "Electronics",
    image:
      "https://images.pexels.com/photos/185030/pexels-photo-185030.jpeg",
    color: "bg-indigo-500",
  },
  {
    slug: "beauty",
    title: "Beauty",
    image:
      "https://images.pexels.com/photos/11883768/pexels-photo-11883768.jpeg",
    color: "bg-pink-500",
  },
  {
    slug: "clothes",
    title: "Clothes",
    image:
      "https://images.pexels.com/photos/18645340/pexels-photo-18645340.jpeg",
    color: "bg-orange-500",
  },
];
