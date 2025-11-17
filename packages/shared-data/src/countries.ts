export const countryList = [
  {
    value: "ad",
    label: "Andorra",
  },
  {
    value: "al",
    label: "Albania",
  },
  {
    value: "at",
    label: "Austria",
  },
  {
    value: "ba",
    label: "Bosnia and Herzegovina",
  },
  {
    value: "be",
    label: "Belgium",
  },
  {
    value: "bg",
    label: "Bulgaria",
  },
  {
    value: "by",
    label: "Belarus",
  },
  {
    value: "ch",
    label: "Switzerland",
  },
  {
    value: "cy",
    label: "Cyprus",
  },
  {
    value: "cz",
    label: "Czech Republic",
  },
  {
    value: "de",
    label: "Germany",
  },
  {
    value: "dk",
    label: "Denmark",
  },
  {
    value: "ee",
    label: "Estonia",
  },
  {
    value: "es",
    label: "Spain",
  },
  {
    value: "fi",
    label: "Finland",
  },
  {
    value: "fr",
    label: "France",
  },
  {
    value: "gb",
    label: "United Kingdom",
  },
  {
    value: "gr",
    label: "Greece",
  },
  {
    value: "hr",
    label: "Croatia",
  },
  {
    value: "hu",
    label: "Hungary",
  },
  {
    value: "ie",
    label: "Ireland",
  },
  {
    value: "is",
    label: "Iceland",
  },
  {
    value: "it",
    label: "Italy",
  },
  {
    value: "li",
    label: "Liechtenstein",
  },
  {
    value: "lt",
    label: "Lithuania",
  },
  {
    value: "lu",
    label: "Luxembourg",
  },
  {
    value: "lv",
    label: "Latvia",
  },
  {
    value: "mc",
    label: "Monaco",
  },
  {
    value: "md",
    label: "Moldova",
  },
  {
    value: "me",
    label: "Montenegro",
  },
  {
    value: "mk",
    label: "North Macedonia",
  },
  {
    value: "mt",
    label: "Malta",
  },
  {
    value: "nl",
    label: "Netherlands",
  },
  {
    value: "no",
    label: "Norway",
  },
  {
    value: "pl",
    label: "Poland",
  },
  {
    value: "pt",
    label: "Portugal",
  },
  {
    value: "ro",
    label: "Romania",
  },
  {
    value: "rs",
    label: "Serbia",
  },
  {
    value: "ru",
    label: "Russia",
  },
  {
    value: "se",
    label: "Sweden",
  },
  {
    value: "si",
    label: "Slovenia",
  },
  {
    value: "sk",
    label: "Slovakia",
  },
  {
    value: "sm",
    label: "San Marino",
  },
  {
    value: "ua",
    label: "Ukraine",
  },
  {
    value: "va",
    label: "Vatican City",
  },
  {
    value: "vi",
    label: "Việt Nam",
  },
] as const;

export type Country = (typeof countryList)[number]["value"];
