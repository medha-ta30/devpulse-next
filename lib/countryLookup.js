// Filters out World Bank aggregate rows that aren't real countries
// These entries contain keywords like "World", "income", "dividend", etc.
const AGGREGATE_KEYWORDS = [
  'world', 'income', 'dividend', 'states', 'europe', 'asia', 'africa',
  'america', 'pacific', 'caribbean', 'saharan', 'arab', 'euro', 'oecd',
  'ibrd', 'ida', 'fragile', 'blend', 'situation', 'demographic', 'central',
  'east', 'south', 'north', 'west', 'latin', 'heavily', 'small', 'least',
  'lower', 'upper', 'middle', 'high', 'low', 'post', 'pre', 'late', 'early',
];

function isRealCountry(country) {
  const name = country.name.common.toLowerCase();
  return !AGGREGATE_KEYWORDS.some(keyword => name.includes(keyword));
}

const ASIAN_COUNTRIES = [
  'China', 'India', 'Indonesia', 'Pakistan', 'Bangladesh',
  'Japan', 'Philippines', 'Vietnam', 'Iran', 'Turkey',
  'Thailand', 'Myanmar', 'South Korea', 'Iraq', 'Afghanistan',
  'Saudi Arabia', 'Uzbekistan', 'Malaysia', 'Yemen', 'Nepal',
];

function getTop5AsianCountries(countries) {
  return countries
    .filter(c => ASIAN_COUNTRIES.includes(c.name.common))
    .sort((a, b) => b.population - a.population)
    .slice(0, 5)
    .map(c => ({
      name: c.name.common,
      population: c.population,
    }));
}

export function countryLookup(countries) {
  const realCountries = countries.filter(isRealCountry);

  return {
    totalCountries:            realCountries.length,
    countries:                 realCountries,
    top5AsianByPopulation:     getTop5AsianCountries(countries),
  };
}
