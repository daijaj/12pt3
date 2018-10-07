// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".burger-status").on("click", function(event) {
      var id = $(this).data("id");
      var devouredState = $(this).data("new-state");
  
      var newBurgerStatus = {
        devoured: devouredState
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newBurgerStatus
      }).then(
        function() {
          console.log("Burger status updated to", devouredState);
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newBurger = {
        burger_name: $("#burger-name-input").val().trim(),
        devoured: false
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("Added new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });