// add user
$("form#addUser").submit(function(){
    console.log("Hello")
    var firstname = $('input[name="first_name"]').val()
    var lastname = $('input[name="last_name"]').val()
    var email = $('input[name="email"]').val()
    var address = $('input[name="address"]').val()
    csr = $('input[name="csrfmiddlewaretoken"]').val()
    if(firstnameInput && lastnameInput && emailInput && addressInput){
        mydata = {"first_name" : firstname, "last_name" : lastname, "email" : email, "address" :address ,"csrfmiddlewaretoken" : csr}
        console.log(mydata)
        // create ajax call
        $.ajax({
            url : '',
            data : mydata,
            dataType : 'json',
            success : function(data){
                if(data.user){
                    appendToUserTable(data.user);
                }
            }

        });
    }
    else{
        alert("All fields must have a valid values.");
    }
    $('form#addUser').trigger("reset");
    return false;
});

function appendToUserTable(user){
    $("#userTable > tbody:last-child").append(`
            <tr id="user-${user.id}">
            <td class="userFirstName" name="first_name">${user.first_name}</td>
            <td class="userLastName" name="last_name">${user.last_name}</td>
            <td class="userEmail" name="email">${user.email}</td>
            <td class="userAddress" name="address">${user.address}</td>
            <td align="center">
                <button class="btn btn-success form-control btn-sm" onClick="editUser(${user.id})" data-toggle="modal" data-target="#myModal">UPDATE</button>
            </td>
            <td align="center">
                <button class="btn btn-danger form-control btn-sm" onClick="deleteUser(${user.id})">DELETE</button>
            </td>
        </tr>
    `);
}
// update user function
$("form#updateUser").submit(function(e){
    var id = $('input[name="formId"]').val();
    var firstname = $('input[name="formFirstName"]').val();
    var lastname = $('input[name="formLastName"]').val();
    var email = $('input[name="formEmail"]').val();
    var address = $('input[name="formAddress"]').val();
    csr = $('input[name="csrfmiddlewaretoken"]').val();

    if(firstname && lastname && email && address){
//    e.preventDefault();
        $.ajax({
            url : 'update/',  // for updating view we write url like this by taking id
            type : 'post',
            data : {'id':id, "first_name" : firstname, "last_name" : lastname, 'email' :email, 'address' : address ,"csrfmiddlewaretoken" : csr},
            dataType : 'json',
            success : function(data){
                if(data.user){
                updateToUserTable(data.user);
                }
            },
        });
       } else {
        alert("All fields must have a valid value.");
    }
    $('form#updateUser').trigger("reset");
    $('#myModal').modal('hide');
    console.log('ooooooooo')
    return false;
});

function editUser(id) {
  if (id) {
    tr_id ='#user-'+id;
    id = $(tr_id).find(".id").text();
    firstname = $(tr_id).find(".first_name").text();
    lastname = $(tr_id).find(".last_name").text();
    email = $(tr_id).find(".email").text();
    address = $(tr_id).find(".address").text();
    $('#form-id').val(id);
    $('#form-firstname').val(firstname);
    $('#form-lastname').val(lastname);
    $('#form-email').val(email);
    $('#form-address').val(address);

  }
}

// this function will check the fields
function updateToUserTable(user){
console.log('--',user)
        $("#userTable #user-" + user.id).children(".userData").each(function() {
        var attr = $(this).attr("name");
        if (attr == "first_name") {
          $(this).text(user.first_name);  // this all fields are coming from views data
          } else if (attr == "id") {
          $(this).text(user.id);
        } else if (attr == "last_name") {
          $(this).text(user.last_name);
        } else if (attr == "email") {
          $(this).text(user.email);
        } else {
          $(this).text(user.address);
        }
      });
}

// display modal of delete operation and perform delete operation.
$("form#deleteUser").submit(function(e){
      e.preventDefault();
      var $inputs = $('#deleteUser :input');
      var values = {};
      $inputs.each(function () {
        values[this.name] = $(this).val();
      });
      var csr = values.csrfmiddlewaretoken;
      var id = $('input[id="form-del-id"]').val();

    if(id){
          $.ajax({
            url : 'delete/',
            type : 'post',
            data : {'id':id, "csrfmiddlewaretoken": csr },
            dataType : 'json',
            success : function(data){
                if(data.deleted){
                console.log(id);
                $("#userTable #user-" + id).remove();  // for delete entire row data
                }
            },
        });
        console.log("deleted")
     $('form#deleteUser').trigger("reset");
     $('#exampleModal').modal('hide');
    }
});
//on click of delete button
function cancelUser(id){
if (id) {
   console.log(id)
    $('#form-del-id').val(id);
    }
};

// Datatable
$(document).ready(function() {
    $('#userTable').DataTable();
});

