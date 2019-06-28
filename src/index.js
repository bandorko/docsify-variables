var variablesObj = null;
var variablesFile;
var nsResolver = null;
var variablesFileType;


function resolveVar(v){
    if (variablesFile && variablesObj == null){
        initVariablesObj();
    }
    if (variablesFileType == "xml"){
        return resolveXMLVar(v);
    }else if (variablesFileType == "json"){
        return resolveJSONVar(v);
    }
    return "${"+v+"}"
}

function resolveJSONVar(v){
    variable = v;
    if (!variable.startsWith("$")){
        variable = "$."+variable;
    }
    try{
        var jp = require('jsonpath-plus').JSONPath;
        ret = jp({path: variable, json: variablesObj});
    }catch(e){
        ret = "${"+v+"}"
    }
    return ret;
}

function resolveXMLVar(v){
    variable = v;
    if (!variable.startsWith("/")){
        variable = "/"+variable.replace(/(\.)/g,"/");
    }
    try{
      ret = variablesObj.evaluate(variable, variablesObj, null, XPathResult.ANY_TYPE,null).iterateNext().childNodes[0].nodeValue;
    }catch(e){
      ret = "${"+v+"}"
    }
    return ret
}

function initVariablesObj(){
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", variablesFile, false);
    xhttp.send(null);
    str = xhttp.response;
    variablesObj = stringToObj(str,variablesFileType);
}

function stringToObj(str, type){
    var variablesObj=null;
    if (type == "xml"){
        str = str.replace(/(<[\s\S]*)xmlns=\"[^"]*\"([^>]*>)/g, "$1$2") //remove default namespace
        if (window.DOMParser)
        {
            parser=new DOMParser();
            variablesObj=parser.parseFromString(str,"text/xml");
        }
        else // Internet Explorer
        {
            variablesObj=new ActiveXObject("Microsoft.XMLDOM");
            variablesObj.async="false";
            variablesObj.loadXML(str);
        }
    }else if (type == "json"){
        variablesObj = JSON.parse(str);
    }   
    return variablesObj;
}

function install(hook,vm){
    variablesFile = vm.config.variablesFile;
    variablesFileType = vm.config.variablesFileType;
    if (!variablesFileType) variablesFileType=variablesFile.split('.').pop();
    if (!variablesFileType) variablesFileType = "xml";
    variablesFileType = variablesFileType.toLowerCase();

    hook.afterEach(function(html, next) {
        next(html.replace(/\${([^\}]*)}/g, function(a, b){return resolveVar(b)}))
    })
}

if (!window.$docsify) {
    window.$docsify = {}
  }
  
window.$docsify.plugins = (window.$docsify.plugins || []).concat(install)
