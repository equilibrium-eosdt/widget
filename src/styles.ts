import { autoIncrement } from "./globals";

const containerStyle = (id: string) => `
#${id} {
  display: flex;
  flex-flow: column nowrap;
}
`;

const styles = `
  .position-manage {
    display: flex;
  }

  .position-parameters {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px;
    padding-bottom: 15px;
    background: #ecf6ff;
    flex: 0 0 320px;
  }

  .position-parameters--empty {
    justify-content: flex-start;
  }

  .position-actions {
    flex: 1 0 auto;
    margin-right: 40px;
  }

  .position-actions__labels {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 320px;
    width: 100%;
    margin-bottom: 18px;
  }

  .position-actions__label {
    height: 35px;
    flex: 0 0 48%;
    max-width: 48%;
    font-size: 12px;
    line-height: 15px;
    color: #002446;
    background: #ecf6ff;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
  }

  .position-parameters__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #0024461a;
    min-height: 29px;
    width: 100%;
  }

  .position-parameters__item:last-of-type {
    border-bottom: 1px solid transparent;
  }

  .position-parameters__title {
    font-size: 12px;
  }

  .position-parameters__value,
  .position-actions__value {
    font-family: "Geometria-Bold", serif;
    font-size: 12px;
  }

  .position-manage__title {
    font-family: "Geometria-Heavy", serif;
    color: #333;
    font-size: 20px;
    line-height: 25px;
    margin-top: 0;
    margin-bottom: 20px;
  }

  .position-manage__username {
  }

  .position-manage > .tab-container {
    display: flex;
    flex-flow: column nowrap;
  }

  .position-manage__tabs {
    display: flex;
    flex-flow: row nowrap;
    list-style: none;
    padding-left: 0px;
    font-size: 16px;
    margin-top: 0;
  }

  .position-manage__tab {
    border-bottom: 2px #fff solid;
    cursor: pointer;
    margin-right: 15px;
    font-family: "Geometria-Bold", serif;
    color: #002446;
    opacity: 0.5;
  }

  .position-manage__tab--active {
    border-bottom: 2px #0024461a solid;
    opacity: 1;
  }

  .position-manage__error {
    color: red;
    position: absolute;
    bottom: -40px;
    font-size: 12px;
  }

  .position-manage__pending {
    position: absolute;
    bottom: -40px;
  }

  .scatter-auth {
    display: flex;
  }

  .scatter-auth-button {
    height: 30px;
    min-width: 50px;
    border: 0;
    font-size: 16px;
    color: #333;
    background: #ccc;
  }

  .form {
    display: flex;
    position: relative;
    flex-direction: column;
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    min-height: 61px;
    margin-bottom: 25px;
  }

  .input-wrapper:last-of-type {
    margin-bottom: 15px;
  }

  .input-label {
    font-family: "Geometria-Bold", serif;
    font-size: 12px;
    line-height: 15px;
    color: #002446;
  }

  .form--tab .input-wrapper {
    min-height: 40px;
  }

  .input {
    border: 1px solid #0024461a;
    height: 40px;
    max-width: 320px;
    padding-left: 12px;
    width: 100%;
    outline: none;
    font-family: "Geometria-Bold", serif;
    font-size: 14px;
    line-height: 18px;
    color: #002446;
  }

  .input--error {
    border-color: red;
  }

  .button {
    max-width: 320px;
    width: 100%;
    height: 40px;

    border-radius: 4px;
    border: none;

    color: #fff;
    cursor: pointer;
    font-size: 14px;
    line-height: 18px;

    background: #1792ff;
  }
`;

export const setStyles = () => {
  const element = window.document.createElement("style");
  element.appendChild(window.document.createTextNode(styles));
  window.document.body.appendChild(element);
};

export const setContainerStyle = (el: HTMLElement) => {
  let id = el.id;

  if (!id) {
    el.id = id = `widget-${autoIncrement()}`;
  }

  const element = window.document.createElement("style");
  element.appendChild(window.document.createTextNode(containerStyle(id)));
  window.document.body.appendChild(element);
};
