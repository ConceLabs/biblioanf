import { useState, useEffect } from 'react';

/**
 * Un hook personalizado que funciona como useState pero persiste el estado en localStorage.
 * @param key La clave para usar en localStorage.
 * @param defaultValue El valor inicial a usar si no hay nada en localStorage.
 * @returns Un par [estado, funciónSeteadora], igual que useState.
 */
function usePersistentState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    // La lógica de inicialización se ejecuta solo una vez.
    try {
      const storedValue = window.localStorage.getItem(key);
      // Si existe un valor en localStorage, lo parseamos y lo retornamos.
      if (storedValue) {
        return JSON.parse(storedValue);
      }
    } catch (error) {
      // Si hay un error al parsear, lo registramos y continuamos con el valor por defecto.
      console.error(`Error al leer la clave "${key}" de localStorage`, error);
    }
    // Si no hay nada o hay un error, retornamos el valor por defecto.
    return defaultValue;
  });

  useEffect(() => {
    // Este efecto se ejecuta cada vez que el estado cambia.
    try {
      // Guardamos el estado actual en localStorage como una cadena JSON.
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error al guardar la clave "${key}" en localStorage`, error);
    }
  }, [key, state]); // Se vuelve a ejecutar si la clave o el estado cambian.

  return [state, setState];
}

export default usePersistentState;
