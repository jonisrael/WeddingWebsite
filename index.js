import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";

import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import dotenv from "dotenv";

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
  document
    .querySelector("#nav-bar")
    .addEventListener("click", () =>
      document.querySelector("nav > ul").classList.toggle("hidden--mobile")
    );
}

export function deleteEntry(_id) {
  axios
    .delete(`${process.env.API}/games/${_id}`) // process.env.API accesses API
    .then((response) => {
      console.log(`Deletion Successful.`);
    })
    .catch((error) => {
      leaderboard.reason = "no-leaderboard";
      console.log("Deletion Failed.", error);
    });
}

export function updateEntry(newData, indexToReplace) {
  console.log("entry:", leaderboard.data[indexToReplace]);
  console.log("index:", indexToReplace);
  axios
    .put(
      `${process.env.API}/games/${leaderboard.data[indexToReplace]._id}`,
      newData
    ) // process.env.API accesses API
    .then((response) => {
      console.log(`Update Successful. Setting username to ${newData.name}`);
      localStorage.setItem("username", newData.name);
    })
    .catch((error) => {
      leaderboard.reason = "no-leaderboard";
      displayMessage(
        `Failed to Update Leaderboard at Rank ${indexToReplace + 1}. ${error}`
      );
      console.log("Update Failed, index ${indexToReplace)", error);
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
      leaderboard.reason = "no-leaderboard";
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
