function html(strings, ...args){
    const all = []
    strings.forEach((string ,index) => {
        all.push(string)
        all.push(args[index])
    })

    return all.join("")
}


function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  function generate_template_from_list(data_name, data){
    console.log(html`<template id='${data_name}_template'>
        <div blt='${data_name}'>
            ${
                generate_template(data_name, data[0])
            }
        </div>
    </template>`)
    
}
update_data_and_subscribers_with_key


function generate_template(data_name, data){
    const all_templates = []

    all_templates.push(html`<template id="${data_name}_template">
        ${Object.keys(data).map(key => {
        if (isObject(data[key])){
             generate_template(key, data[key])
            return ""
        } else if(Array.isArray(data[key])){
            return generate_template_from_list(key, data[key])
        }
        else 
            return html`<div v='textContent-${key}'></div>${'\n'}`
    })}
     </template>`)
    
    console.log( all_templates.join(""))
    

}

generate_template('food catigories', menu)