export const dateFormatter = (data) => {
  const date = new Date(data);
  const formatter = date.toLocaleDateString('id-ID', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });

  return formatter;
};
