const normalizUpdatUserFromTable = (newValus, oldValus, business) => {
  return {
    name: {
      first: newValus.firstName,
      middle: oldValus.name.middle,
      last: newValus.lastName,
    },
    phone: newValus.phone,
    /* email: newValus.email,
    password: newValus.password, */
    image: {
      url: oldValus.image.url,
      alt: oldValus.image.alt,
    },
    address: {
      state: oldValus.address.state,
      country: newValus.country,
      city: oldValus.address.city,
      street: oldValus.address.street,
      houseNumber: oldValus.address.houseNumber,
      zip: +oldValus.address.zip,
    },
    // isBusiness: business,
  };
};

export { normalizUpdatUserFromTable };
