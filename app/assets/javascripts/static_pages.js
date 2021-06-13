$(document).on("turbolinks:load", function () {
    if ($('.static_pages.index').length > 0) {
      indexTasks(function (response) {
        var htmlString = response.tasks.map(function(task) {
          return "<div class='col-12 mb-3 p-2 border rounded task clearfix' data-id='" + task.id + "'> \
          <input type='checkbox' class='mark-complete mr-2'>" + task.content + "\
          <button class='delete rounded float-right " + task.completed + "' data-id='" + task.id + "'>Remove</button></div>";
        });
  
        $("#tasks").html(htmlString);
      });
    };

    $('#create-task').on('submit', function (e) {
      e.preventDefault();
      var content = $('#new-task-content').val();
      postTask(content);
      $('#new-task-content').val('');
    });

    // var injectTask = indexTasks(function (response) {
    //   var htmlString = response.tasks.map(function(task) {
    //     return "<div class='col-12 mb-3 p-2 border rounded task clearfix' data-id='" + task.id + "'> \
    //     <input type='checkbox' class='mark-complete mr-2'>" + task.content + "\
    //     <button class='delete rounded float-right " + task.completed + "' data-id='" + task.id + "'>Remove</button></div>";
    //   });
    
    //   $("#tasks").html(htmlString);
    // });

  });
