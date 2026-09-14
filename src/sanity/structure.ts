import type { StructureResolver } from "sanity/structure";

/** Site Ayarlari tekil bir kayittir; listede degil dogrudan formu acilir. */
const SETTINGS_ID = "siteSettings";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Kisa Insaat Yonetimi")
    .items([
      S.listItem()
        .title("Site Ayarlari")
        .id(SETTINGS_ID)
        .child(
          S.document().schemaType("siteSettings").documentId(SETTINGS_ID),
        ),

      S.divider(),

      S.listItem()
        .title("Projeler")
        .schemaType("project")
        .child(
          S.list()
            .title("Projeler")
            .items([
              S.listItem()
                .title("Devam Eden Projeler")
                .child(
                  S.documentList()
                    .title("Devam Eden Projeler")
                    .filter('_type == "project" && status == "ongoing"')
                    .defaultOrdering([{ field: "order", direction: "asc" }]),
                ),
              S.listItem()
                .title("Planlanan Projeler")
                .child(
                  S.documentList()
                    .title("Planlanan Projeler")
                    .filter('_type == "project" && status == "planned"')
                    .defaultOrdering([{ field: "order", direction: "asc" }]),
                ),
              S.listItem()
                .title("Tamamlanan Projeler")
                .child(
                  S.documentList()
                    .title("Tamamlanan Projeler")
                    .filter('_type == "project" && status == "completed"')
                    .defaultOrdering([{ field: "order", direction: "asc" }]),
                ),
              S.divider(),
              S.listItem()
                .title("Tum Projeler")
                .child(
                  S.documentTypeList("project").title("Tum Projeler"),
                ),
            ]),
        ),

      S.listItem()
        .title("Satistaki Daireler")
        .schemaType("property")
        .child(
          S.list()
            .title("Satistaki Daireler")
            .items([
              S.listItem()
                .title("Satilik")
                .child(
                  S.documentList()
                    .title("Satilik Daireler")
                    .filter('_type == "property" && status == "available"'),
                ),
              S.listItem()
                .title("Opsiyonlu / Rezerve")
                .child(
                  S.documentList()
                    .title("Rezerve Daireler")
                    .filter('_type == "property" && status == "reserved"'),
                ),
              S.listItem()
                .title("Satilanlar")
                .child(
                  S.documentList()
                    .title("Satilan Daireler")
                    .filter('_type == "property" && status == "sold"'),
                ),
              S.divider(),
              S.listItem()
                .title("Tum Daireler")
                .child(S.documentTypeList("property").title("Tum Daireler")),
            ]),
        ),

      S.listItem()
        .title("Santiye Guncellemeleri")
        .schemaType("constructionUpdate")
        .child(
          S.documentTypeList("constructionUpdate")
            .title("Santiye Guncellemeleri")
            .defaultOrdering([{ field: "updateDate", direction: "desc" }]),
        ),
    ]);
