interface Open {
  is_overnight: boolean;
  start: number;
  end: number;
  day: number;
}

interface Hours {
  open: Open[];
  hours_type: string;
  is_open_now: boolean;
}

interface Categories {
  alias: string;
  title: string;
}

export interface Shop {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_claimed: boolean;
  is_closed: boolean;
  url: string;
  phone: string;
  display_phone: string;
  review_count: number;
  categories: Categories[];
  rating: number;
  location: {
    address1: string;
    address2: string;
    address3: string;
    city: string;
    zip_code: string;
    country: string;
    state: string;
    display_address: string;
    cross_streets: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  photos: string[];
  price: string;
  hours: Hours[];
  transactions: [];
}
