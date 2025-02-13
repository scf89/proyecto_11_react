export const getRandomCapital = async () => {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const countries = await res.json();

    const countriesWithCapital = countries.filter(country => country.capital?.length > 0);
    
    const country = countriesWithCapital[Math.floor(Math.random() * countries.length)];
    return {
      name: country.capital?.[0] || "Unknown",
      lat: country.capitalInfo.latlng[0],
      lng: country.capitalInfo.latlng[1]
    };
  };
  