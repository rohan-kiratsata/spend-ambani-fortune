'use strict';
// Elements
let totalMoneyElement = document.querySelector('#totalMoney');
let percentageElement = document.querySelector('#percentageLeft');
let buyButtons = document.querySelectorAll('#buy');
let sellButtons = document.querySelectorAll('#sell');
const appContainer = document.querySelector('.app-container');

// Default data
let elonFortune = 95700000000;
let totalPercentage = 100;

let elements = [];

// Events
appContainer.addEventListener('click', (e) => {
  let element = e.target.parentElement;

  if (e.target.classList.contains('btn-buy')) {
    buyItem(element);
  } else if (e.target.classList.contains('btn-sell')) {
    sellItem(element);
  }
});

// Buy item
function buyItem(element) {
  // change default data to new data

  if (elonFortune - Number(element.dataset.price) >= 0) {
    elonFortune -= Number(element.dataset.price);
    totalPercentage = (elonFortune * 100) / 95700000000;

    // Item name
    let itemName = element.parentElement.querySelector('#name').textContent;

    // get span to increment by one
    let amountOfItems = element.querySelector('#amount');
    amountOfItems.textContent = `${Number(amountOfItems.textContent) + 1}`;

    // get button to enable it when item is more than 0
    let button = element.querySelector('#sell');
    if (Number(amountOfItems.textContent) > 0) {
      button.disabled = false;
    }

    updateTotalAndPercentage();

    // Create (if its new) or update recipt item(if it already exists)
    createReciptItem(
      itemName,
      Number(amountOfItems.textContent),
      formatMoney(
        Number(element.dataset.price) * Number(amountOfItems.textContent)
      )
    );

    updateReceipt();
  } else {
    cantAffordAlert();
  }
}

function cantAffordAlert() {
  totalMoneyElement.innerHTML = `<p class="totalMoney">Can't afford that!</p>`;
  percentageElement.innerHTML = `<p class ="percentageLeft">Sell something!</p>`;
}

function createReciptItem(name, amount, total) {
  let receiptItem = new ReceiptItem();
  receiptItem.name = name;
  receiptItem.amount = amount;
  receiptItem.total = total;

  if (!checkReceiptItemExists(receiptItem)) {
    receiptItemsArr.push(receiptItem);
  } else {
    updateReceiptItem(receiptItem);
  }
}

// Sell Item
function sellItem(element) {
  // change default data to new data

  elonFortune += Number(element.dataset.price);
  totalPercentage = (elonFortune * 100) / 95700000000;

  // Item name
  let itemName = element.parentElement.querySelector('p').textContent;

  // get span to decrement by one
  let amountOfItems = element.querySelector('span');
  amountOfItems.textContent = `${Number(amountOfItems.textContent) - 1}`;

  // get button to disable when item is less than 0
  let button = element.querySelector('#sell');

  if (Number(amountOfItems.textContent) === 0) {
    button.disabled = true;
  }
  updateTotalAndPercentage();

  createReciptItem(
    itemName,
    Number(amountOfItems.textContent),
    formatMoney(
      Number(element.dataset.price) * Number(amountOfItems.textContent)
    )
  );

  updateReceipt();
}

function updateTotalAndPercentage() {
  totalMoneyElement.innerHTML = `<p class="totalMoney">Remaining: ${formatMoney(
    elonFortune
  )} USD</p>`;
  percentageElement.innerHTML = `<p class ="percentageLeft">You only spent ${(
    100 - totalPercentage
  ).toFixed(6)} % of the total!</p>`;
}

