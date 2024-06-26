function nearest_parrent_data_subscription_key(element){
    console.log(element)
    let element_at = element;
    while (!(element_at.hasAttribute('subscription-key'))){
        element_at = element_at.parentElement
    }
    return element_at.getAttribute('subscription-key')
}


function get_nearest_data_subscription(element){
    let element_at = element;
    while (!(element_at.hasAttribute('subscription-key'))){
        element_at = element_at.parentElement
    }
    return subscriptions[element_at.getAttribute('subscription-key')]

}





function add_to_cart({foodName, price}){
    if (!(foodName in cart)){
        cart[foodName] = {foodName, price, quantity: 1}
        document.getElementById("cart").appendChild(subscribe_component_to_data(cart_template, cart[foodName]))
}
    
    else{
        update_data_and_subscribers(cart[foodName], "quantity", cart[foodName].quantity+1)
    }
    console.table(cart)
}


console.log("about to do get_family_subscribtion")

const cart = [];

get_family_subscribtion(document.getElementById("cart"), cart, cart_template)
console.log(menu.length)