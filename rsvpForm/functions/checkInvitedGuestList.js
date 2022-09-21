import { writeErrorMessage } from "./writeErrorMessage";

let failCount = 0;

export function checkInvitedGuestList(guestList, nameEntry) {
  if (nameEntry.length === 0) {
    writeErrorMessage("#guest-lookup", "Please enter a name.");
    return;
  }
  nameEntry.replace("Mr. ", "");
  nameEntry.replace("Mrs. ", "");
  nameEntry.replace("Ms. ", "");
  nameEntry.replace("Miss ", "");
  nameEntry.replace("Dr. ", "");
  nameEntry.replace(" and ", "");
  nameEntry.replace(" & ", "");
  for (let i = 0; i < guestList.length; i++) {
    let guest = guestList[i];
    if (
      guest.name1.toLowerCase().includes(nameEntry.toLowerCase()) &&
      nameEntry.length > 0.7 * guest.name1.length &&
      nameEntry.includes(" ") &&
      nameEntry[nameEntry.length - 1] !== " "
    ) {
      return [guest.name1, guest.name2, guest.totalGuests, guest.index];
    }
    if (
      guest.name2.toLowerCase().includes(nameEntry.toLowerCase()) &&
      nameEntry.length > 0.66 * guest.name2.length
    ) {
      return [guest.name2, guest.name1, guest.totalGuests, guest.index];
    }
  }
  if (!document.querySelector("#error-message")) failCount = 0;
  failCount++;
  if (nameEntry === "Jonathan Israel") {
    writeErrorMessage("#guest-lookup", "Here comes the groom!", "blue");
    failCount = 0;
  } else if (nameEntry === "Susanna Bowers") {
    writeErrorMessage("#guest-lookup", "Here comes the bride!", "#FF69B4");
    failCount = 0;
  } else if (failCount === 1) {
    writeErrorMessage(
      "#guest-lookup",
      `We can't seem to find your name. Please check your spelling and try again!`
    );
  } else if (failCount === 2) {
    writeErrorMessage(
      "#guest-lookup",
      `We still can't seem to find your name. Did you enter your full formal name? (For example, if your name is "Jim", you'll likely go by "James")`
    );
  } else if (failCount === 3) {
    writeErrorMessage(
      "#guest-lookup",
      "Try one more time -- did you make sure to enter only one name?"
    );
  } else {
    writeErrorMessage(
      "#guest-lookup",
      "It looks like we're having trouble finding your name. If you're on the invitation but can't access the form, please email me at jonisrael45@gmail.com so I can send you the form manually!"
    );
  }
}
