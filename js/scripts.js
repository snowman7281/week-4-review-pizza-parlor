//business logic or backend

// constructor for size and toppings
function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
  this.meats = [];
  this.veggies = [];
}
Pizza.prototype.addMeat = function(meat) {
  this.meats.push(meat);
}
Pizza.prototype.addVeggie = function(veggie) {
  this.veggies.push(veggie);
}
Pizza.prototype.newCost = function() {
  var cost = 0;
  if (this.size === "medium") {
    cost = 12;
  } else if (this.size === "small") {
    cost = 10;
  } else if (this.size === "large") {
    cost = 14;
  } else if (this.size === "extra large") {
    cost = 16;
  }
  this.meats.forEach(function() {
    cost += 2;
  });
  this.veggies.forEach(function() {
    cost += 1;
  });
  if (this.cheese === "extra") {
    cost += 2;
  }
  this.cost = cost;
}

// constructor for order and each pizza
function Order(firstName, lastName, address, phone, payment) {
  this.firstName = firstName;
  this.address = address;
  this.phone = phone;
  this.payment = payment;
  this.pizzas = [];
}
Order.prototype.addPizza = function(pizza) {
  pizza.newCost();
  this.pizzas.push(pizza);
}
Order.prototype.removePizza = function(pizzaNumber) {
  this.pizzas.splice(pizzaNumber-1,1);
}
Order.prototype.determineTotalCost = function() {
  var totalCost = 0;
  this.pizzas.forEach(function(pizza) {
    totalCost += pizza.cost;
  });
  this.totalCost = totalCost;
}



//user interface or frontend

var nextDiv = function(toHide, toShow) {
  $(toHide).hide();
  $(toShow).show();
}

var createCustomerOrder = function() {
  var firstName = $('#first-name').val();
  var lastName = $('#last-name').val();
  var address = $('#street').val() + ', ' + $('#city').val() + ', ' + $('#state').val() + ', ' + $('#zip-code').val();
  var phone = $('#phone').val();
  var payment = $('input[name="payment"]:checked').val();

  return new Order(firstName, lastName, address, phone, payment);
}


$(document).ready(function(){


});
