/**
 * @file
 * route: /learning/classes
 */

interface SchoolboxClass {
  id: string;
  // code: string;
  url: string;
  name: string;
  imageUrl: string;
}

export function getClasses(document: Document): SchoolboxClass[] {
  const classes: SchoolboxClass[] = [];

  document.querySelectorAll(".v-card:has(.classes)").forEach((el) => {
    const url = el
      .querySelector(".card-content > div > h3 > a")
      .getAttribute("href");

    const id = url.split("/").pop();

    // const code = el.querySelector(".card-content > div > p").textContent;

    const name = el
      .querySelector(".card-content > div > h3 > a")
      .textContent.trim();

    const imageUrl =
      el
        .querySelector("a > div.card-class-image")
        ?.style.backgroundImage.match(/"(.*?)"/)?.[1] || "";

    classes.push({
      id,
      // code,
      url,
      name,
      imageUrl,
    });
  });

  return classes;
}
