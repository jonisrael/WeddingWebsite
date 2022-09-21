import { writeErrorMessage } from "./writeErrorMessage";

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
    writeErrorMessage(
      "#guest-lookup",
      "We can't seem to find your name. Please try a different spelling!"
    );
  }
}
