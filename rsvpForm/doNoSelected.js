import { newChildElement } from "./functions/newChildElement.js";

export function doNoSelected([guest1, guest2, numberOfGuests, guestIndex]) {
  let data = {};
  data.index = guestIndex;
  data.guestList = [guest1, guest2];
  data.attendance = "No";
  data.dietaryRestrictions = "";
  console.log(data);
  document.querySelector("#final-section").innerHTML = "";
  document.querySelector("#attendance h2").innerHTML =
    "Thank you for letting us know, and we are sorry you cannot make it.";
  let finalComment = newChildElement("final-comment", "#final-section", "p");
  finalComment.innerHTML = `Your response DECLINED has been recorded. If you have made a mistake, you can resubmit the form and it will replace your previous submission.`;
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
    `\nDATA TO BE SENT TO SERVER:\n` + JSON.stringify(data)
  );
}
