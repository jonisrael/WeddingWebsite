function newChildElement2(tag, parentSelector, properties) {
  let parent =
    typeof parentSelector === "object"
      ? parentSelector
      : document.querySelector(parentSelector);
  let newElement = document.createElement(tag || "div");
  Object.keys(properties).forEach((property) => {
    newElement[property] = properties[property] || "";
  });
  parent.appendChild(newElement);
  return newElement;
}
