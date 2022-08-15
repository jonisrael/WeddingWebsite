import html from "html-literal";
import { render } from "..";
import { newChildElement } from "./functions/newChildElement";
import { guestList } from "../guestList.js";

export function doYesSelected([guest1, guest2, numberOfGuests, guestIndex]) {
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
    if (numberOfGuests === 1) data.guestList = [guest1];
    else {
      for (let i = 1; i <= numberOfGuests; i++) {
        data.guestList.push(document.querySelector(`#guest-${i}`).value);
      }
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

    newChildElement("", "#final-section", "br");

    let finishedSurvayImage = newChildElement(
      "rsvp-photo-2",
      "#final-section",
      "img"
    );

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
