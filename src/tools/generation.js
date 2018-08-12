export const generateId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  return [...Array(7)]
    .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
    .join('')
  ;
};