// Format Money Function
function formatMoney(number) {
  return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

// Class to create unique receipt items
class ReceiptItem {
  constructor() {
    this.name;
    this.amount;
    this.total;
  }
}

let receiptItemsArr = [];

// Function that check if that receipt items its already added on the array
function checkReceiptItemExists(receiptItem) {
  let i = 0;
  let exists = false;

  while (!exists && i < receiptItemsArr.length) {
    let itemX = receiptItemsArr[i];
    if (itemX.name === receiptItem.name) {
      exists = true;
    }
    i++;
  }

  return exists;
}

function updateReceiptItem(receiptItem) {
  let i = 0;
  let itemInArr = null;

  while (itemInArr === null && i < receiptItemsArr.length) {
    let itemX = receiptItemsArr[i];

    if (itemX.name === receiptItem.name) {
      itemInArr = itemX;
    }
    i++;
  }

  if (itemInArr) {
    itemInArr.name = receiptItem.name;
    itemInArr.amount = receiptItem.amount;
    itemInArr.total = receiptItem.total;
  }
}

// Function to create recipt (iterara por el array y mostrara los objetos en una lista)
function updateReceipt() {
  let title = `<h1>Receipt</h1>`;
  let receipt = '';
  let total = formatMoney(95700000000 - elonFortune);

  for (let i = 0; i < receiptItemsArr.length; i++) {
    let itemX = receiptItemsArr[i];

    if (itemX.amount !== 0) {
      receipt += `<p>${itemX.name} x <strong> ${itemX.amount}</strong>..............$ ${itemX.total}</p>`;
    }
  }

  document.querySelector('#receipt-container').innerHTML =
    title + receipt + `<p class="totalRecipt">Total is: $ ${total}</p>`;
}

// Function to print
function printSection(el) {
  let printsection = document.getElementById(el).innerHTML;
  document.body.innerHTML = printsection;

  window.print();
}

// Element class - preload data - generate html elements

class Element {
  static nro = 1;
  constructor(name, price, image) {
    this.id = Element.nro++;
    this.name = name;
    this.price = price;
    this.amount = 0;
    this.image = image;
  }
}

function createAndSaveElement(elementName, price, image) {
  if (elementName !== '' && price > 0 && image !== '') {
    let newElement = new Element(elementName, price, image);
    elements.push(newElement);
  }
}

preLoad();

function preLoad() {
  createAndSaveElement(
    'PS5',
    499,
    'IMAGES/ps5.png'
  );

  createAndSaveElement(
    'XBox Series X',
    499,
    'IMAGES/xbox.png'
    );
  createAndSaveElement(
    'MacBook Pro 16 Inch M1 Max',
    3499,
    'IMAGES/macbook.jpg'
    );
  createAndSaveElement(
    'Iphone 13 Pro',
    1499,
    'IMAGES/iphone.jfif'
  );
  createAndSaveElement(
    "Gaming PC Build Highest Specs",
    4000,
    'IMAGES/pc.jpg'
  );

  createAndSaveElement(
    'Razer Blade 14 Laptop',
    2900,
    'IMAGES/razerblade.jpg'
  );
  createAndSaveElement(
    'Netflix for 50 Years',
    6000,
    'IMAGES/netflixlogo.0.0.jfif'
  );
  createAndSaveElement(
    'Amazon Prime for 50 Years',
    5950,
    'IMAGES/prime video.png'
  );
  createAndSaveElement(
    'Spotify for 50 years',
    9600,
    'IMAGES/spotify.png'
  );
  createAndSaveElement(
    'Entire Steam library',
    628000,
    'IMAGES/Logo-Steam.jpg'
  );
  createAndSaveElement(
    'Antilia',
    2600000000,
    'IMAGES/antilia.jpg'
  );
  createAndSaveElement(
    "Lamborghini Aventador",
    500000,
    'IMAGES/lambo.jpg'
  );
  createAndSaveElement(
    'Tesla Model S Plaid with Auto Drive',
    144490,
    'IMAGES/tesla.jfif'
  );
  createAndSaveElement(
    'Tesla Cybertruck',
    70000,
    'IMAGES/cybertruck.webp'
  );
  createAndSaveElement(
    'Ferrari F8',
    276000,
    'IMAGES/ferrari.jpg'
  );
  createAndSaveElement(
    'Buggati Veyron',
    1900000,
    'IMAGES/buggati.jpg'
  );
  createAndSaveElement(
    '1000 Acres of land(Approx)',
    7000000,
    'IMAGES/land.jpg'
  );
  createAndSaveElement(
    'Private Island (Approx)',
    4950000,
    'IMAGES/island.jpg'
  );
  createAndSaveElement(
    'Private Jet',
    17000000,
    'IMAGES/jet.jpg'
  );
  createAndSaveElement(
    'Private Cruise',
    179400000,
    'IMAGES/cruise.jpg'
  );

  createAndSaveElement(
    'IIT Graduation Fees',
    14000,
    'IMAGES/iit.jpg'
  );

  createAndSaveElement(
    'Yatch',
    300000000,
    'IMAGES/yatch.jpg'
  );

  createAndSaveElement(
    'Villa Leopolda France - Large Mansion',
    750000000,
    'IMAGES/villa.jpg'
  );

  createAndSaveElement(
    'F1 Team (Approx)',
    700000000,
    'IMAGES/f1.jfif'
  );

  createAndSaveElement(
    'L.A House (4 Room + 2 Bedroom + Pool)',
    2271000,
    'IMAGES/la-house.jpg'
  );

  createAndSaveElement(
    'Luxury House L.A',
    6995000,
    'IMAGES/house2.jpg'
  );

  createAndSaveElement(
    'Give 5000 Dollar each to 1000 Person',
    5000000,
    'IMAGES/money.jpg'
  );

  createAndSaveElement(
    'Organize Squid Game(Violence Free)',
    38000000,
    'IMAGES/squid-game.jpg'
  );
  createAndSaveElement(
    'VirginGalactic Space Ride',
    250000,
    'IMAGES/spaceride.jpg'
  );
  createAndSaveElement(
    'Stay in Burj Al Arab for 30 Days',
    51000,
    'IMAGES/burjhotel.jpg'
  );
}

elements.forEach((element) => {
  let newElement = document.createElement('div');

  newElement.classList.add('element');

  newElement.innerHTML = `<img src="${element.image}" alt="${element.name}" />
  <p id="name">${element.name}</p>
  <span id="price">$ ${formatMoney(element.price)}</span>
  <div class="buyAndSellContainer" data-price="${element.price}">
    <button class="btn-sell" id="sell" disabled>SELL</button>
    <span id="amount">${element.amount}</span>
    <button class="btn-buy" id="buy" >BUY</button>
  </div>`;

  appContainer.appendChild(newElement);
});

//  PS: This JS Code is by Nico. I'm dumb at JS.