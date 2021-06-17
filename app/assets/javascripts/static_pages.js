$(document).on("turbolinks:load", function () {
  if ($('.static_pages.index').length > 0) {
    indexTasks(function (response) {
      injectTask(response)
    });
  };

    $('#create-task').on('submit', function (e) {
      e.preventDefault();
      var content = $('#new-task-content').val();
      postTask(content, function () {
        indexTasks(function (response) {
          injectTask(response)
        });
      });

      $('#new-task-content').val('');
    });

});

var injectTask = (response) => {
  var htmlString = response.tasks.map(function (task) {

    return "<div class='col-12 mb-3 p-2 border rounded task clearfix "+ task.completed +"' data-id='" + task.id + "'> \
        <input type='checkbox' class='mark-complete mr-2'" + (task.completed ? 'checked' : '') + "><span style='" + (task.completed ? 'text-decoration: line-through' : '') + "'>" + task.content + "\
        </span><button class='delete rounded float-right " + task.completed + "' data-id='" + task.id + "'>Remove</button></div>";
  });
  $("#tasks").html(htmlString);
};

$(document).on('click', '.delete', function(e) {
  e.preventDefault();
  var divDataId = $(this).closest('div').attr('data-id');
  deleteTask(divDataId, () => {
    indexTasks(function (response) {
      injectTask(response)
    });
  });
});

$(document).on('click', '.mark-complete', function (e) {

  e.preventDefault()
  var selectSpan = $(this).next()
  var checkComplete = $(this).closest('div').attr('class')
  var divSelect = $(this).closest('div')
  var divDataId = $(this).closest('div').attr('data-id')
  var queryConstructor = "[data-id='" + String(divDataId) + "']";

  if (checkComplete.includes('false')) {
    selectSpan.attr('style', 'text-decoration: line-through')
    divSelect.removeClass('false')
    divSelect.addClass('true')
    document.querySelector(queryConstructor).querySelector('input').outerHTML = "<input type='checkbox' class='mark-complete mr-2' checked></input>"

    markInactive(divDataId)


  } else {
    selectSpan.attr('style', '')
    divSelect.removeClass('true')
    divSelect.addClass('false')
    document.querySelector(queryConstructor).querySelector('input').outerHTML = "<input type='checkbox' class='mark-complete mr-2' ></input>"

    markActive(divDataId)

  };

});

$(document).on('click','.visibility-button', function (e) {
  e.preventDefault();
  var buttonId = $(this).attr('id');
  var allTasks = $('#tasks').children();

  switch (buttonId) {
    case 'all-tasks':
      allTasks.each(function(){
        $(this).removeClass('d-none')
      })
      $(this).addClass('btn-primary')
      $('#active-only').removeClass('btn-primary')
      $('#completed-only').removeClass('btn-primary')
      break;

    case 'active-only':

      allTasks.each(function(){
        if($(this).attr('class').includes('true')) {
          $(this).addClass('d-none');
        } else {
          $(this).removeClass('d-none');
        }
      })
      $(this).addClass('btn-primary')
      $('#all-tasks').removeClass('btn-primary')
      $('#completed-only').removeClass('btn-primary')
      break;

    case 'completed-only':

      allTasks.each(function(){
        
        if($(this).attr('class').includes('false')) {
          $(this).addClass('d-none');
        } else {
          $(this).removeClass('d-none');
        }
      })
      $(this).addClass('btn-primary')
      $('#all-tasks').removeClass('btn-primary')
      $('#active-only').removeClass('btn-primary')
  }

})
