import html from "html-literal";

export default (st) => html`
  <section id="travel">
    <body>
      <div>
        <ul id="travel-tabs">
          <li>
            <div class="tab-title">
              <span>Lodging</span>
              <i class="toggle-tab-icon"></i>
            </div>
            <div class="tab-content">
              <p>
                We have three locations in which we have booked rooms.
                <br /><br />
                Location 1, located in the BLANK area. About BLANK minute drive
                to the ceremony and BLANK minute drive to the reception. Embed
                Maps here:
                <br /><br />
                Location 2, located in the BLANK area. About BLANK minute drive
                to the ceremony and BLANK minute drive to the reception.
                <br /><br />
                Location 3, located in the BLANK area. About BLANK minute drive
                to the ceremony and BLANK minute drive to the reception.
                <br /><br />
              </p>
            </div>
          </li>
          <li>
            <div class="tab-title">
              <span>Ceremony</span>
              <i class="toggle-tab-icon"></i>
            </div>
            <div class="tab-content">
              <p>
                The ceremony will be at the Piper Palm House in Tower Grove
                Park. <br />
                The address is:
                <a href="https://goo.gl/maps/s2VerwemNhJEV9hC8" target="_blank"
                  ><strong>4271 Northeast Dr, St. Louis, MO 63110</strong></a
                >.
              </p>
              <div id="ceremony-map-section" class="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3117.7860973545285!2d-90.25934368465815!3d38.60779327961635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d8b45683d57e5d%3A0x748efe9a2237e0f5!2s4271%20Northeast%20Dr%2C%20St.%20Louis%2C%20MO%2063110!5e0!3m2!1sen!2sus!4v1656697016039!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <p>
                <strong>Parking:</strong><br />There is no specific parking lot
                for the Piper Palm House, but all parking within the park is
                free. <br /><br />

                <strong>If you enter the park from Magnolia Ave</strong>: Go
                around the roundabout to the second exit, turn left at either
                the first or second turnoffs and find parking near the Piper
                Palm House. Turn right before the roundabout and park along the
                road through the park.
                <br />
                <br />
                <strong>If you enter the park from Arsenal St</strong>: Take the
                first exit on the roundabout, turn left at either the first or
                second turnoffs and find parking near the Piper Palm House. -
                You can take the second exit on the roundabout, turn left at the
                first turnoff and park along the road.
              </p>
            </div>
          </li>
          <li>
            <div class="tab-title">
              <span>Reception</span>
              <i class="toggle-tab-icon"></i>
            </div>
            <div class="tab-content">
              <p>
                The address is:
                <a
                  href="https://goo.gl/maps/NTmjZWagaJ65y5hE8"
                  target="_blank"
                  color="white"
                >
                  <strong>5856 Christy Blvd, St. Louis, MO 63116</strong>
                </a>
                <br />
                <br />
                The reception will be at The Christy of Saint Louis, about ten
                minutes away from the ceremony location. <br /><br />
                <strong>Parking:</strong><br />
                There is a parking lot directly next to The Christy and street
                parking will also be available.
                <br />
                <br />
                <strong
                  >Directions from the Piper Palm House to The Christy:</strong
                ><br />
                Go to the roundabout on Central Cross Drive<br />
                At the roundabout, take the exit on the south side, heading
                towards Arsenal St.<br />
                Turn right onto Arsenal St.<br />
                (0.5 mi.) Turn left onto S. Kingshighway Blvd.<br />
                (1.5 mi.) Take a slight left turn on Neosho St.<br />
                (0.6 mi.) The destination is on your left.<br />
              </p>
            </div>
          </li>
        </ul>
      </div>
    </body>
  </section>
`;

// import html from "html-literal";

// export default st => html`
//   <section id="about-page">
//     <body>
//       <div>
//         <p>
//         Lodging

// Ceremony
// The ceremony will be at the Piper Palm House in Tower Grove Park.
// 4271 Northeast Dr, St. Louis, MO 63110

// Directions from the hotels to the Piper Palm House:

// Parking:
// There is no specific parking lot for the Piper Palm House but all parking within the park is free.
//  If you enter the park from Magnolia Ave:
// - You can go around the roundabout to the second exit, turn left at either the first or second turnoffs and find parking near the Piper Palm House.
// - You can turn right before the roundabout and park along the road through the park.

// If you enter the park from Arsenal St:
// - You can take the first exit on the roundabout,  turn left at either the first or second turnoffs and find parking near the Piper Palm House.
// - You can take the second exit on the roundabout, turn left at the first turnoff and park along the road.

// These parking locations are marked in pink/blue on the map below.

// Reception
// The reception will be at The Christy of Saint Louis, about ten minutes away from the ceremony location
// 5856 Christy Blvd, St. Louis, MO 63116

// There is a parking lot directly next to The Christy and street parking will also

// Directions from the Piper Palm House to The Christy:
// Go to the roundabout on Central Cross Drive
// At the roundabout, take the exit on the south side, heading towards Arsenal St.
// Turn right onto Arsenal St.
// (0.5 mi.) Turn left onto S. Kingshighway Blvd.
// (1.5 mi.) Take a slight left turn on Neosho St.
// (0.6 mi.) The destination is on your left.

// Directions from The Christy to the hotels:

//         </p>
//       </div>
//     </body>
//   </section>
// `;
