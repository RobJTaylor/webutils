var modal;

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

    $("#java").val(processJson(json));
    if (modal === undefined)
        modal = new bootstrap.Modal(document.getElementById('java-modal'));
    modal.show();
}

function processJson(json) {
    var java = "";
    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            if (typeof json[key] === "object") {
                java += "public class " + key + " {\n";
                java += processJson(json[key]);
                java += "}\n";
            }
            else {
                java += "\tpublic String " + key + ";\n";
            }
        }
    }
    return java;
}

function copy() {
    $("#java").select();
    document.execCommand('copy');
}