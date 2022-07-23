function parseJson() {
    try {
        var json = JSON.parse($("#json").val());
        $("#status").removeClass("alert-danger");
        $("#status").addClass("alert-success");
        $("#status").html("JSON successfully parsed!");
        $("#status").fadeIn();
    }
    catch (e) {
        $("#status").removeClass("alert-success");
        $("#status").addClass("alert-danger");
        $("#status").html("JSON cannot be parsed. Check your syntax.");
        $("#status").fadeIn();
    }
}

function convertJson() {
    var json = "";
    try {
        json = JSON.parse($("#json").val());
    }
    catch (e) {
        alert("JSON cannot be parsed. Check your syntax.");
        return;
    }
}