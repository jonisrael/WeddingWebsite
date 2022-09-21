import { doYesSelected } from "./doYesSelected";
import { doNoSelected } from "./doNoSelected";
import { tryRemovingElement } from "./functions/tryRemovingElement";
import { writeErrorMessage } from "./functions/writeErrorMessage";
import { newChildElement } from "./functions/newChildElement.js";
import { rsvpForm } from "../rsvpFormLinks";

export function askForConfirmation(guestArray) {
  if (guestArray === undefined) return;

  let [firstGuest, secondGuest, totalGuests, guestIndex] = guestArray;
  // console.log(guestArray, rsvpForm);
  // console.log(rsvpForm[totalGuests]);
  let form = document.querySelector("form");

  // tryRemovingElement("#attendance");
  // tryRemovingElement("#error");
  tryRemovingElement("#guest-lookup");
  tryRemovingElement("img");

  let confirmationDiv = newChildElement("attendance", form, "div");
  confirmationDiv.innerHTML = `<h2>Welcome, <span id="guest-output">${firstGuest}</span>! Please fill out the form below to respond to your invitation.</h2>`;

  let googleFormDiv = newChildElement("google-embed", form, "div");
  googleFormDiv.outerHTML = rsvpForm[totalGuests].embed;
  console.log(rsvpForm[totalGuests].msg, totalGuests);
}

export function askForConfirmationOld(guestArray) {
  if (guestArray === undefined) return;

  let [firstGuest, secondGuest, totalGuests, guestIndex] = guestArray;
  let form = document.querySelector("form");

  // tryRemovingElement("#attendance");
  // tryRemovingElement("#error");
  tryRemovingElement("#guest-lookup");
  tryRemovingElement("img");

  let confirmationDiv = newChildElement("attendance", form, "div");
  confirmationDiv.innerHTML = `<h2>Welcome, <span id="guest-output">${firstGuest}</span>!</h2>`;

  let confirmationInput = newChildElement(
    "attendance-input",
    confirmationDiv,
    "div"
  );
  let confirmationQuestion = newChildElement(
    "confirm-attendance-question",
    confirmationInput,
    "p",
    "Please let us know if you are attending:"
  );

  for (let i = 1; i <= 2; i++) {
    let answer = i === 1 ? "yes" : "no";

    let answerInput = newChildElement(
      answer,
      confirmationInput,
      "input",
      "",
      "attendance-choices",
      answer,
      "radio",
      "attendance-answer"
    );

    let answerLabel = document.createElement("label");
    answerLabel.setAttribute("for", answer);
    if (answer === "yes") answerLabel.textContent = "Yes, I joyfully accept!";
    if (answer === "no") answerLabel.textContent = "No, I regretfully decline.";
    confirmationInput.appendChild(answerLabel);

    confirmationInput.appendChild(document.createElement("br"));
  }
  confirmationInput.appendChild(document.createElement("br"));

  let confirmAttendanceButton = newChildElement(
    "confirm-attendance-button",
    confirmationInput,
    "button",
    "Confirm Choice"
  );

  confirmAttendanceButton.addEventListener("click", (event) => {
    event.preventDefault();
    let yesSelected = document.querySelector("#yes").checked;
    let noSelected = document.querySelector("#no").checked;
    let finalSection = document.createElement("div");

    if (yesSelected || noSelected) {
      finalSection.id = "final-section";
      tryRemovingElement("#error");
      tryRemovingElement("#attendance-input");
      form.appendChild(finalSection);
    } else {
      // console.log("Neither Response Selected");
      writeErrorMessage("#attendance", "Please select yes or no.");
    }
    if (yesSelected) {
      doYesSelected(guestArray);
    } else if (noSelected) {
      doNoSelected(guestArray);
    }
  });
}
