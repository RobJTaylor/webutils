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
            if(Array.isArray(json[key])) {
                var array = json[key];
                var name = sanitizeKey(key);
                if (typeof array[0] === "object") {
                    java += "\tList<" + name.charAt(0).toUpperCase() + name.slice(1) + "> " + name + ";\n";
                    java += "\tclass " + name.charAt(0).toUpperCase() + name.slice(1) + " {\n";
                    java += processJson(array[0]);
                    java += "\t}\n";
                    return java;
                }
                java += "\tList<" + mapType(array) + "> " + name + ";\n";
            }
            else if (json[key] !== null && typeof json[key] === "object") {
                var name = sanitizeKey(key);
                java += "class " + name.charAt(0).toUpperCase() + name.slice(1) + " {\n";
                java += processJson(json[key]);
                java += "}\n";
            }
            else if (typeof json[key] === "string") {
                java += "\tString " + sanitizeKey(key) + ";\n";
            }
            else if (typeof json[key] === "number") {
                java += "\tint " + sanitizeKey(key) + ";\n";
            }
            else if (typeof json[key] === "boolean") {
                java += "\tboolean " + sanitizeKey(key) + ";\n";
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
    } else if (typeof array[0] === "object" || typeof array[0] === "undefined") {
        return "Object";
    } else {
        return typeof array[0];
    }
}

function sanitizeKey(key) {
  return key.replace(/-([a-z])/g, (g) => {
    return g[1].toUpperCase();
  });
}

function copy() {
    $("#java").select();
    document.execCommand('copy');
}