import { tryRemovingElement } from "./tryRemovingElement";

export function writeErrorMessage(parentSelector, message, color = "red") {
  let parentElement = document.querySelector(parentSelector);
  tryRemovingElement("#error");
  let errorDiv = document.createElement("div");
  errorDiv.id = "error";
  parentElement.append(errorDiv);
  let errorMessage = document.createElement("span");
  errorMessage.id = "error-message";
  errorMessage.textContent = message;
  errorMessage.style.color = color;
  errorDiv.appendChild(errorMessage);
}
