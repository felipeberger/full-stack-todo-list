$(document).on("turbolinks:load", function () {
    if ($('.static_pages.index').length > 0) {
      indexTasks(function (response) {
        var htmlString = response.tasks.map(function(task) {
          return "<div class='col-12 mb-3 p-2 border rounded task clearfix' data-id='" + task.id + "'> \
          <input type='checkbox' class='mark-complete mr-2'><span style=''>" + task.content + "\
          </span><button class='delete rounded float-right " + task.completed + "' data-id='" + task.id + "'>Remove</button></div>";
        });
  
        $("#tasks").html(htmlString);
      });
    };

    $('#create-task').on('submit', function (e) {
      e.preventDefault();
      var content = $('#new-task-content').val();
      postTask(content, () => {
        indexTasks(function (response) {
          var htmlString = response.tasks.map(function(task) {
            return "<div class='col-12 mb-3 p-2 border rounded task clearfix' data-id='" + task.id + "'> \
            <input type='checkbox' class='mark-complete mr-2'><span style=''>" + task.content + "\
            </span><button class='delete rounded float-right " + task.completed + "' data-id='" + task.id + "'>Remove</button></div>";
          });
    
          $("#tasks").html(htmlString);
        });
      });
      $('#new-task-content').val('');
    });

    // injectTask = () => {
    //   if ($('.static_pages.index').length > 0) {
    //     indexTasks(function (response) {
    //       var htmlString = response.tasks.map(function(task) {
    //         return "<div class='col-12 mb-3 p-2 border rounded task clearfix' data-id='" + task.id + "'> \
    //         <input type='checkbox' class='mark-complete mr-2'>" + task.content + "\
    //         <button class='delete rounded float-right " + task.completed + "' data-id='" + task.id + "'>Remove</button></div>";
    //       });
    
    //       $("#tasks").html(htmlString);
    //     });
    //   };
    // };

});

// var injectTask = function () {

//     indexTasks(function (response) {
//       var htmlString = response.tasks.map(function(task) {
//         return "<div class='col-12 mb-3 p-2 border rounded task clearfix' data-id='" + task.id + "'> \
//         <input type='checkbox' class='mark-complete mr-2'>" + task.content + "\
//         <button class='delete rounded float-right " + task.completed + "' data-id='" + task.id + "'>Remove</button></div>";
//       });
//     });
//   };


$(document).on('click', '.delete', function(e) {
  e.preventDefault();
  var divDataId = $(this).closest('div').attr('data-id');
  deleteTask(divDataId, () => {
    indexTasks(function (response) {
      var htmlString = response.tasks.map(function(task) {
        return "<div class='col-12 mb-3 p-2 border rounded task clearfix' data-id='" + task.id + "'> \
        <input type='checkbox' class='mark-complete mr-2'><span style=''>" + task.content + "\
        </span><button class='delete rounded float-right " + task.completed + "' data-id='" + task.id + "'>Remove</button></div>";
      });

      $("#tasks").html(htmlString);
    });
  });
});

$(document).on('click', '.mark-complete', function () {
  var checkComplete = $(this).next().attr('style').length;
  var selection = $(this).next()
  console.log(checkComplete)

  if (checkComplete == 0) {
    selection.attr('style', 'text-decoration: line-through')
  } else {
    selection.attr('style', '')
  };

});
