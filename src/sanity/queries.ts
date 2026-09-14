/** Tum GROQ sorgulari tek yerde toplanir; alan degisiklikleri buradan izlenir. */

const IMAGE = `{ ..., alt }`;

const PROJECT_SUMMARY = `{
  _id,
  title,
  "slug": slug.current,
  status,
  completionPercentage,
  location,
  adaParsel,
  deliveryDate,
  description,
  mainImage ${IMAGE}
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  companyName, phone, whatsapp, email, address, mapEmbedUrl, workingHours,
  instagram, facebook, linkedin, metaTitle, metaDescription, kvkkText
}`;

export const ALL_PROJECTS_QUERY = `*[_type == "project"]
  | order(coalesce(order, 0) asc, _createdAt desc) ${PROJECT_SUMMARY}`;

export const PROJECT_SLUGS_QUERY = `*[_type == "project" && defined(slug.current)].slug.current`;

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  status,
  completionPercentage,
  location,
  adaParsel,
  deliveryDate,
  description,
  mainImage ${IMAGE},
  gallery[] ${IMAGE},
  features,
  "updates": *[_type == "constructionUpdate" && project._ref == ^._id]
    | order(updateDate desc) {
      _id, updateDate, title, description, photos[] ${IMAGE}
    }
}`;

export const ALL_PROPERTIES_QUERY = `*[_type == "property"]
  | order(select(status == "available" => 0, status == "reserved" => 1, 2) asc, _createdAt desc) {
  _id,
  title,
  "projectTitle": project->title,
  status,
  roomCount,
  grossArea,
  netArea,
  floor,
  price,
  description,
  images[] ${IMAGE},
  floorPlan ${IMAGE},
  featured
}`;
