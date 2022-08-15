export function newChildElement(
  id,
  parentSelector,
  tag,
  textContent,
  className,
  value,
  type,
  name
) {
  let parent =
    typeof parentSelector === "object"
      ? parentSelector
      : document.querySelector(parentSelector);
  let newElement = document.createElement(tag || "div");
  try {
    if (id[0] === "#") id = id.slice(1); // fix accidental "#"
    newElement.id = id || "";
    newElement.value = value || "";
    newElement.name = name || "";
    newElement.className = className || "";
    newElement.textContent = textContent || "";
    newElement.type = type || ""; // sometimes crashes function
    parent.appendChild(newElement);
  } catch (error) {
    parent.appendChild(newElement); // append element anyway
  }
  return newElement;
}

// function newChildElementNotUsed(tag, parentSelector, properties) {
//   let parent =
//     typeof parentSelector === "object"
//       ? parentSelector
//       : document.querySelector(parentSelector);
//   let newElement = document.createElement(tag || "div");
//   Object.keys(properties).forEach((property) => {
//     newElement[property] = properties[property] || "";
//   });
//   parent.appendChild(newElement);
//   return newElement;
// }
