const formatBedroomsString = (numberOfBedrooms: number) =>
  numberOfBedrooms === 1
    ? `${numberOfBedrooms} Bedroom`
    : `${numberOfBedrooms} Bedrooms`;

const formatMaxAdultsString = (numberMaxAdults: number) =>
  numberMaxAdults === 1
    ? `Max ${numberMaxAdults} adult`
    : `Max ${numberMaxAdults} adults`;

export { formatBedroomsString, formatMaxAdultsString };
