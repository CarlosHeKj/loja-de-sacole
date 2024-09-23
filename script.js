const cartBtn = document.querySelector("#cart-btn");
const cartModal = document.querySelector("#cart-modal");
const menu = document.querySelector("#menu")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const closeModalBtnP = document.getElementById("close-modal-btnp")
const checkoutBtn = document.querySelector("#checkout-btn")
const closeModalBtn = document.querySelector("#close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")
const entrega = document.getElementById("entrega")
const elementsModal = document.getElementById("elements-modal")
const elements = document.querySelectorAll("#elements")
const res = document.getElementById("res")
let count = 0;
let cart = [];

cartBtn.addEventListener('click',()=>{
    updateCartModal();
    cartModal.style.display = "flex";
});
cartModal.addEventListener('click', (event)=>{
    if(event.target === cartModal || event.target === closeModalBtn){
        cartModal.style.display = "none";
    }
})
elements.forEach((item)=>{
    item.addEventListener('click',()=>{
        elementsModal.style.display = "flex";
        console.log(10)
    })

})

elementsModal.addEventListener('click',(event)=>{
    if(event.target === elementsModal || event.target === closeModalBtnP){
        elementsModal.style.display = "none";
    }
})

function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 1;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex","justify-between","mb-4","flex-col")
        cartItemElement.innerHTML = `<div class="flex items-center justify-between">
        <div class="flex flex-row gap-5">
        <img class="w-28 h-28 rounded-md " src="${item.src}" />
        <div class="flex flex-col justify-between">
        <p class="font-medium">${item.nome}</p>
        <p>Qtd: ${item.quantidade}</p>
        <p class="font-medium mt-2">R$ ${item.preço.toFixed(2)}</p>
        </div>
        </div>

        <button class="remove-from-cart-btn" data-name="${item.name}">Remover</button>
        </div>`
        total += item.preço * item.quantidade;
        cartItemsContainer.appendChild(cartItemElement);

    })
    cartTotal.textContent = total.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    });
    cartCounter.innerHTML = cart.length;

}
entrega.addEventListener("input",()=>{
    const filho = document.createElement("div");
    if(entrega.value === "entrega"){
        filho.innerHTML = ` <p class="font-bold mt-4">Endereço de entrega:</p>
            <input type="text" placeholder="Digite seu endereço completo..." id="address" class="w-full border-2 p-1 rounded my-1"/>
            
            <p class="text-red-500 hidden" id="address-warn">Digite seu endereço completo!</p>`
            res.innerHTML = " "
            res.appendChild(filho)
    }else if(entrega.value === "retirada"){
        res.innerHTML = " "
        filho.innerHTML = `<p>Endereço: Rua Sheila Biondino 195</p>
        <iframe  class="w-[100%] h-[100px]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.187965569739!2d-43.506518623906956!3d-22.758404632586434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x995de4832d4dd1%3A0x30598a9dd8bd237b!2sR.%20Sheila%20Biondino%2C%20195%20-%20Jardim%20Nova%20Era%2C%20Nova%20Igua%C3%A7u%20-%20RJ%2C%2026272-420!5e0!3m2!1spt-BR!2sbr!4v1727119303661!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        `
        res.appendChild(filho)
            console.log(10)
    }
})
   
function counter(event){
    if(event.target === mais){
        count++;
    }else if(event.target === menos){
        count--;
    }
    contagem.innerHTML = count;
}

