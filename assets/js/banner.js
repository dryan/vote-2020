(function () {
  "use strict";

  const template = document.createElement("template");
  const ref = window.encodeURIComponent(
    `vote2020[${window.location.hostname}]`
  );
  template.innerHTML = `
    <link href="/assets/css/banner.css" rel="stylesheet">
    <div class="banner">
      <a href="#close" class="banner-dismiss"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><path d="M18 6L6 18M6 6l12 12"/></svg> <span class="sr-only">Close</span></a>
      <div class="container">
        <div class="banner-text">Hello!</div>
        <div class="banner-actions">
          <a href="https://www.vote.org/?ref=${ref}" rel="noopener" target="_blank" class="btn">
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </div>
  `;

  class VoteBanner extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.shadowRoot
        .querySelector(".banner-dismiss")
        .addEventListener("click", this.dismiss.bind(this), true);
    }

    dismiss(ev) {
      ev.preventDefault();

      console.debug(this.dataset);
      window.localStorage.setItem("x-vote-banner-dismissed", 1);
    }
  }

  window.customElements.define("x-vote-banner", VoteBanner);

  const script = document.querySelector("#vote-banner");
  if (script) {
    const banner = document.createElement("x-vote-banner");
    Object.entries(script.dataset).map(([prop, val]) => {
      banner.dataset[prop] = val;
    });
    if (!window.localStorage.getItem("x-vote-banner-dismissed")) {
      document.body.appendChild(banner);
    }
  }
})();
