const greenFoundation = async (url) => {
  const response = await fetch(
    `https://admin.thegreenwebfoundation.org/api/v3/greencheck/${url}`
  );
  const data = await response.json();
  return data;
};

export default greenFoundation;
