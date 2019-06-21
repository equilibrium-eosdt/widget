import { autoIncrement } from "./globals";

const containerStyle = (id: string) => `
#${id} {
  display: flex;
  flex-flow: column nowrap;
}
`;

const styles = `

  h2 {
  font-weight: 400;
  }

  .equil-position-manage {
    display: flex;
  }

  .equil-position-parameters {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px;
    padding-bottom: 15px;
    background: #ecf6ff;
    flex: 0 0 320px;
  }

  .equil-position-parameters--empty {
    justify-content: flex-start;
  }

  .equil-position-actions {
    flex: 1 0 auto;
    margin-right: 40px;
  }

  .equil-position-actions__labels {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 320px;
    width: 100%;
    margin-bottom: 18px;
  }

  .equil-position-actions__label {
    height: 50px;
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

  .equil-position-parameters__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #0024461a;
    min-height: 29px;
    width: 100%;
  }

  .equil-position-parameters__item:last-of-type {
    border-bottom: 1px solid transparent;
  }

  .equil-position-parameters__title {
    font-size: 12px;
  }

  .equil-position-parameters__value,
  .equil-position-actions__value {
    font-family: "Geometria-Bold", serif;
    font-size: 12px;
  }

  .equil-position-manage__title {
    font-family: "Geometria-Heavy", serif;
    color: #333;
    font-size: 20px;
    line-height: 25px;
    margin-top: 0;
    margin-bottom: 20px;
  }

  .equil-position-manage__username {
  }

  .equil-position-manage__tab-container {
    display: flex;
    flex-flow: column nowrap;
  }

  .equil-position-manage__tabs {
    display: flex;
    flex-flow: row nowrap;
    list-style: none;
    padding-left: 0px;
    font-size: 16px;
    margin-top: 0;
  }

  .equil-position-manage__tab {
    border-bottom: 2px #fff solid;
    cursor: pointer;
    margin-right: 15px;
    font-family: "Geometria-Bold", serif;
    color: #002446;
    opacity: 0.5;
  }

  .equil-position-manage__tab--active {
    border-bottom: 2px #0024461a solid;
    opacity: 1;
  }

  .equil-position-manage__error {
    color: red;
    position: absolute;
    bottom: -40px;
    font-size: 12px;
  }

  .equil-position-manage__pending {
    position: absolute;
    bottom: -40px;
  }

  .equil-scatter-auth {
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

  .equil-position-manage__form {
    display: flex;
    position: relative;
    flex-direction: column;
  }

  .equil-position-manage__input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    min-height: 61px;
    margin-bottom: 25px;
  }

  .equil-position-manage__input-wrapper:last-of-type {
    margin-bottom: 15px;
  }

  .equil-position-manage__input-label {
    font-family: "Geometria-Bold", serif;
    font-size: 12px;
    line-height: 15px;
    color: #002446;
  }

  .equil-position-manage__form--tab .equil-position-manage__input-wrapper {
    min-height: 40px;
  }

  .equil-position-manage__input {
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

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    display: none;
    -webkit-appearance: none;
    margin: 0;
}

  input[type=number] {
    -moz-appearance:textfield;
}


  .equil-position-manage__input--error {
    border-color: red;
  }

  .equil-position-manage__button {
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
