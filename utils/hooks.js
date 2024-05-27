import { useQuery } from "@tanstack/react-query";

const fetchBookChapterVerse = async (bookName, chapter, verses) => {
  return fetch(
    `https://bible-api.com/${bookName}${chapter}:${verses}?translation=kjv`,
    {
      method: "GET",
      Accept: "*/*",
    }
  )
    .then((resJson) => {
      if (resJson) {
        return resJson.json();
      }
    })
    .then((res) => {
      if (res) {
        return res;
      }
    });
};

/**
 * Return the list of Bible books
 * @param {String} bibleId
 * @param {String} bookName
 * @returns
 */
export const useFetchBibleBookChapterVerse = (bookName, chapter, verses) => {
  const bookChapterVerses = useQuery({
    queryKey: [bookName, chapter, verses],
    queryFn: () => fetchBookChapterVerse(bookName, chapter, verses),
  });
  return bookChapterVerses;
};
