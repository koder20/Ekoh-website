if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else{
    ready()
}

function ready(){
    var removeCartButton = document.getElementsByClassName('btn-danger')
    console.log(removeCartButton)
    for(var i = 0; i < removeCartButton.length; i++){
        var button = removeCartButton[i];
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(var i = 0; i < removeCartButton.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change',quantityChanged)
    }

    var addToCartButton = document.getElementsByClassName('shop-item-button')
    for(var i = 0; i < addToCartButton.length; i++){
        var button = addToCartButton[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked(){
    alert("Thank you for your purchase!")
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <=0){ // NaN (not a number)
        input.value = 1
    } 
    updateCartTotal()
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var name = shopItem.getElementsByClassName('shop-item-name')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var image = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(name, price, image)
    addItemToCart(name,price,image)
    updateCartTotal()
}
 
function addItemToCart(name, price, image){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName("cart-item-name")
    for(var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == name){
            alert("This item has already been added to your cart.")
            return
        }
    }  
    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${image}" width="100" height="100">
        <span class="cart-item-name">${name}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0] // [0] represents the first item
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0;
    for(var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$','')) // parseFloat = changes string into a float
        var quantity = quantityElement.value;
        total = total + ( price * quantity)
    }
    total = Math.round(total * 100) / 100 //rounds to the nearest 2 decimal places.
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}