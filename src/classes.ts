interface SchoolboxClass {
  id: string;
  url: string;
  name: string;
  imageUrl: string;
}

export function getClassIds(document: Document): SchoolboxClass[] {
  const classes: SchoolboxClass[] = [];

  document.querySelectorAll(".v-card:has(.classes)").forEach((element) => {
    const href = element
      .querySelector(".classes > div > h3 > a")
      .getAttribute("href");
    const id = href.split("/").pop();
    const name = element
      .querySelector(".classes > div > h3 > a")
      .textContent.trim();

    const imageUrl =
      element
        .querySelector("a > div.card-class-image")
        ?.style.backgroundImage.match(/"(.*?)"/)?.[1] || "";

    classes.push({
      id,
      url: href,
      name,
      imageUrl,
    });
  });

  return classes;
}
