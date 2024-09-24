const cartBtn = document.querySelector("#cart-btn");
const cartModal = document.querySelector("#cart-modal");
const menu = document.querySelector("#menu")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const closeModalBtnP = document.getElementById("close-modal-btnp")
const checkoutBtn = document.querySelector("#checkout-btn")
const closeModalBtn = document.querySelector("#close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const entrega = document.getElementById("entrega")
const elementsModal = document.getElementById("elements-modal")
const elements = document.querySelectorAll("#elements")
const res = document.getElementById("res")
const srcModal = document.getElementById("src-modal")
const tituloModal = document.getElementById("titulo-modal")
const preçoModal = document.getElementById("preço-modal")
const descModal = document.getElementById("desc-modal")
const preçoModalBtn = document.getElementById("preço-modal-btn")
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
    item.addEventListener('click',(event)=>{
        elementsModal.style.display = "flex";
       
        const parentDiv = event.target.closest(".datas");
  if (parentDiv) {
    const nome = parentDiv.getAttribute('data-name');
    const desc = parentDiv.getAttribute('data-desc')
    const preço = parseFloat(parentDiv.getAttribute('data-price'))
    const src = parentDiv.getAttribute('data-src')
    createModal(nome,preço,src,desc)
  } 
    })

})

elementsModal.addEventListener('click',(event)=>{
    if(event.target === elementsModal || event.target === closeModalBtnP){
        elementsModal.style.display = "none";
    }
})

function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex","justify-between","mb-4","flex-col")
        cartItemElement.innerHTML = `<div class="flex items-center justify-between">
        <div class="flex flex-row gap-5">
        <img class="w-28 h-28 rounded-md " src="${item.src}" />
        <div class="flex flex-col justify-between">
        <p class="font-medium">${item.name}</p>
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

entrega.addEventListener("input", () => {
    const filho = document.createElement("div");

    // Se o usuário selecionar "entrega"
    if (entrega.value === "entrega") {
        filho.innerHTML = `
            <p class="font-bold mt-4">Endereço de entrega:</p>
            <input type="text" placeholder="Digite seu endereço completo..." id="address" class="w-full border-2 p-1 rounded my-1"/>
            <p class="text-red-500 hidden" id="address-warn">Digite seu endereço completo!</p>
        `;

        // Limpa o conteúdo de res e insere o novo campo de endereço
        res.innerHTML = "";
        res.appendChild(filho);

        // Seleciona o input de endereço e o aviso
        const addressInput = document.getElementById("address");
        const addressWarn = document.getElementById("address-warn");

        // Adiciona evento de input para o campo de endereço
        addressInput.addEventListener("input", (event) => {
            let inputEvent = event.target.value.trim(); // Remove espaços extras
            if (inputEvent !== "") {
                addressWarn.classList.add("hidden"); // Esconde o aviso
                addressInput.classList.remove("border-red-500"); // Remove borda vermelha
            } else {
                addressWarn.classList.remove("hidden"); // Mostra o aviso
                addressInput.classList.add("border-red-500"); // Adiciona borda vermelha
            }
        });

        // Verifica se o campo de endereço já está vazio ao carregar
        if (addressInput.value.trim() === "") {
            addressWarn.classList.remove("hidden"); // Mostra o aviso se vazio
            addressInput.classList.add("border-red-500"); // Adiciona borda vermelha
        }

    // Se o usuário selecionar "retirada"
    } else if (entrega.value === "retirada") {
        res.innerHTML = ""; // Limpa o conteúdo anterior
        filho.innerHTML = `
            <p>Endereço: Rua Sheila Biondino 195</p>
            <iframe class="w-[100%] h-[100px]" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.187965569739!2d-43.506518623906956!3d-22.758404632586434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x995de4832d4dd1%3A0x30598a9dd8bd237b!2sR.%20Sheila%20Biondino%2C%20195%20-%20Jardim%20Nova%20Era%2C%20Nova%20Igua%C3%A7u%20-%20RJ%2C%2026272-420!5e0!3m2!1spt-BR!2sbr!4v1727119303661!5m2!1spt-BR!2sbr" 
                width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        `;
        res.appendChild(filho);
        console.log("Retirada selecionada");
    }
});


const contarMais = document.getElementById("contarMais");
const contarMenos = document.getElementById("contarMenos");

const qtdModal = document.getElementById('qtdModal');
let quantidadeAtual = parseInt(qtdModal.textContent); 

// Função para atualizar a quantidade
function atualizarQuantidade(delta) {
    if (!isNaN(quantidadeAtual)) {
        quantidadeAtual += delta; 

        if (quantidadeAtual < 1) { 
            quantidadeAtual = 1; 
        }

        qtdModal.textContent = quantidadeAtual; 
    }
}

contarMais.addEventListener('click', function() {
    atualizarQuantidade(1); 
    atualizarPreco();      
});

contarMenos.addEventListener('click', function() {
    atualizarQuantidade(-1);
    atualizarPreco();       
});

function createModal(name, preço, src, desc) {
    descModal.textContent = desc;          
    tituloModal.textContent = name;       
    preçoModal.textContent = `${preço}`; 
    srcModal.src = src;                   

    quantidadeAtual = 1;                   
    qtdModal.textContent = quantidadeAtual;
    atualizarPreco();                     
}
const adicionar = document.getElementById("adicionar");
adicionar.addEventListener('click',()=>{
    addToCart(tituloModal.textContent,preçoModal.textContent,srcModal.src,qtdModal.textContent);
    updateCartModal();
})

function atualizarPreco() {
    const precoNumerico = parseFloat(preçoModal.textContent.replace('R$', '')); 
    if (!isNaN(precoNumerico)) {
        preçoModalBtn.innerHTML = `R$ ${(precoNumerico * quantidadeAtual).toFixed(2)}`; 
    } else {
        preçoModalBtn.innerHTML = 'Preço inválido'; 
    }
}

function addToCart(name,preço,src,qtd){
    const existingItem = cart.find(item => item.name === name);
    if(!existingItem){
        cart.push({
            name,
            preço: parseFloat(preço),
            quantidade: qtd,
            src
        })
    }else{
        existingItem.quantidade = parseInt(existingItem.quantidade) + parseInt(qtd);
    }
    updateCartModal()
}
cartItemsContainer.addEventListener("click", function(event) {
    if(event.target.classList.contains("remove-from-cart-btn")){
        const nome = event.target.getAttribute('data-name');
        removeItemCart(nome);
    }
})
function removeItemCart(nome){
    const index = cart.findIndex(item => item.name === nome);
    if( index !== -1){
        const item = cart[index];
       
        
        if(item.quantidade > 1){
            console.log(item);
        item.quantidade--
        updateCartModal();
        return;
        }else{
            cart.splice(index,1);
            updateCartModal();
        }}

    
}

