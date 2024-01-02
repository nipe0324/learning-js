// let mathematician: string | undefined
let matchmatician = Math.random() > 0.5
    ? undefined
    : "Mark Goldberg";

console.log(matchmatician?.toLowerCase());

type Book = {
    author?: string;
    pages: number;
};

let missingAuthorBook: Book = { pages: 100 };

function announceSong(song: string, singer?: string) {
  console.log(`Song: ${song}`);

  if (singer) {
      console.log(`Singer: ${singer}`);
  }
}

announceSong("Shape of You");
