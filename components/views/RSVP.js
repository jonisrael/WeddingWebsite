import html from "html-literal";

export default (st) => html`
  <section id="rsvp">
    <h2>
      If you're responding to an invite, please enter your FULL formal name
      below (it should match the invitation) to access the RSVP form. Only enter
      one name from the invitation. Please RSVP by October 22nd!
    </h2>
    <form>
      <div id="guest-lookup">
        <label for="guest-name" id="guest-label">
          Look up your name here:
        </label>
        <br />
        <input
          type="text"
          name="guest-name"
          id="guest-name"
          minlength="3"
          maxlength="20"
          autofocus
        />
        <button id="confirm-name-entry">Confirm Name</button>
      </div>
      <img class="rsvp-photos" id="rsvp-photo-1" />
    </form>
  </section>
`;

/* <form>
<label for="up">Up / Menu Up</label>
<input type="text" id="up" name="up" maxlength="1" /><br />

<label for="down">Down / Menu Down</label>
<input type="text" id="down" name="down" maxlength="1" required /><br />

<label for="left">Left / Menu Left</label>
<input type="text" id="left" name="left" maxlength="1" required /><br />

<label for="right">Right / Menu Right (Alt)</label>
<input type="text" id="right" name="right" maxlength="1" required /><br />

<label for="swap">Swap / Menu Select</label>
<input type="text" id="swap" name="swap" maxlength="1" required /><br />

<label for="raise">Raise / Menu Restart</label>
<input type="text" id="raise" name="raise" maxlength="1" /><br />

<label for="pause">Pause / Unpause / Start Game</label>
<input type="text" id="pause" name="pause" maxlength="1" /><br />

<label for="menu">Pause / Return to Main Menu</label>
<input type="text" id="menu" name="menu" maxlength="1" /><br />
</form> */
