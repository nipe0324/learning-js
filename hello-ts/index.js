// let mathematician: string | undefined
var matchmatician = Math.random() > 0.5
    ? undefined
    : "Mark Goldberg";
console.log(matchmatician === null || matchmatician === void 0 ? void 0 : matchmatician.toLowerCase());
var missingAuthorBook = { pages: 100 };
function announceSong(song, singer) {
    if (singer === void 0) { singer = "Mark Goldberg"; }
    console.log("Song: ".concat(song));
    if (singer) {
        console.log("Singer: ".concat(singer));
    }
}
announceSong("Shape of You");
