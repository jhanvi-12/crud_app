// when click on update button find all fields data from user id.
function editUser(id) {
    if (id) {
        tr_id = '#user-'+id;
        id = $(tr_id).find(".id").text();
        firstname = $(tr_id).find(".firstname").text();
        lastname = $(tr_id).find(".lastname").text();
        email = $(tr_id).find(".email").text();
        phone_number = $(tr_id).find(".phone_number").text();

        $('#form-id').val(id);
        $('#form-firstname').val(firstname);
        $('#form-lastname').val(lastname);
        $('#form-email').val(email);
        $('#form-phone').val(phone_number);
        $('#updateModal').modal('show');
        }
}

// when click on save button of updated user data it
 // will take you to update view by calling ajax
function submitUpdate() {
    // serialize form data into array.
    form = $('#updateUser').serializeArray();
    id = parseInt(form.at(0).value)
    csr = $('input[name="csrfmiddlewaretoken"]').val();

    $.ajax ({
        url: '/update/'+id,
        type: 'post',
        data: { 'id': id, 'first_name': form.at(1).value, 'last_name': form.at(2).value,
               'email': form.at(3).value, 'phone_number': form.at(4).value, 'csrfmiddlewaretoken': csr},
        dataType: 'json',
        success: function(data) {
            if (data.user) {
                console.log("user updated!!");
            }
        },
    });
}

// click on cancel button and get user id
function cancelUser(id) {
        tr_id = '#user-'+id;
        id = $(tr_id).find(".id").text();
        $('#form-del-id').val(id);
        $('#deleteModal').modal('show');
}

// click on OK it redirects you to delete view and delete the user
function delBtn() {
      csr = $('input[name="csrfmiddlewaretoken"]').val();
      id = $('input[id="form-del-id"]').val();

    $.ajax({
        url: '/delete/'+id,
        type: 'post',
        data: {'id': id, 'csrfmiddlewaretoken': csr},
        dataType: 'json',
        success: function(data) {
            if (data.deleted) {
                $('#userTable #user-' +id).remove();
                console.log("user deleted!!");
            }
        },
    });
}