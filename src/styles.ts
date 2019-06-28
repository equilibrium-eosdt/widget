import { autoIncrement } from "./globals";

const containerStyle = (id: string) => `
#${id} {
  display: flex;
  flex-flow: column nowrap;
}
`;

interface Theme {
  title: {
    color: string;
    font: string;
  },
  text: {
    color: string;
    font: string;
    boldFont: string;
  },
  button: {
    textColor: string;
    font: string;
    background: string;
  },
  background: {
    primary: string;
    secondary: string;
  }
}

const styles = (theme: Theme) => `

  h2 {
  font-weight: 400;
  }

  .equil-position-manage {
    display: flex;
    justify-content: space-between;
    min-height: 450px;
    padding: 50px;
    padding-top: 115px;
    position: relative;
    width: 100%;
  }

  .equil-position-manage__header {
    width: 100%;
    height: 55px;
    background: #1792FF;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 50px;
    padding-right: 50px;
  }

  .equil-position-manage__header a {
    font-size: 16px;
    line-height: 20px;
    color: #FFFFFF;
    text-decoration: none;
    font-weight: bold;
    font-family: 'Geometria-Bold', serif;
    position: relative;
  }

  .equil-position-manage__logo {
    display: flex;
    align-items: center;
  }

  .equil-position-manage__telegram::after {
    content: "";

    position: absolute;
    top: -3px;
    left: -34px;

    width: 29px;
    height: 24px;

    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyOCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjYuMTA5NiAwLjE1NTI4MUwxLjMwNzE0IDkuNzIxNjRDLTAuMzg1NjY5IDEwLjQwMDggLTAuMzc1NjI5IDExLjM0NSAwLjk5ODU4NiAxMS43NjZMNy4xODQzOSAxMy42OTY3TDkuNTUxMjMgMjAuOTUzM0M5LjgzODk2IDIxLjc0NzUgOS42OTcxMiAyMi4wNjI1IDEwLjUzMTEgMjIuMDYyNUMxMS4xNzQ4IDIyLjA2MjUgMTEuNDYwMyAyMS43NjkgMTEuODE4OCAyMS40MTg5QzEyLjA0NjcgMjEuMTk1OCAxMy40MDAyIDE5Ljg3OTkgMTQuOTExNSAxOC40MTA1TDIxLjM0NTkgMjMuMTY0NUMyMi41Mjk5IDIzLjgxNzcgMjMuMzg0OCAyMy40NzkzIDIzLjY3OTcgMjIuMDY0OUwyNy45MDMzIDIuMTYxMjVDMjguMzM1OCAwLjQyNzU0NiAyNy4yNDI0IC0wLjM1ODg1MSAyNi4xMDk2IDAuMTU1MjgxWk04LjE1NTE4IDEzLjI1MzFMMjIuMDk4IDQuNDU2NTJDMjIuNzk0MSA0LjAzNDQgMjMuNDMyMyA0LjI2MTM1IDIyLjkwODMgNC43MjY0OEwxMC45Njk2IDE1LjQ5ODJMMTAuNTA0NyAyMC40NTYzTDguMTU1MTggMTMuMjUzMVYxMy4yNTMxWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=);
  }

  .equil-position-manage__header a:hover {
    text-decoration: none;
  }

  .equil-position-manage__wrapper {
    border: 1px solid #BEE1FF;
    border-radius: 3px;
    padding: 30px;
    position: relative;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    flex: 0 0 75%;
    min-width: 620px;
  }

   .equil-position-manage__wrapper--loading {
      align-items: center;
      justify-content: center;
   }

  .equil-position-manage__balanceAndPrice {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-left: 20px;
    flex: 0 0 25%;
  }

  .equil-position-manage__balanceAndPrice .equil-position-manage__wrapper {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    min-width: 310px;
    flex: 1 0 auto;
    min-width: unset;
  }

  .equil-position-manage__balanceAndPrice .equil-position-manage__wrapper:first-of-type {
    margin-bottom: 35px;
  }

  .equil-user-balances {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .equil-user-balances__item {
    display: flex;
    align-items: center;
    padding-left: 6px;
    padding-right: 15px;
    width: 100%;
    min-height: 50px;
    justify-content: space-between;
    border-bottom: 1px solid #BEE1FF;
  }

  .equil-user-balances__item:last-of-type {
    border-bottom: none;
  }

  .equil-user-balances__img {
    width: 19px;
    height: 25px;
    margin-right: 14px;
  }

  .equil-user-balances__values {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    min-height: 40px;
  }

  .equil-user-balances__values > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .equil-user-balances__USDvalue {
    font-size: 12px;
    line-height: 15px;
    color: #33333380;
  }

  .equil-rates {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .equil-rates__item {
    display: flex;
    align-items: center;
    padding-left: 6px;
    padding-right: 15px;
    width: 100%;
    min-height: 50px;
    justify-content: space-between;
    border-bottom: 1px solid #BEE1FF;
  }

  .equil-rates__item:last-of-type {
    border-bottom: none;
  }

  .equil-rates__img {
    width: 19px;
    height: 25px;
    margin-right: 14px;
  }

  .equil-rates__values {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1 0 auto;
  }

  .equil-position-parameters {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px;
    padding-bottom: 15px;
    background: ${theme.background.secondary};
    flex: 0 0 280px;
    border-radius: 3px;
  }

  .equil-position-parameters--empty {
    justify-content: flex-start;
  }

  .equil-position-actions {
    flex: 1 0 auto;
    margin-right: 30px;
    max-width: 320px;
  }

  .create-position-2,
  .create-position-5 {
    height: 100%;
  }

  .equil-position-actions__labels {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 320px;
    width: 100%;
    margin-bottom: 30px;
  }

  .equil-position-actions__label {
    height: 50px;
    flex: 0 0 48%;
    max-width: 48%;
    font-size: 12px;
    line-height: 15px;
    color: ${theme.text.color};
    background: ${theme.background.secondary};
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
    font-family: ${theme.text.boldFont};
    font-size: 12px;
  }

  .equil-position-manage__parametersTitle {
    font-family: ${theme.title.font};
    color: #333;
    font-size: 20px;
    line-height: 25px;
    margin-top: 0;
    margin-bottom: 20px;
  }

  .equil-position-manage__title {
    position: absolute;
    top: -27px;
    left: 0;

    font-family: ${theme.text.boldFont};
    font-size: 14px;
    font-weight: bold;
    color: #333;

    margin: 0;
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
    font-family: ${theme.text.boldFont};
    color: ${theme.text.color};
    opacity: 0.5;
  }

  .equil-position-manage__tab--active {
    border-bottom: 2px #0024461a solid;
    opacity: 1;
  }

  .equil-position-manage__error {
    color: red;
    position: absolute;
    bottom: -25px;
    font-size: 12px;
  }

  .equil-position-manage__pending {
    position: absolute;
    bottom: -25px;
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
    height: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    min-height: 129px;
  }

  .equil-position-manage__input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    min-height: 61px;
  }

  .equil-position-manage__input-label {
    font-family: ${theme.text.boldFont};
    font-size: 12px;
    line-height: 15px;
    color: ${theme.text.color};
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
    font-family: ${theme.text.boldFont};
    font-size: 14px;
    line-height: 18px;
    color: ${theme.text.color};
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

    color: ${theme.button.textColor};
    cursor: pointer;
    font-size: 14px;
    line-height: 18px;
    font-family: ${theme.button.font};

    background: ${theme.button.background};
  }
`;

export const setStyles = (theme: Theme = {
  title: {
    color: "#333",
    font: "'Geometria-Heavy', serif"
  },
  text: {
    color: "#002446",
    font: "'Geometria', serif",
    boldFont: "'Geometria-Bold', serif"
  },
  button: {
    textColor: "#ffffff",
    font: "'Geometria-Bold', serif",
    background: "#1792ff"
  },
  background: {
    primary: "#ffffff",
    secondary: "#ecf6ff"
  }
}) => {
  const element = window.document.createElement("style");
  element.appendChild(window.document.createTextNode(styles(theme)));
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
