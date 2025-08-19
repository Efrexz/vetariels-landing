const locations = [
  {
    id: 1,
    name: "San Miguel",
    address: {
      street: "Av. Brígida Silva De Ochoa 272 II etapa, Urb. Pando",
      locality: "San Miguel",
      region: "Lima",
      postalCode: "15086",
      country: "PE",
    },
    phone: "+51 954 599 221",
    imageUrl: "/images/locations/sanMiguel.webp",
    hours: {
      weekdays: "24/7",
      weekends: "24/7",
    },
    coordinates: { lat: -12.080677018607217, lng: -77.08802492519412 },
  },
  {
    id: 2,
    name: "San Martín De Porres",
    address: {
      street: "Av. Los Próceres 115, con Av. José Granda",
      locality: "San Martín de Porres",
      region: "Lima",
      postalCode: "15107",
      country: "PE",
    },
    phone: "+51 986 985 047",
    imageUrl:
      "https://meridianvetre.com/wp-content/uploads/2019/07/medvet-exterior.png",
    hours: {
      weekdays: "8:00 AM - 10:00 PM",
      weekends: "9:00 AM - 6:00 PM",
    },
    coordinates: { lat: -12.02041546665544, lng: -77.0865150516204 },
  },
  {
    id: 3,
    name: "Los Olivos",
    address: {
      street: "Av Beta Mz Ñ lote 1 urb, Los Olivos 15306",
      locality: "Los Olivos",
      region: "Lima",
      postalCode: "15301",
      country: "PE",
    },
    phone: "+51 932 719 342",
    imageUrl:
      "https://meridianvetre.com/wp-content/uploads/2019/07/medvet-exterior.png",
    hours: {
      weekdays: "8:00 AM - 9:00 PM",
      weekends: "8:00 AM - 5:00 PM",
    },
    coordinates: { lat: -12.008495867831654, lng: -77.0710509284642 },
  },
];

export default locations;
