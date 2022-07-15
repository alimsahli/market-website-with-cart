let label=document.getElementById('label');
let shoppingcart=document.getElementById('shopping-cart');

let basket=JSON.parse(localStorage.getItem("data"))||[];

let calculation=()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML= basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
};
calculation();
let generatecaritems=()=>{
    if(basket.length !==0){
        return shoppingcart.innerHTML=basket.map((x)=>{
           
            let{id,item}=x;
            let search=shopItemsData.find((y)=>y.id===id)||[]
            let{imd,name,price}=search;
            return `
            <div class="cart-item">
            <img width="100" src=${imd} alt="" />
            <div class="details">
            <div class="title-price-x"> 
            <h4 class="title-price">
            <p>${name}</p>
            <p class="car-item-price"><i class="bi bi-tags-fill"></i>
            ${price}</p>
            </h4>
            <i onclick="removeItem(${id})"class="bi bi-x-lg"></i>

             </div>
                <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            <h3>TOTAL $ ${item*price}</h3>
           
            </div>
            </div>
            `;
        }).join('');
    }
    else{
        shoppingcart.innerHTML=``
        label.innerHTML=`
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="HomeBtn">Back to home</button>
         </a>
         `;

    }
};
generatecaritems();

let increment=(id)=>{
    let selectedItem = id;
    let search=basket.find((x)=>x.id===selectedItem.id);
    if(search===undefined){
    basket.push({
        id:selectedItem.id,
        item:1,
    });
    }
    else{
        search.item +=1;
    }
    localStorage.setItem("data",JSON.stringify(basket));
    generatecaritems();
    update(selectedItem.id);
};
let decrement=(id)=>{
    let selectedItem = id;
    let search=basket.find((x)=>x.id===selectedItem.id);
    if(search=== undefined)return;
    else if(search.item===0) return;
    else{
        search.item -=1;
    }
    update(selectedItem.id);
    basket= basket.filter((x)=>x.item !== 0);
    generatecaritems();

    localStorage.setItem("data",JSON.stringify(basket));
};
let update=(id)=>{
    let search=basket.find((x)=>x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item
    calculation();
    totalAmount();
};
let removeItem=(id)=>{
let selectedItem=id;
//console.log(selectedItem.id);
basket=basket.filter((x)=>x.id !==selectedItem.id);
generatecaritems();
totalAmount();
calculation();
localStorage.setItem("data",JSON.stringify(basket));
};
let clearCart =()=>{
    basket=[];
    generatecaritems();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));

};
let totalAmount =()=>{
    if(basket.length !==0){
        let amount = basket.map((x)=>{
            let {item,id}=x;
            let search=shopItemsData.find((y)=>y.id===id)||[]
            return item * search.price;
        }).reduce((x,y)=>x+y,0);
        //console.log(amount);
        label.innerHTML=`
        <h2>TOTAL BILL : $ ${amount}</h2>
        <button class="checkout">checkout</button>
        <button onclick="clearCart()" class="removeAll">clear cart</button>
        `;
    }
    else return;
};
totalAmount();