var modal;
var objects = [];

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
            if(Array.isArray(json[key])) {
                var array = json[key];
                var type = mapType(array);
                java += "\tprivate List<" + mapType(array) + "> " + sanitizeKey(key) + ";\n";
            }
            else if (typeof json[key] === "object") {
                java += "public class " + sanitizeKey(key) + " {\n";
                java += processJson(json[key]);
                java += "}\n";
            }
            else if (typeof json[key] === "string") {
                java += "\tprivate String " + sanitizeKey(key) + ";\n";
            }
            else if (typeof json[key] === "number") {
                java += "\tprivate int " + sanitizeKey(key) + ";\n";
            }
            else if (typeof json[key] === "boolean") {
                java += "\tprivate bool " + sanitizeKey(key) + ";\n";
            }
        }
    }
    return java;
}

function mapType(array) {
    if (typeof array[0] === "string") {
        return "String";
    } else if (typeof array[0] === "number") {
        return "int";
    } else if (typeof array[0] === "boolean") {
        return "bool";
    } else {
        return typeof array[0];
    }
}

function sanitizeKey(key) {
  key = key.replace(/-([a-z])/g, (g) => {
    return g[1].toUpperCase();
  });
  return key.replace(/_([a-z])/g, (g) => {
    return g[1].toUpperCase();
  });
}

function copy() {
    $("#java").select();
    document.execCommand('copy');
}