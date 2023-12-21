export interface CountryDetail {
  name: string;
  native: string;
  code: string;
  capital: string;
  flag: string;
  currencies: string[];
  languages: Language[];
  continent: Continent;
}

interface Language {
  code: string;
  name: string;
}

interface Continent {
  name: string;
}
