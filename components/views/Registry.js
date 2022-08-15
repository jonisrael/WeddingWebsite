import html from "html-literal";

export default (st) => html`
  <section id="registry">
    <div id="registry-text">
      <br />
      <p style="text-align: center; font-weight: bold; font-size: x-large;">
        Our registry can be found at The Knot. <br /><br />
        <a
          id="registry-link"
          href="https://registry.theknot.com/susanna-bowers-jonathan-israel-november-2022-mo/52790054"
          >Click here to access it!</a
        >
      </p>
      <br />
      <div class="desktop-photos">
        <div class="rows">
          <div class="columns"><img class="reg-photos reg-photo-1" /></div>
          <div class="columns"><img class="reg-photos reg-photo-2" /></div>
        </div>
        <div class="rows">
          <div class="columns"><img class="reg-photos reg-photo-3" /></div>
          <div class="columns"><img class="reg-photos reg-photo-4" /></div>
        </div>
      </div>
      <div class="mobile-photos">
        <br />
        <div class="columns"><img class="reg-photos reg-photo-1" /></div>
        <div class="columns"><img class="reg-photos reg-photo-2" /></div>
        <div class="columns"><img class="reg-photos reg-photo-3" /></div>
        <div class="columns"><img class="reg-photos reg-photo-4" /></div>
      </div>
    </div>
  </section>
`;
