export interface HeaderProps {
    onSearch: (term: string) => void;
    cartCount: number;
    wishlistCount: number;
    totalPrice: number;
  }
  
export interface LinksNavbar {
    link: boolean;
    className: string;
    text: string;
    href: string;
  }