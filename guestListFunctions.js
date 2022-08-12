import html from "html-literal";
import { render } from ".";
import { guestList } from "./guestList";

function tryRemovingElement(selectorList) {
  if (typeof selectorList === "string") selectorList = [selectorList];
  selectorList.forEach((selector) => {
    if (document.querySelector(selector)) {
      document.querySelector(selector).remove();
    }
  });
}

function newChildElement(
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
    parent.appendChild(newElement);
  }
  return newElement;
}

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

export function checkInvitedGuestList(nameEntry) {
  if (nameEntry.length === 0) {
    writeErrorMessage("#guest-lookup", "Please enter a name.");
    return;
  }
  for (let i = 0; i < guestList.length; i++) {
    let guest = guestList[i];
    if (
      guest.name1.toLowerCase().includes(nameEntry.toLowerCase()) &&
      nameEntry.length > 0.66 * guest.name1.length
    ) {
      return [guest.name1, guest.name2, guest.totalGuests, guest.index];
    }
    if (
      guest.name2.toLowerCase().includes(nameEntry.toLowerCase()) &&
      nameEntry.length > 0.66 * guest.name2.length
    ) {
      return [guest.name2, guest.name1, guest.totalGuests, guest.index];
    }
    writeErrorMessage(
      "#guest-lookup",
      "We can't seem to find your name. Please try a different spelling!"
    );
  }
}

function writeErrorMessage(parentSelector, message) {
  let parentElement = document.querySelector(parentSelector);
  tryRemovingElement("#error");
  let errorDiv = document.createElement("div");
  errorDiv.id = "error";
  parentElement.append(errorDiv);
  let errorMessage = document.createElement("span");
  errorMessage.id = "error-message";
  errorMessage.textContent = message;
  errorDiv.appendChild(errorMessage);
}

export function askForConfirmation(guestArray) {
  if (guestArray === undefined) return;

  let [firstGuest, secondGuest, extraGuests, guestIndex] = guestArray;
  let form = document.querySelector("form");

  tryRemovingElement("#attendance");
  tryRemovingElement("#error");
  tryRemovingElement("#guest-lookup");

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
    let dietaryRestrictions = "";

    if (yesSelected || noSelected) {
      finalSection.id = "final-section";
      tryRemovingElement("#error");
      tryRemovingElement("#attendance-input");
      form.appendChild(finalSection);
    }
    if (yesSelected) {
      console.log("Yes selected");
      doYesSelected(guestArray);
    } else if (noSelected) {
      console.log("No selected");
      let declineInviteMessage = newChildElement(
        "declined",
        finalSection,
        "p",
        "Thank you for letting us know, and we are sorry you cannot make it."
      );
    } else {
      console.log("Neither Response Selected");
      writeErrorMessage("#attendance", "Please select yes or no.");
    }
    if (noSelected) {
      let data = {};
      data.index = guestIndex;
      data.guestList = [firstGuest, secondGuest];
      data.attendance = "No";
      data.dietaryRestrictions = "";
      console.log(data);
      document.querySelector("#final-section").innerHTML = "";
      document.querySelector("#attendance h2").innerHTML =
        "Thank you for your submission!";
      let finalComment = newChildElement(
        "final-comment",
        "#final-section",
        "p"
      );
      finalComment.innerHTML = `Your response DECLINED has been recorded. If you have made a mistake, you can resubmit the form and it will replace your previous submission.`;
      let debugDetaSent = newChildElement(
        "#data",
        "#final-section",
        "pre",
        `\nDATA TO BE SENT TO SERVER:\n` + JSON.stringify(data)
      );
    }
  });
}

// function createSubmitButton(answer) {
//   if (answer === "yes") {
//   } else {
//   }
// }

function doYesSelected([guest1, guest2, numberOfGuests, guestIndex]) {
  console.log(guest1, guest2, numberOfGuests, guestIndex);
  let dataToSendToServer = { primaryGuest: guestList };
  let acceptInviteMessage = newChildElement(
    "accepted-message",
    "#final-section",
    "p",
    "We are so happy that you can make it to our wedding!"
  );

  if (numberOfGuests > 1) {
    let confirmNamesDiv = newChildElement(
      "confirm-names-div",
      "#final-section",
      "div"
    );
    let confirmNamesQuestion = newChildElement(
      "#confirm-names-question",
      "#confirm-names-div",
      "p",
      "Confirm the names of the guests:"
    );
    for (let i = 1; i <= numberOfGuests; i++) {
      let inputField = newChildElement(
        `guest-${i}`,
        "#confirm-names-div",
        "input",
        "",
        "guest-name-fields"
      );
      inputField.type = "text";
      inputField.required = true;
      if (i === 1) inputField.value = guest1;
      if (i === 2 && numberOfGuests > 1) inputField.value = guest2;
      if (i === 1) inputField.disabled = true;
      document
        .querySelector("#confirm-names-div")
        .appendChild(document.createElement("br"));
    }
  }
  let dietaryDiv = newChildElement("dietary-div", "#final-section", "div");
  let dietaryQuestion = newChildElement(
    "diet-question",
    "#dietary-div",
    "p",
    "Are there any dietary restrictions we should know about?"
  );
  let dietaryInputField = newChildElement(
    "dietary-input",
    "#dietary-div",
    "textarea"
  );
  dietaryInputField.rows = "5";
  dietaryInputField.cols = "60";
  dietaryInputField.placeholder = `\t\t\t\t\t  (Optional)`;

  let submitButton = newChildElement(
    "submit",
    "#final-section",
    "button",
    "Submit"
  );

  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    let data = {};
    data.index = guestIndex;
    data.guestList = [];
    data.attendance = "Yes";
    for (let i = 1; i <= numberOfGuests; i++) {
      data.guestList.push(document.querySelector(`#guest-${i}`).value);
    }
    data.dietaryRestrictions = dietaryInputField.value;
    console.log(data);
    document.querySelector("#final-section").innerHTML = "";
    document.querySelector("#attendance h2").innerHTML =
      "Thank you for your submission!";
    let finalComment = newChildElement("final-comment", "#final-section", "p");
    finalComment.innerHTML = `Your response ACCEPTED has been recorded. If you have made a mistake, you can resubmit the form and it will replace your previous submission.`;

    if (data.dietaryRestrictions) {
      let dietaryComment = newChildElement(
        "restrictions",
        "#final-section",
        "p",
        `You have also submitted the following dietary restrictions:\n"${data.dietaryRestrictions}".`
      );
    }
    let returnToHomePageButton = newChildElement(
      "#return-to-home",
      "#final-section",
      "button",
      "Return to Home Page"
    );
    returnToHomePageButton.addEventListener("click", () =>
      document.querySelector(`[title="Home"]`).click()
    );

    let debugDetaSent = newChildElement(
      "#data",
      "#final-section",
      "pre",
      JSON.stringify(data)
    );
  });
}

// don't forget dietary restrictions
