$(document).ready(function() {
    $("#addNew").on('click', function() {
        $("#tableManager").modal('show');
    });
    getExistingData(0, 50);
});

function edit(rowID) {
    $.ajax({
        url: 'ajax.php',
        method: 'POST',
        dataType: 'json',
        data: {
            key: 'getRowData',
            rowID: rowID
        }, success: function (response) {
            $('#editRowID').val(rowID);
            $('#countryName').val(response.countryName);
            $('#shortDesc').val(response.shortDesc);
            $('#longDesc').val(response.longDesc);
            $('#tableManager').modal('show');
            $('#manageBtn').attr('value', 'Save Changes').attr('onclick', "manageData('updateRow')");
            
        }
    });
}

function getExistingData(start, limit) {
    $.ajax({
        url: 'ajax.php',
        method: 'POST',
        dataType: 'text',
        data: {
            key: 'getExistingData',
            start: start,
            limit: limit
        }, success: function (response) {
            if (response != "reachedMax") {
                $('tbody').append(response);
                start += limit;
                getExistingData(start, limit);
            } else {
                $(".table").DataTable();
            }
        }
    });
}

function manageData(key) {
    var name = $("#countryName");
    var shortDesc = $("#shortDesc");
    var longDesc = $("#longDesc");
    var editRowID = $("#editRowID");

    if (isNotEmpty(name) && isNotEmpty(shortDesc) && isNotEmpty(longDesc)) {
        $.ajax({
            url: 'ajax.php',
            method: 'POST',
            dataType: 'text',
            data: {
                key: key,
                name: name.val(),
                shortDesc: shortDesc.val(),
                longDesc: longDesc.val()
            }, success: function (response) {
                alert(response);
            }
        });
    }
}

function isNotEmpty(caller) {
    if (caller.val() == '') {
        caller.css('border', '1px solid red');
        return false;
    } else {
        caller.css('border', '');
        return true;
    }
}