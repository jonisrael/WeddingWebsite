import html from "html-literal";

export default (st) => html`
  <section id="home-page">
    <h1 id="more-info" class="headers">Our Story</h1>

    <div id="desktop-div">
      <div class="story-rows">
        <div class="columns"><img class="home-photos" id="home-photo-1" /></div>
        <div class="columns story">
          <p>
            Our story begins in the Spring of 2019. Susanna was teaching second
            grade at an elementary school in Saint Louis and Jon was traveling
            around to different schools teaching chess. He was assigned to
            Susanna's school on Friday afternoons and Susanna was in charge of
            monitoring the group he was teaching. Humor is one of the first
            things Susanna noticed with Jon, and he had many dumb jokes and
            funny phrases to entertain the kids. He was also cute!
          </p>
          <p>
            Over time, Susanna realized she had a crush on Jon and, when his
            time of working at her school was done, sent him an email saying
            thank you and invited him to be a volunteer for a field trip to a
            Cardinals' baseball game. Jon and Susanna emailed back and forth,
            and when he realized there may have been more going on than just
            needing volunteers, Jon skipped class to meet up at the baseball
            game.
          </p>
          <p>
            Initially he asked her to paintball, which was a terrible idea, but
            luckily the weather prevented a disastrous date from occurring, and
            we instead made plans to go out to eat that weekend. We have been
            together since. Susanna has only asked one guy out in her
            lifetime,and it worked!
          </p>
        </div>
      </div>
      <div class="story-rows">
        <div class="columns"><img class="home-photos" id="home-photo-2" /></div>
        <div class="columns"><img class="home-photos" id="home-photo-3" /></div>
      </div>
      <div class="story-rows">
        <div class="columns"><img class="home-photos" id="home-photo-4" /></div>
        <div class="columns"><img class="home-photos" id="home-photo-5" /></div>
      </div>
    </div>

    <div id="mobile-div">
      <div class="story-rows-mob">
        <div class="rows story"></div>
        <p>
          Our story begins in the Spring of 2019. Susanna was teaching second
          grade at an elementary school in Saint Louis and Jon was traveling
          around to different schools teaching chess. He was assigned to
          Susanna's school on Friday afternoons and Susanna was in charge of
          monitoring the group he was teaching. Humor is one of the first things
          Susanna noticed with Jon, and he had many dumb jokes and funny phrases
          to keep both himself and the kids entertained. He was cute and
          hilarious!
        </p>
        <p>
          Over time, Susanna realized she had a crush on Jon and, when his time
          of working at her school was done, sent him an email saying thank you
          and invited him to be a volunteer for a field trip to a Cardinals'
          baseball game. Jon and Susanna emailed back and forth, and when he
          realized there may have been more going on than just needing
          volunteers, Jon skipped class to meet up at the baseball game.
        </p>
        <p>
          Initially he asked her to paintball, which was a terrible idea, but
          luckily the weather prevented a disasterous date from occuring, and we
          instead made plans to go out to eat that weekend. We have been
          together since.
        </p>
        <p>
          Susanna has only asked one guy out in her lifetime, and it worked!
          We've been together ever since!
        </p>
        <div class="rows"><img class="home-photos" id="home-photo-1" /></div>
        <div class="rows"><img class="home-photos" id="home-photo-2" /></div>
        <div class="rows"><img class="home-photos" id="home-photo-3" /></div>
        <div class="rows"><img class="home-photos" id="home-photo-4" /></div>
        <div class="rows"><img class="home-photos" id="home-photo-5" /></div>
      </div>
    </div>
  </section>
`;
