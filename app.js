$(document).ready(function() {
    $("#addNew").on('click', function() {
        $("#tableManager").modal('show');
    });
    getExistingData(0, 10);
});
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
            }
        }
    });
}
function manageData(key) {
    var name = $("#countryName");
    var shortDesc = $("#shortDesc");
    var longDesc = $("#longDesc");

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