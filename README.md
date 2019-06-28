# docsify-variables
Docsify plugin that load variables form external xml or json file

## Install

1. insert script into docsify document
```
<script src="//unpkg.com/docsify-variables/dist/docsify-variables.min.js"></script>
```

2. add a variablesFile property to docsify config
```
    window.$docsify = {
      variablesFile : 'variables.xml'
    }
```

## Usage
docsify-variables will replace ${&lt;variable&gt;} references to a value in the variablesFile

to reference a value in an xml file you can use:
- fully qualified path to the tag. eg.: ${var.foo}
- or an XPath expression. eg.: ${/var/foo} or ${//item[2]}

to reference a value in a json file you can use:
- fully qualified path to the value. eg.: ${var.foo}
- or an XPath expression. eg.: ${/var/foo} or ${//item[2]}

## XML Example source
- [index.html](examples/xml/index.html)
- [README.md](https://raw.githubusercontent.com/bandorko/docsify-variables/master/examples/xml/README.md)
- [variables.xml](examples/xml/variables.xml)
### Live example
 https://bandorko.github.io/docsify-variables/examples/xml/#/

## JSON Example source
- [index.html](examples/json/index.html)
- [README.md](https://raw.githubusercontent.com/bandorko/docsify-variables/master/examples/json/README.md)
- [variables.xml](examples/json/variables.json)
### Live example
 https://bandorko.github.io/docsify-variables/examples/json/#/

## Related
- [docsify](https://github.com/docsifyjs/docsify)