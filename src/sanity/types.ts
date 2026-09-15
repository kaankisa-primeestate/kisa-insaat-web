import type { SanityImageSource } from "@sanity/image-url";

export type SanityImage = SanityImageSource & { alt?: string };

export type ProjectStatus = "planned" | "ongoing" | "completed";
export type PropertyStatus = "available" | "reserved" | "closed";
export type ListingType = "sale" | "rent" | "both";

export type SiteSettings = {
  companyName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
  workingHours: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  metaTitle: string;
  metaDescription: string;
  kvkkText: string;
};

export type ProjectSummary = {
  _id: string;
  title: string;
  slug: string;
  status: ProjectStatus;
  completionPercentage?: number;
  location: string;
  adaParsel?: string;
  deliveryDate: string;
  description: string;
  mainImage: SanityImage;
};

export type ConstructionUpdate = {
  _id: string;
  updateDate: string;
  title: string;
  description: string;
  photos: SanityImage[];
};

export type ProjectDetail = ProjectSummary & {
  gallery: SanityImage[];
  features: string[];
  updates: ConstructionUpdate[];
};

export type Property = {
  _id: string;
  /** slug.current yoksa belgenin kendi kimliği kullanılır. */
  slug: string;
  title: string;
  projectTitle?: string;
  listingType: ListingType;
  status: PropertyStatus;
  roomCount: string;
  grossArea: number;
  netArea: number;
  floor: string;
  salePrice?: string;
  rentPrice?: string;
  dues?: string;
  description: string;
  images: SanityImage[];
  floorPlan?: SanityImage;
  featured: boolean;
};

export type PropertyDetail = Property & {
  projectSlug?: string;
  projectLocation?: string;
};
