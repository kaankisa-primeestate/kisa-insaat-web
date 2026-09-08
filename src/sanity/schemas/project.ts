export default {
  name: 'project',
  title: 'Projeler',
  type: 'document',
  fields: [
    { name: 'title', title: 'Proje Adı', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'URL Bağlantısı (Slug)', type: 'slug', options: { source: 'title' } },
    { name: 'status', title: 'Proje Durumu', type: 'string', options: { list: [{ title: 'Devam Ediyor', value: 'ongoing' }, { title: 'Tamamlandı', value: 'completed' }] } },
    { name: 'completionPercentage', title: 'Tamamlanma Yüzdesi (%)', type: 'number' },
    { name: 'location', title: 'Lokasyon / Konum', type: 'string' },
    { name: 'adaParsel', title: 'Ada / Parsel Bilgisi', type: 'string' },
    { name: 'mainImage', title: 'Kapak Görseli', type: 'image', options: { hotspot: true } },
    { name: 'gallery', title: 'Görsel Galerisi', type: 'array', of: [{ type: 'image' }] },
    { name: 'description', title: 'Proje Açıklaması', type: 'text' },
    { name: 'features', title: 'Teknik Özellikler & Şartname', type: 'array', of: [{ type: 'string' }] },
  ]
}
