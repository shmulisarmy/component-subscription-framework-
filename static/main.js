

function subscribe_component_to_data(template, props) {
    const template_copy = document.importNode(template.content, true);
    props["subscription-key"] = `sk${subscription_keys_used}`
    subscriptions[props['subscription-key']] = props;
    subscription_keys_used++;
    const key = props["subscription-key"]
    template_copy.children[0].setAttribute('subscription-key', key)
    const allvs = template_copy.querySelectorAll("[v]");
    allvs.forEach(vItem => {
        const [what, where] = vItem.getAttribute("v").split("-");
        vItem[where] = props[what];
        vItem.setAttribute(`${key}-${what}`, `value-${where}`)
        });
    const allds = template_copy.querySelectorAll("[d]");
    allds.forEach(dItem => {
        const [what, where] = dItem.getAttribute("d").split("-");
        dItem[where] = `${what}: ${props[what]}`;
        dItem.setAttribute(`${key}-${what}`, `display-${where}`)
        });

    const allcs = template_copy.querySelectorAll("[c]");
    allcs.forEach(cItem => {
        const [computation_function_name, what, where] = cItem.getAttribute("c").split("-");
        cItem[where] = computations[computation_function_name](what);
        cItem.setAttribute(`${key}-${what}`, `computed@${computation_function_name}-${where}`)
        });

    Object.keys(props).forEach(prop => {
        template_copy.querySelectorAll(`[computed-${props["subscription-key"]}-${prop}]`).forEach(element => {
            const attr = element.getAttribute(`computed-${props["subscription-key"]}-${prop}`).split('-');
            const [what, where] = attr
            console.log('attr broken into', what, 'and', where)
            element[where] = computations[what](props[prop]);
        });
    })

    // template_copy.firstElementChild.setAttribute("subscription-key", props['subscription-key']);
    const allblts = template_copy.querySelectorAll("[blt]");
    console.log(allblts)
    
    allblts.forEach(blt => {
        const what_and_where = blt.getAttribute("blt")
        const baby_template = document.getElementById(`${what_and_where}_template`)
        console.log("blt", {baby_template})
        if (what_and_where in props){

            props[what_and_where].forEach(baby_props => {
                console.log({baby_props})
            blt.appendChild(subscribe_component_to_data(baby_template, baby_props))
        
        })
    }
    });


    return template_copy;
}




function rerender_nearest_subscribed_element(element) {
    let current_element = element;
    while (!current_element.has_atribute("subscription-key")){
        current_element = current_element.parrendElement;
    }
    const props = subscriptions[current_element.attribute("subscription-key")]
    const subscription_key = props['subscription-key']
    Object.keys(props).forEach(prop => {
        const elements = current_element.querySelectorAll(`[${subscription_key}-${prop}]:not([blt])`);
        // todo: break down atribute and apply to right kind of rendering for it

    })
}


function delete_data_and_all_subscribers(subscription_key){
    delete subscriptions[[subscription_key]]
    document.querySelectorAll(`[subscription-key=${subscribe_component_to_data}]`).forEach(element => {
        element.remove()
    })
}

function delete_component_and_all_subscriptions(element){
    const subscription_key = element.attributes["subscription-key"]
    element.remove()
    delete subscriptions[[subscription_key]]
}

function delete_component_and_subscription_if_no_subscribers(element){
    const subscription_key = element.attributes["subscription-key"]
    element.remove()
    if (!document.querySelectory(`[subscription-key=${subscribe_component_to_data}]`)){
        delete subscriptions[[subscription_key]]
    }
}



function change_values(element, ...props) {
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

let menu = [
    {
        category: 'plate', 
        options: [
            {foodName: 'crispy chicken', price: 14, image_url: "static/images/1.jpg"},
            {foodName: 'grilled salmon', price: 18, image_url: "static/images/2.jpg"},
            {foodName: 'beef steak', price: 22, image_url: "static/images/3.jpg"}
        ]
    },
    {
        category: 'appetizer', 
        options: [
            {foodName: 'chicken nuggets', price: 10, image_url: "static/images/4.jpg"} ,
            {foodName: 'mozzarella sticks', price: 8, image_url: "static/images/5.jpg"},
            {foodName: 'stuffed mushrooms', price: 12, image_url: "static/images/6.jpg"}
        ]
    },
    {
        category: 'sandwich',
        options: [
            {foodName: 'turkey club', price: 12, image_url: "static/images/7.jpg"},
            {foodName: 'ham and cheese', price: 10, image_url: "static/images/8.jpg"},
            {foodName: 'veggie delight', price: 9, image_url: "static/images/9.jpg"}
        ]
    },

    {
        category: 'dessert',
        options: [
            {foodName: 'chocolate cake', price: 7, },
            {foodName: 'cheesecake', price: 8},
            {foodName: 'ice cream sundae', price: 6}
        ]
    },
    {
        category: 'beverage',
        options: [
            {foodName: 'coffee', price: 3, image_url: "image.jpg"},
            {foodName: 'iced tea', price: 4},
            {foodName: 'lemonade', price: 4}
        ]
    },
];


console.log(menu.length)








const computations = {
    'pad': (string) => {
        return `pad${string}pad`

    }
}


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


//high level abstraction
function get_family_subscribtion(element_householde_leader, data_householde_leader, template){    
    data_householde_leader.forEach(data => {
        element_householde_leader.appendChild(subscribe_component_to_data(template, data));
        }
    )
}
get_family_subscribtion(main, menu, document.getElementById("catagory_template"))





