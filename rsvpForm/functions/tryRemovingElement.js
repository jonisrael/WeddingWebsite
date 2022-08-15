export function tryRemovingElement(selectorList) {
  if (typeof selectorList === "string") selectorList = [selectorList];
  selectorList.forEach((selector) => {
    if (document.querySelector(selector)) {
      document.querySelector(selector).remove();
    } else {
      console.error(`Could not remove element with selector "${selector}"`);
    }
  });
}
