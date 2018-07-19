# Example
## content of the variables.xml file
```xml
<var>
    <foo>fooValue</foo>
    <bar>barValue</bar>
    <list>
        <item>first item</item>
        <item>second item</item>
        <item>third item</item>
    </list>
</var>
```
## you can use fully specified path to the variable
This will be changed to the value of the **&lt;foo&gt;** tag in the **&lt;var&gt;** tag : {$var.foo}
## you can use XPath
This will be changed to the value of the **&lt;foo&gt;** tag in the **&lt;var&gt;** tag : {$/var/foo}

This will be the value of the second **&lt;item&gt;** tag of the list: {$//item[2]}
