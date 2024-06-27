function nearest_parrent_data_subscription_key(element) {
    console.log(element)
    let element_at = element;
    while (!(element_at.hasAttribute('subscription-key'))) {
        element_at = element_at.parentElement
    }
    return element_at.getAttribute('subscription-key')
}


function get_nearest_data_subscription(element) {
    let element_at = element;
    while (!(element_at.hasAttribute('subscription-key'))) {
        element_at = element_at.parentElement
    }
    return subscriptions[element_at.getAttribute('subscription-key')]

}





function add_to_cart({ foodName, price, image_url }) {
    let item_found = false;
    cart.forEach(item => {
        if (item.foodName == foodName) {
            update_data_and_subscribers(item, "quantity", item.quantity + 1)
            item_found = true
            return
        }
    })
    if (!item_found) {
        cart.push({ foodName, price, image_url, quantity: 1 })
        const new_item_index = cart.length - 1
        document.getElementById("cart").appendChild(subscribe_component_to_data(cart_template, cart[new_item_index]))
    }
    console.table(cart)
}



console.log("about to do get_family_subscribtion")

const cart = [];

get_family_subscribtion(document.getElementById("cart"), cart, cart_template)
console.log(menu.length)


function checkout() {
    console.log({ cart })
    const cartJson = JSON.stringify({ items: cart })

    console.log(cartJson)

    // Serialize the cart object to JSON

    fetch("/checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Set the correct content type
        },
        body: cartJson
    })
        .then(response => response.json())
        .then(data => {
            console.log("checkout data:", data);
            alert(`Your order has been placed! Your total is $${data.total}`);
        })
        .catch(error => console.error('Error:', error));
}
