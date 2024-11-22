export const fetchBooks = async () => {
    const response = await fetch('http://localhost:4200/libros');
    if (!response.ok) {
        console.error(response);
      throw new Error('Error al obtener libros');
    }
    return response.json();
  };
  