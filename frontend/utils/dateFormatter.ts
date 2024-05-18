export const dateFormatter = (date: string | Date): string => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatISODate = (date?: string | Date): string => {
  const isoDate = date ? (typeof date === "string" ? date : date.toISOString()) : new Date().toISOString();
  const formattedDate = new Date(isoDate);
  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
  const day = formattedDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
