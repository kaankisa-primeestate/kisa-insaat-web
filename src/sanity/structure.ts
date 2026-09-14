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
        .title("Satılık & Kiralık")
        .schemaType("property")
        .child(
          S.list()
            .title("Satılık & Kiralık Gayrimenkuller")
            .items([
              S.listItem()
                .title("Satılık İlanlar")
                .child(
                  S.documentList()
                    .title("Satılık İlanlar")
                    .filter(
                      '_type == "property" && listingType in ["sale", "both"] && status == "available"',
                    ),
                ),
              S.listItem()
                .title("Kiralık İlanlar")
                .child(
                  S.documentList()
                    .title("Kiralık İlanlar")
                    .filter(
                      '_type == "property" && listingType in ["rent", "both"] && status == "available"',
                    ),
                ),
              S.divider(),
              S.listItem()
                .title("Opsiyonlu / Rezerve")
                .child(
                  S.documentList()
                    .title("Opsiyonlu / Rezerve")
                    .filter('_type == "property" && status == "reserved"'),
                ),
              S.listItem()
                .title("İşlemi Tamamlananlar")
                .child(
                  S.documentList()
                    .title("Satılan / Kiralanan")
                    .filter('_type == "property" && status == "closed"'),
                ),
              S.divider(),
              S.listItem()
                .title("Tüm İlanlar")
                .child(S.documentTypeList("property").title("Tüm İlanlar")),
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
