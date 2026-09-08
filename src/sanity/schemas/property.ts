export default {
  name: 'property',
  title: 'Satıştaki Gayrimenkuller',
  type: 'document',
  fields: [
    { name: 'title', title: 'Gayrimenkul / Daire Başlığı', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'project', title: 'İlişkili Proje', type: 'reference', to: [{ type: 'project' }] },
    { name: 'status', title: 'Satış Durumu', type: 'string', options: { list: [{ title: 'Satılık', value: 'available' }, { title: 'Opsiyonlu / Rezerve', value: 'reserved' }, { title: 'Satıldı', value: 'sold' }] } },
    { name: 'roomCount', title: 'Oda Sayısı', type: 'string', options: { list: ['1+1', '2+1', '3+1', '4+1', 'Dubleks', 'Ticari / Dükkan'] } },
    { name: 'grossArea', title: 'Brüt m²', type: 'number' },
    { name: 'netArea', title: 'Net m²', type: 'number' },
    { name: 'floor', title: 'Bulunduğu Kat', type: 'string' },
    { name: 'price', title: 'Fiyat (TL)', type: 'string' },
    { name: 'images', title: 'Daire Görselleri', type: 'array', of: [{ type: 'image' }] },
    { name: 'floorPlan', title: 'Kat Planı Görseli', type: 'image' },
    { name: 'description', title: 'Daire Detaylı Açıklaması', type: 'text' },
    { name: 'featured', title: 'Ana Sayfada Öne Çıkar', type: 'boolean' }
  ]
}
