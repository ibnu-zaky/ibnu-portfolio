export interface Project {
  id: number;
  title: string;
  description: string;
  categories: string[];
  image: string | null;
  link: string | null;
  date: string;
  placeholder?: {
    title: string;
    subtitle: string;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Indomontir — Website Service Mobil",
    description: "Platform otomotif yang memudahkan user berinteraksi langsung dengan montir via WhatsApp.",
    categories: ["frontend", "teamwork"],
    image: "img/indomontir.png",
    link: "https://indomontir.id/",
    date: "Nov 2023",
  },
  {
    id: 2,
    title: "Foranggis — Child Aspiration Website",
    description: "Website aspirasi anak se-kecamatan Cimanggis untuk pemenuhan hak-hak anak secara digital.",
    categories: ["frontend", "teamwork"],
    image: "img/foranggis.png",
    link: "https://foranggis.com/",
    date: "Dec 2023",
  },
  {
    id: 3,
    title: "Inpex Oil & Gas — MOC System",
    description: "Desain aplikasi Management of Change untuk perusahaan minyak dan gas internasional Inpex.",
    categories: ["design", "teamwork"],
    image: null,
    placeholder: { title: "INPEX", subtitle: "Oil & Gas · MOC" },
    link: null,
    date: "Dec 2023",
  },
];
