import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";
import { dataset, projectId } from "./src/sanity/env";

/** Site Ayarlari tekil kayittir: yeni kopya olusturulmasi ve silinmesi engellenir. */
const SINGLETON_TYPES = new Set(["siteSettings"]);

export default defineConfig({
  name: "kisa-insaat",
  title: "Kısa İnşaat Yönetim Paneli",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? actions.filter(
            ({ action }) =>
              action && ["publish", "discardChanges", "restore"].includes(action),
          )
        : actions,
  },
  plugins: [structureTool({ structure })],
});
