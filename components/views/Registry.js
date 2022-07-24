import html from "html-literal";

export default (st) => html`
  <section id="registry">
    <div id="registry-text">
      <p style="text-align: center; font-weight: bold; font-size: x-large;">
        Our registry can be found at the Knot.com. <br />Click the button below
        to access it!
      </p>
    </div>
    <div class="registry-button-section">
      <a
        class="default-button"
        href="https://registry.theknot.com/susanna-bowers-jonathan-israel-november-2022-mo/52790054"
        >Registry</a
      >
    </div>
    <img id="supporting-photo"></img>
  </section>
`;
