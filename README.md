# docsify-variables
Docsify plugin that load variables form external xml file

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
docsify-variables will replace ${&lt;variable&gt;} references to a value of a tag in the variablesFile xml

to reference a tag in the xml you can use:
- fully qualified path to the tag. eg.: ${var.foo}
- or an XPath expression. eg.: ${/var/foo} or ${//item[2]}

## Example source
- [index.html](example/index.html)
- [README.md](https://raw.githubusercontent.com/bandorko/docsify-variables/master/example/README.md)
- [variables.xml](example/variables.xml)
## Live example
 https://bandorko.github.io/docsify-variables/example/#/
## Related
- [docsify](https://github.com/docsifyjs/docsify)