export const verifyManuscript = async (id, editedData) => {
  const response = await fetch(`/api/manuscripts/${id}/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedData),
  });

  if (!response.ok) {
    throw new Error('Failed to verify manuscript');
  }

  return await response.json();
};