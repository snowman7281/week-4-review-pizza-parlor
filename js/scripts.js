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

var createPizza = function() {
  var pizzaSize = $('input[name="pizza-size"]:checked').val();
  var cheese = $('input[name="cheese-options"]:checked').val();
  var newPizza = new Pizza(pizzaSize, cheese);
  $('input[name="meats"]:checked').each(function() {
    newPizza.addMeat($(this).val());
  });
  var vegToppings = [];
  $('input[name="veggies"]:checked').each(function() {
    newPizza.addVeg($(this).val());
  });
  resetPizzaForm();
  return newPizza;
}
var resetPizzaForm = function() {
  $('input[name="pizza-size"]:checked').attr("checked", false);
  $('input[value="medium"]').prop("checked", true);
  $('input[name="cheese-options"]:checked').attr("checked", false);
  $('input[value="regular"]').prop("checked", true);
  $('input[name="meats"]:checked').attr("checked", false);
  $('input[name="veggies"]:checked').attr("checked", false);
}

var populatePizzaList = function(pizza) {
  $('.pizza-list').append('<div class="pizza">' +
                            '<h4><span class="pizza-list-size">- One '+pizza.pizzaSize+' pizza</span></h4>' +
                            '<div class="pizza-info-toggle">' +
                              '<p>Cheese: <span class="pizza-list-cheese">'+pizza.cheese+'</span></p>' +
                              '<p>Meat toppings: </p>' +
                              '<ul class="pizza-list-meat-toppings"></ul>' +
                              '<p>Veggie toppings: </p>' +
                              '<ul class="pizza-list-veg-toppings"></ul>' +
                              '<p>Cost of this pizza: $<span>'+pizza.cost.toFixed(2)+'</span></p>'+
                            '</div>' +
                          '</div>');
  pizza.meatToppings.forEach(function(meatTopping) {
    $('.pizza-list .pizza-list-meat-toppings').last().append('<li>'+meatTopping+'</li>');
  });
  pizza.vegToppings.forEach(function(vegTopping) {
    $('.pizza-list .pizza-list-veg-toppings').last().append('<li>'+vegTopping+'</li>');
  });

  $('.pizza').last().click(function() {
      $(this).find('.pizza-info-toggle').toggle();
  });
  $('.pizza-info-toggle').last().click(function() {
      $(this).find('.pizza-info-toggle').toggle();
  });

}

var populateTotalPrice = function(customerOrder) {
  customerOrder.determineTotalCost();
  return customerOrder.totalCost;
}

$(document).ready(function(){

  var customerOrder = new Order();

  // event handler for begin ordering button
  $('.order-start button').click(function() {
    nextDiv('.order-start', '.info-input');
  });

    // event handler for customer information submit
  $('.infor-input form').submit(function(event) {
    event.preventDefault();
    customerOrder = createCustomerOrder();
    nextDiv('.info-input', '.pizza-input');
  });

    // event handler for add pizza
  $('.order-pizza-input form').submit(function(event) {
    event.preventDefault();
    var thisPizza = createPizza();
    customerOrder.addPizza(thisPizza);
    populatePizzaList(thisPizza);
    $("#pizza-list-total-cost").text('$ '+ populateTotalPrice(customerOrder).toFixed(2));
    nextDiv('.pizza-input', '.order-summary');
  });

    // event handler for add another pizza
  $('#add-another-pizza').click(function() {
    nextDiv('.order-summary', '.pizza-input');
  });

    // event handler for checkout order
  $('#checkout-order').click(function() {
    nextDiv('.order-summary', '.checked-out');
  });

    // event handler for new order/reset site
  $('#new-order').click(function() {
    customerOrder = new Order();
    $('.pizza-list').empty();
    nextDiv('.checked-out', '.order-start');
  });

    // event handler for log object to console
  $('#console-log').click(function() {
    console.log(customerOrder);
  })


});
