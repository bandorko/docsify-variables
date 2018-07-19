
var xmlDoc = null;
var variablesFile;
var nsResolver = null;

function resolveVar(v){
    if (variablesFile && xmlDoc == null){
        xhttp = new XMLHttpRequest();
        xhttp.open("GET", variablesFile, false);
        xhttp.send(null);
        str = xhttp.response.replace(/(<[\s\S]*)xmlns=\"[^"]*\"([^>]*>)/g, "$1$2") //remove default namespace
        xmlDoc = stringToXML(str);
    }
    variable = v
    if (!variable.startsWith("/")){
        variable = "/"+variable.replace(/(\.)/g,"/");
    }
    try{
      ret = xmlDoc.evaluate(variable, xmlDoc, null, XPathResult.ANY_TYPE,null).iterateNext().childNodes[0].nodeValue;
    }catch(e){
      ret = "${"+v+"}"
    }
    return ret
}

function stringToXML(string){
    var xmlDoc=null;
    if (window.DOMParser)
    {
        parser=new DOMParser();
        xmlDoc=parser.parseFromString(string,"text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async="false";
        xmlDoc.loadXML(string);
    }
    return xmlDoc;
}

function install(hook,vm){
    variablesFile = vm.config.variablesFile;

    hook.afterEach(function(html, next) {
        next(html.replace(/\${([^\}]*)}/g, function(a, b){return resolveVar(b)}))
    })
}

if (!window.$docsify) {
    window.$docsify = {}
  }
  
window.$docsify.plugins = (window.$docsify.plugins || []).concat(install)
