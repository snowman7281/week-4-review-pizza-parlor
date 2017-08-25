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




//user interface or frontend
$(document).ready(function(){


});
