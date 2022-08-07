// data pour les illustrations au niveau du home screen

import { ICover } from "../../src/interfaces";

const coversData: ICover[] = [
  {
    details: "Saisons passées et actuelles",
    category: "TV Shows",
    bgSrc: require("../images/cover-1.jpg"),
  },
  {
    details: "New & Classic",
    category: "Films",
    bgSrc: require("../images/cover-2.jpg"),
  },
  {
    details: "Innovant",
    category: "Hulu Originals",
    bgSrc: require("../images/cover-3.jpg"),
  },
  {
    details: "Add-on",
    category: "Premiums",
    bgSrc: require("../images/cover-4.jpg"),
  },
];

export default coversData;
