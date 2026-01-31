const baseURL = "http://localhost:1234/notes";

const getAll = async () => {
  const res = await fetch(baseURL);
  if (!res.ok) throw new Error("Failed to fetch notes");

  return await res.json();
};

const createOne = async (content) => {
  const res = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, important: false }),
  });

  if (!res.ok) throw new Error("Failed to create note");

  return await res.json();
};

const update = async (note) => {
    const opc = {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note)
    }
    const res = await fetch(`${baseURL}/${note.id}`, opc)

    if (!res.ok) throw new Error("Failed to update note");

    return await res.json()
}

export default {
  getAll,
  createOne,
  update
};
