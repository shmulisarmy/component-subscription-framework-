

function subscribe_component_to_data(template, props) {
    const template_copy = document.importNode(template.content, true);
    const allvs = template_copy.querySelectorAll("[v]");
    if (!("subscription-key" in props)) {
        props["subscription-key"] = `sk${subscription_keys_used}`
        subscription_keys_used++
    }
    const key = props["subscription-key"]
    allvs.forEach(vItem => {
        const [where, what] = vItem.getAttribute("v").split("-");
        vItem[where] = props[what];
        vItem.setAttribute(`${key}-${what}`, where)
        });

    if ('subscription-key' in props) {
        subscriptions[props['subscription-key']] = props;
        }
    // template_copy.firstElementChild.setAttribute("subscription-key", props['subscription-key']);
    const allbtls = template_copy.querySelectorAll("[btl]");
    
    allbtls.forEach(btl => {
        const [where, what] = btl.getAttribute("btl").split("-")
        const baby_template = document.getElementById(where)
        console.log({baby_template})
        if (what in props){

            props[what].forEach(props => {
                console.log({props})
            btl.appendChild(subscribe_component_to_data(baby_template, props))
        
        })
    }
    });


    return template_copy;
}

function rerender(element, props) {
    const allvs = element.querySelectorAll("[v]");
    allvs.forEach(vItem => {
        const [where, what] = vItem.getAttribute("v").split("-");
        vItem[where] = props[what];
    });
}

function rerender_from_subscription(element) {
    const props = subscriptions[element.getAttribute('subscription-key')];
    if (props) {
        rerender(element, props)
    }
}

function change_values(element, props) {
    console.log('in change_values', {props})
    console.log(element)
    const allvs = element.querySelectorAll("[v]");
    console.log({allvs})
    allvs.forEach(vItem => {
        const [where, what] = vItem.getAttribute("v").split("-");
        console.log({where}, {what})
        if (what in props) {
            vItem[where] = props[what];
        }
    });
}

//the theme is where a bunch of elements can subscribe the a piece of data so that when that data updates so do all the elements attatched too

function update_data_and_subscribers_with_key(subscription_key, key, new_data){
    const data = subscriptions[subscription_key];
    console.log(data)
    const subscribed_elements = document.querySelectorAll(`[${subscription_key}-${key}]`);
    data[key] = new_data;
    const props = {[key]: new_data}
    console.log({props})
    //still in the works as 'props' refelects the name that the change_values function will use to represent it
    subscribed_elements.forEach(element => {
        element[element.getAttribute(`${subscription_key}-${key}`)] = new_data
    })
}

function update_data_and_subscribers(data, key, new_data){
    const subscription_key = data['subscription-key'];
    console.log(data)
    const subscribed_elements = document.querySelectorAll(`[${subscription_key}-${key}]`);
    data[key] = new_data;
    const props = {[key]: new_data}
    console.log({props})
    //still in the works as 'props' refelects the name that the change_values function will use to represent it
    subscribed_elements.forEach(element => {
        element[element.getAttribute(`${subscription_key}-${key}`)] = new_data
    })
}

const subscriptions = {};
let subscription_keys_used = 0

var people = [
    {name: 'John', age: 42,  google: [{list: [{listItem: "laundry"}, {listItem: "perk"}]}, {list: [{listItem: "laundry"}, , {listItem: "perk"}]}]},
    {name: 'jp', age: 13,  google: [{listItem: "laundry"}, {listItem: "perk"}]},
    {name: 'brad', age: 32,  list: [{listItem: "laundry"}, {listItem: "perk"}]},
    {name: 'gt', age: 56,  list: [{listItem: "laundry"}, {listItem: "perk"}]},
];


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



//high level abstraction
function get_family_subscribtion(element_householde_leader, data_householde_leader, template){

    
    data_householde_leader.forEach(data => {
        const pi = subscribe_component_to_data(template, data);
        element_householde_leader.appendChild(pi);
});


}
get_family_subscribtion(main, people, person_template)

