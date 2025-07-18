import { renderListWithTemplate, getData } from "./utils.mjs";

export default class Alert {
  constructor(category) {
    this.category = category;
    this.path = import.meta.env.BASE_URL + `json/${this.category}.json`;
  }
  async init() {
    const alertData = await getData(this.path);
    let alertSection;
    if (alertData.length !== 0) {
      alertSection = document.createElement("section");
      alertSection.className = "alert-list";
      this.renderAlerts(alertData, alertSection);
    }
  }
  renderAlerts(alertData, alertSection) {
    renderListWithTemplate(alertTemplate, alertSection, alertData);
    const main = document.querySelector("main");
    main.prepend(alertSection);
  }
}

function alertTemplate(alert) {
  return `
    <p style="
      background: ${alert.background};
      color: ${alert.color};
      padding: 0.5em;
      margin-bottom: 0.5em;
    ">
      ${alert.message}
    </p>
  `;
}
