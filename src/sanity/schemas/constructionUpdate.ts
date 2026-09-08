export default {
  name: 'constructionUpdate',
  title: 'Şantiye Güncellemeleri',
  type: 'document',
  fields: [
    { name: 'project', title: 'İlişkili Proje', type: 'reference', to: [{ type: 'project' }] },
    { name: 'updateDate', title: 'Güncelleme Tarihi', type: 'date', options: { dateFormat: 'YYYY-MM' } },
    { name: 'title', title: 'Güncelleme Başlığı', type: 'string' },
    { name: 'description', title: 'Açıklama / Detay', type: 'text' },
    { name: 'photos', title: 'Şantiye Fotoğrafları', type: 'array', of: [{ type: 'image' }] },
    { name: 'featuredOnHome', title: 'Ana Sayfada Göster', type: 'boolean' }
  ]
}
