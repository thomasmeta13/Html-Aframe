$(document).ready( function () {
    let todo_array=[]
    let todo_list=localStorage.getItem('todo');
  
    if (todo_list){
      todo_array=JSON.parse(todo_list);
    }
  
  
    function saveTodo(str){
      todo_array.push({text:str, status:true});
      localStorage.setItem('todo',JSON.stringify(todo_array));
    }
  
    function load(){
      var checked = JSON.parse(localStorage.getItem('checkbox1zaal1'));
      document.getElementById("checkbox1zaal1").checked = checked;
    }
  
  
    for (var i = 0; i < todo_array.length; i++){
      let checked=todo_array[i].status === 'strike' ? 'checked':'';
      let strike = todo_array[i].status === 'strike' ? 'strike' : '';
      $("ul").append('<li class="'+strike+'">' +
        '          <div class="form-check">' +
        '            <input class="form-check-input" '+checked+' name="check" type="checkbox">'
                      +todo_array[i].text+
        '          </div>' +
        '          <div class="remove" >' +
        '            <i class="bi bi-x-octagon-fill"></i>' +
        '          </div>' +
        '        </li>');
    }
  
  
    $('#submit').click(function (){
      var task=$("#exampleFormControlTextarea1").val().trim();
      $("ul").append('<li>' +
            '          <div class="form-check">' +
            '            <input class="form-check-input" type="checkbox" name="check" >' +task+
            '          </div>' +
            '          <div class="remove" >' +
            '            <i class="bi bi-x-octagon-fill"></i>' +
            '          </div>' +
            '        </li>');
  
      $('#exampleFormControlTextarea1').val('');
      saveTodo(task)
    });
  
    $(document).on('click',"input[name=check]", function(e){
      const target=e.target
      $(target).parents('li').toggleClass('strike');
      let items = $('ul').children();
      todo_array = []
      for (var i=0; i<items.length; i++){
        todo_array.push({ text: items[i].innerText, status: items[i].className});
      }
      console.log(todo_array)
      localStorage.setItem('todo',JSON.stringify(todo_array));
  
    });
  
  
    $('ul').sortable();
    $('ul').on('sortupdate',function(){
      let child = $('ul').children();
      todo_array = []
      for (var i=0; i<child.length; i++){
        todo_array.push({ text: child[i].innerText, status: child[i].className});
  
      }
      localStorage.setItem('todo',JSON.stringify(todo_array));
    });
  
    $('.form-control').keypress(function (e) {
      if (e.which === 13) {
        $('#submit').click();
      }
    });
  
    $(document).on('click', '.remove', function(e){
      const target=e.target;
      const lili = $(target).parents('li')
      lili.fadeOut('slow');
      const filtered = todo_array.filter(obj=>obj.text!==lili[0].innerText)
      todo_array = []
      console.log(filtered)
      for (var i=0; i<filtered.length; i++){
        todo_array.push({ text: filtered[i].text, status: filtered[i].status});
      }
      localStorage.setItem('todo',JSON.stringify(todo_array));
    });
  
  
  });
  
  
  function filter(){
    $("li").filter(".strike").toggleClass('show')
  }
  
  function UFilter(){
    $("li").not(".strike").toggleClass('show')
  }
  