import { tryRemovingElement } from "./functions/tryRemovingElement";

export function writeErrorMessage(parentSelector, message) {
  let parentElement = document.querySelector(parentSelector);
  tryRemovingElement("#error");
  let errorDiv = document.createElement("div");
  errorDiv.id = "error";
  parentElement.append(errorDiv);
  let errorMessage = document.createElement("span");
  errorMessage.id = "error-message";
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  errorDiv.appendChild(errorMessage);
}
