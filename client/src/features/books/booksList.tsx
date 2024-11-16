import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAllBooks } from './booksSlice';

const BooksList: React.FC = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.books);
  const status = useAppSelector((state) => state.books.status);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  if (status === 'loading') return <p>Cargando libros...</p>;
  if (status === 'failed') return <p>Error al cargar libros</p>;

  return (
    <div>
      <h1>Lista de Libros</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.titulo}</strong> por {book.autor}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
