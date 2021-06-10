$(document).on("turbolinks:load", function () {
    if ($('.static_pages.index').length > 0) {
      indexTasks(function (response) {
        var htmlString = response.tasks.map(function(task) {
          return "<div class='col-12 mb-3 p-2 border rounded task clearfix' data-id='" + task.id + "'> \
          <input type='checkbox' class='mark-complete mr-2'>" + task.content + "\
            <button class='delete float-right " + task.completed + "' data-id='" + task.id + "'>Remove</button></div>";
        });
  
        $("#tasks").html(htmlString);
      });
    }
  });