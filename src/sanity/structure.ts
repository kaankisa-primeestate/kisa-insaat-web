import type { StructureResolver } from "sanity/structure";

/** Site Ayarlari tekil bir kayittir; listede degil dogrudan formu acilir. */
const SETTINGS_ID = "siteSettings";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Kısa İnşaat Yönetimi")
    .items([
      S.listItem()
        .title("Site Ayarları")
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
                .title("Tüm Projeler")
                .child(
                  S.documentTypeList("project").title("Tüm Projeler"),
                ),
            ]),
        ),

      S.listItem()
        .title("Satıştaki Daireler")
        .schemaType("property")
        .child(
          S.list()
            .title("Satıştaki Daireler")
            .items([
              S.listItem()
                .title("Satılık")
                .child(
                  S.documentList()
                    .title("Satılık Daireler")
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
                .title("Satılanlar")
                .child(
                  S.documentList()
                    .title("Satılan Daireler")
                    .filter('_type == "property" && status == "sold"'),
                ),
              S.divider(),
              S.listItem()
                .title("Tüm Daireler")
                .child(S.documentTypeList("property").title("Tüm Daireler")),
            ]),
        ),

      S.listItem()
        .title("Şantiye Güncellemeleri")
        .schemaType("constructionUpdate")
        .child(
          S.documentTypeList("constructionUpdate")
            .title("Şantiye Güncellemeleri")
            .defaultOrdering([{ field: "updateDate", direction: "desc" }]),
        ),
    ]);
