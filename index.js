import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";

import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import dotenv from "dotenv";
import { guestList } from "./guestList";
import { checkInvitedGuestList } from "./rsvpForm/functions/checkInvitedGuestList.js";
import { askForConfirmation } from "./rsvpForm/main";

dotenv.config();

export const router = new Navigo(window.location.origin);

export function render(st) {
  // if (st === undefined) st = state.Home;
  console.log(state, st);
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
  `;
  router.updatePageLinks();

  let links = document.getElementsByClassName("single-nav-link");
  for (let i = 0; i < links.length; i++) {
    let link = links[i];
    if (st.view === link.innerHTML) {
      link.style.borderBottom = "2px solid black";
    }
    console.log(link.innerHTML, st.view === link.innerHTML);
  }
  // localStorage.removeItem("patchNotesShown");
  // console.log("patch notes shown:", localStorage.getItem("patchNotesShown"));
  addEventListeners(st);
}

function addEventListeners(st) {
  // add menu toggle to bars icon in nav bar
  document.querySelector("footer > strong").addEventListener("click", () => {
    document.querySelectorAll(".nav-links > li").forEach((link) => {
      link.className = "dev-enabled nav-links";
      link.style.cssText = "display: inline !important;";
      console.log("done");
    });
  });
  document
    .querySelector("#nav-bar")
    .addEventListener("click", () =>
      document.querySelector("nav > ul").classList.toggle("hidden--mobile")
    );
  if (st.view === "Travel") {
    let travelTabList = document.querySelectorAll("#travel-tabs > li");
    for (let i = 0; i < travelTabList.length; i++) {
      let element = travelTabList[i];
      let title = document.querySelector(
        `#travel-tabs > li:nth-child(${i + 1}) > .tab-title`
      );
      let content = document.querySelector(
        `#travel-tabs > li:nth-child(${i + 1}) > .tab-content`
      );
      let icon = document.querySelector(
        `#travel-tabs > li:nth-child(${i + 1}) > .tab-title > .toggle-tab-icon`
      );
      console.log(element);
      title.addEventListener("click", () => {
        if (content.className.includes("active")) {
          content.className = "tab-content";
          icon.className = "toggle-tab-icon";
          title.className = "tab-title";
        } else {
          if (document.querySelector(".tab-content.active")) {
            document.querySelector(".toggle-tab-icon.open").click();
          }
          content.className += " active";
          icon.className += " open";
          title.className += " active";
        }
      });
    }
  }
  if (st.view === "RSVP") {
    let confirmButton = document.querySelector("#confirm-name-entry");
    let guestName = document.querySelector("#guest-name");
    confirmButton.addEventListener("click", (event) => {
      event.preventDefault();
      let sortedGuestArray = checkInvitedGuestList(guestList, guestName.value);
      askForConfirmation(sortedGuestArray);
    });
  }
}

export function deleteEntry(_id) {
  axios
    .delete(`${process.env.API}/games/${_id}`) // process.env.API accesses API
    .then((response) => {
      console.log(`Deletion Successful.`);
    })
    .catch((error) => {
      console.log("Deletion Failed.", error);
    });
}

// export function updateRSVP(arrOfNames, name) {
//   console.log("entry:", state.RSVP.data[indexToReplace]);
//   console.log("index:", indexToReplace);
//   axios
//     .put(`${process.env.API}/entries/${state.RSVP.data._id}`, newData) // process.env.API accesses API
//     .then((response) => {
//       console.log(`Update Successful. Setting username to ${newData.name}`);
//       localStorage.setItem("username", newData.name);
//     })
//     .catch((error) => {
//       leaderboard.reason = "no-leaderboard";
//       displayMessage(
//         `Failed to Update Leaderboard at Rank ${indexToReplace + 1}. ${error}`
//       );
//       console.log("Update Failed, index ${indexToReplace)", error);
//     });
// }

export function getData() {
  axios
    .get("https://jon-and-susanna-wedding.herokuapp.com/entries")
    .then((response) => {
      console.log("Got Data!", response);
    })
    .catch((error) => {
      console.log("Failed to", error);
      displayMessage(
        `Failed to get names. Try reloading the page. If this continues, please contact Jonathan! ${error}`
      );
    });
}

export function sendData(requestData) {
  console.log("Posting data...");
  axios
    .post(`${process.env.API}/games`, requestData) // process.env.API accesses API
    .then((response) => {
      console.log("Posted!");
    })
    .catch((error) => {
      displayMessage(`Failed to Post Data. ${error}`);
      console.log("Failed to Post", error);
    });
}

export function displayMessage(msg, err = true, scroll = true, timeout = 5000) {
  if (document.getElementById("app-message"))
    document.getElementById("app-message").remove();
  let appMessageDisplay = document.createElement("div");
  appMessageDisplay.className = "app-message-display";
  appMessageDisplay.setAttribute("id", "app-message");
  document.getElementById("root").prepend(appMessageDisplay);
  let appMessage = document.createElement("h1");
  appMessage.className = "app-message-display";
  appMessage.innerHTML = `<u>${msg}</u>`;
  appMessageDisplay.append(appMessage);
  appMessage.style.color = err ? "#FF5555" : "#55FF55";
  setTimeout(() => {
    if (appMessageDisplay) appMessageDisplay.remove();
    else console.log("message is not there");
  }, timeout);
  if (scroll) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
}

router.hooks({
  before: (done, params) => {
    const page =
      params && params.hasOwnProperty("page")
        ? capitalize(params.page)
        : "Home";
    switch (page) {
      default:
        done();
    }
  },
});

router
  .on({
    "/": () => render(state.Home),
    ":page": (params) => {
      render(state[params.page]);
    },
  })
  .resolve();
