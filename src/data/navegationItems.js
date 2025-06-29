import HomeIcon from "@assets/icons/home.svg";
import TagIcon from "@assets/icons/tag.svg";
import UsersIcon from "@assets/icons/users.svg";
import LocationIcon from "@assets/icons/location.svg";
import StarIcon from "@assets/icons/star.svg";

const navigationItems = [
  {
    href: "#hero",
    label: "Inicio",
    icon: HomeIcon,
    ariaLabel: "Ir a la sección de inicio",
  },
  {
    href: "#promotions",
    label: "Promociones",
    icon: TagIcon,
    ariaLabel: "Ver nuestras promociones y ofertas especiales",
  },
  {
    href: "#services",
    label: "Servicios",
    icon: TagIcon,
    ariaLabel: "Ver servicios veterinarios ofrecidos",
  },
  {
    href: "#doctors",
    label: "Nuestros Doctores",
    icon: UsersIcon,
    ariaLabel: "Conocer a nuestro equipo de veterinarios",
  },
  {
    href: "#locations",
    label: "Ubicaciones",
    icon: LocationIcon,
    ariaLabel: "Ver nuestras ubicaciones y horarios",
  },
  {
    href: "#testimonials",
    label: "Reseñas",
    icon: StarIcon,
    ariaLabel: "Leer testimonios de nuestros clientes",
  },
];

export default navigationItems;
