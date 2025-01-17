const productDiv = document.getElementById("product-container");
const searchDiv=document.getElementById("search-display-container");
const form = document.getElementById("searchform");
const search = document.getElementById("search");
const searchMessage=document.getElementById("search-message")
let productArray=[];

form.addEventListener('submit', function show(event) {
    event.preventDefault();
    showProducts(productArray);
})


async function getAllProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        if (!response.ok) {
            throw new Error("Something went wrong!");
        }
        productArray = await response.json();
        console.log(productArray);
        displayProducts(productArray);
    } catch (Error) {
        console.log(Error);
    }
}
getAllProducts();

function showProducts(productArray) {
    const searchValue = search.value.trim();
    const searchValueLowerCase = searchValue.toLowerCase();
    console.log(searchValueLowerCase);

    let searchArray = productArray.filter((product) => {
        return product.title.toLowerCase().includes(searchValueLowerCase)
    });

    console.log(searchArray);
    displaySearch(searchArray);
    if(searchArray.length==0){
        searchMessage.innerHTML=`<h2>No results found</h2>`;
        console.log("0")
    }
    else{
        searchMessage.innerHTML=`<h2>${searchArray.length}results found for your search: ${searchValueLowerCase}</h2>`
        console.log(searchArray.length)

    }
}



function displaySearch(searchArray) {
    searchDiv.innerHTML='';
    productDiv.innerHTML='';

    searchArray.forEach(product => {

        let searchCard = `<div class="card-search col-sm-6 col-md-4 col-lg-3 d-flex">
                    <div class="card" >
                        <img src=${product.image} class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text text-muted">${product.description.slice(0, 100)}...</p>
                                 <h5 class="card-title">Price: ${product.price}</h5>
                                 <a href="#" class="btn btn-warning">View Product</a>
                                <a href="#" class="btn btn-success">Add to Cart</a>
                            </div>
                    </div>
                    
        </div>`
        searchDiv.innerHTML += searchCard;
    });
}

function displayProducts(productArray) {
    productDiv.innerHTML='';

    productArray.forEach(product => {

        let productCard = `<div class="card-box col-sm-6 col-md-4 col-lg-3 d-flex">
                    <div class="card" >
                        <img src=${product.image} class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text text-muted">${product.description.slice(0, 100)}...</p>
                                 <h5 class="card-title">Price: ${product.price}</h5>
                                 <a href="#" class="btn btn-warning">View Product</a>
                                <a href="#" class="btn btn-success">Add to Cart</a>
                            </div>
                    </div>
                    
        </div>`
        productDiv.innerHTML += productCard;
    });
}
