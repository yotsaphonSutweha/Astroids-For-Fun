const fs = require('fs');

let mergeValues = (values, content) => {
    for(let key in values) {
        content = content.replace(`{{${key}}}`, values[key]);
    }
    return content;
}

let view = (templateName, values, res) => {
    let fileContents = fs.readFileSync(`./designs/${templateName}.html`, {encoding: 'utf8'});
    fileContents = mergeValues(values, fileContents);
    res.write(fileContents);
}