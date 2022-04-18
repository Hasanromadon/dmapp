const formatNumber = (number) =>
  number.toLocaleString(['ban', 'id'], {
    style: 'currency',
    currency: 'IDR',
  });

export { formatNumber };
