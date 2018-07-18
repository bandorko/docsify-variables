
var xmlDoc = null;
var variablesFile;

function resolveVar(v){
    if (variablesFile && xmlDoc == null){
        xhttp = new XMLHttpRequest();
        xhttp.overrideMimeType('text/xml');
        xhttp.open("GET", variablesFile, false);
        xhttp.send(null);
        xmlDoc = xhttp.responseXML || "error";
    }
    variable = v
    if (!variable.startsWith("/")){
        variable = "/"+variable.replace(/(\.)/g,"/");
    }
    try{
      ret = xmlDoc.evaluate(variable, xmlDoc, null, XPathResult.ANY_TYPE,null).iterateNext().childNodes[0].nodeValue;
    }catch(e){
      ret = "{$"+v+"}"
    }
    return ret
}

function install(hook,vm){
    variablesFile = vm.config.variablesFile;

    hook.afterEach(function(html, next) {
        next(html.replace(/{\$(.*)}/g, function(a, b){return resolveVar(b)}))
    })
}

if (!window.$docsify) {
    window.$docsify = {}
  }
  
window.$docsify.plugins = (window.$docsify.plugins || []).concat(install)
