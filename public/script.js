window.addEventListener('load', async () => {
    let container = document.querySelector('.container')
    let boatsContainer = document.querySelector('.boats-container');
    let productInfo = document.querySelector('.product-container');
    let input = '';
    let message = document.querySelector('.message');
    let inputModel = document.querySelector('#inputModel');
    let inputYear = document.querySelector('#inputYear');
    let inputPrice = document.querySelector('#inputPrice');
    let inputIsSail = document.querySelectorAll('input[name="is_sail"]');
    let inputHasMotor = document.querySelectorAll('input[name="has_motor"]');
    let btnAddBoat = document.querySelector('.btn-addBoat');
    let btnGetBoats = document.querySelector('.btn-getBoats');
    let btnBack = document.querySelector('.btn-back')
    let inputSearch = document.querySelector('#inputSearch')
    let searchCategory = document.querySelector('#categories');
    let btnSearch = document.querySelector('#btn-search');
    let btnReset = document.querySelector('#btn-reset')

    btnGetBoats.addEventListener('click', async () => {
        getBoats();
    })

    btnAddBoat.addEventListener('click', async () => {
        for (var i = 0, length = inputIsSail.length; i < length; i++) {
            if (inputIsSail[i].checked) {
                break;
            }
        }
        for (var j = 0, length = inputHasMotor.length; j < length; j++) {
            if (inputHasMotor[j].checked) {
                break;
            }
        }

        input = {
            model: inputModel.value,
            year: Number(inputYear.value),
            price: Number(inputPrice.value),
            is_sail: inputIsSail[i].value,
            has_motor: inputHasMotor[j].value,
        }
        message.innerHTML = 'Boat added successfully!';

        const response = await fetch('/boat?', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        const text = await response.text();
        getBoats();
    })

    btnBack.addEventListener('click', async () => {
        fromProductToBoats();
    })

    btnSearch.addEventListener('click', async () => {
        let search = '';
        let query = '';

        if (searchCategory.value === 'maxprice'){
            query = 'maxprice';
        }
        else if (searchCategory.value === 'madebefore'){
            query = 'madebefore';
        }
        else if (searchCategory.value === 'madeafter'){
            query = 'madeafter';
        }
        else{
            query = 'word';
        }

        search = inputSearch.value;

        const response = await fetch('/search?' + query + '=' + search, { method: 'GET' });
        const object = await response.json();
        container.innerHTML = '';
        object.forEach(boat => {
            let li = document.createElement('li')
            li.innerHTML = `<span>${boat.model}</span><br>${boat.year}<br>$${boat.price}<br><br>Product information<br>Is sail: ${boat.is_sail}<br>Has motor: ${boat.has_motor}`
            li.setAttribute("class", "productList");
            container.appendChild(li)
        })
    })

    btnReset.addEventListener('click', async () => {
        const response = await fetch('/reset', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const text = await response.json();
        getBoats();
    })

    async function getBoats(){
        const response = await fetch('/boats', { method: 'GET' });
        const object = await response.json();
        container.innerHTML = "";
        object.forEach(boat => {
            let li = document.createElement('li')
            li.innerHTML = `<span>${boat.model}</span><br>${boat.year}<br>$${boat.price}<br><br>Product information<br>Is sail: ${boat.is_sail}<br>Has motor: ${boat.has_motor}`
            li.setAttribute("class", "productList");
            container.appendChild(li)

            li.addEventListener('click', async () => {
                displayProductInfo()

                const response = await fetch('/boat/' + boat._id, { method: 'GET' });
                const object = await response.text();

                let li = document.createElement('li')

                li.innerHTML = `<span>${boat.model}</span><br>${boat.year}<br>$${boat.price}<br><br>Product information<br>Is sail: ${boat.is_sail}<br>Has motor: ${boat.has_motor}<br><br>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus, quibusdam soluta labore consectetur architecto omnis delectus aspernatur atque minima doloremque, molestiae eveniet animi totam quae incidunt iusto adipisci ex.`

                let btnDelete = document.createElement('button')
                btnDelete.setAttribute("class", "deleteButton");
                btnDelete.innerHTML = 'Delete';
                btnDelete.addEventListener('click', async () => {
                    getBoats();
                    fromProductToBoats();

                    const response = await fetch('/boat/' + boat._id, { method: 'DELETE' });
                    const object = await response.json();
                })
                productInfo.appendChild(li);
                productInfo.appendChild(btnDelete)
            })
        })
    }

    function displayProductInfo() {
        if(boatsContainer === 'none'){
            boatsContainer.style.display = "block";
            productInfo.style.display = 'none';
        }
        else{
            boatsContainer.style.display = "none";
            productInfo.style.display = "block";
        }
    }

    function fromProductToBoats() {
        if(productInfo === 'none'){
            productInfo.style.display = 'block';
            boatsContainer.style.display = "none";
        }
        else{
            productInfo.style.display = "none";
            boatsContainer.style.display = "block";
        }
    }

    let data = [{
        model: 'Seabreacher Sailfish Inspired',
        year: 2014,
        price: 13340,
        is_sail: 'No',
        has_motor: 'Yes'
    },
    {
        model: 'DeepFlight Dragon',
        year: 2014,
        price: 1648800,
        is_sail: 'No',
        has_motor: 'Yes'
    },
    {
        model: 'DeepFlight Super Falcon 3S',
        year: 2012,
        price: 54000,
        is_sail: 'No',
        has_motor: 'Yes'
    },
    {
        model: 'EGO-Compact Semi-Submarine',
        year: 1894,
        price: 75000,
        is_sail: 'No',
        has_motor: 'Yes'
    },
    {
        model: 'Triton 1000/7: The Cruise-Liner Sub',
        year: 1678,
        price: 134550,
        is_sail: 'No',
        has_motor: 'Yes'
    },
    {
        model: 'Triton 3300/1: The Solo Sub',
        year: 2002,
        price: 888000,
        is_sail: 'No',
        has_motor: 'Yes'
    },
    {
        model: 'Triton 1650/3: The Super-Yacht Sub',
        year: 2003,
        price: 1452800,
        is_sail: 'No',
        has_motor: 'Yes'
    },
    {
        model: 'Orion 260/1: Super-Monkey Sub',
        year: 2004,
        price: 12228999,
        is_sail: 'No',
        has_motor: 'Yes'
    },
    {
        model: 'Pluto Sub',
        year: 1941,
        price: 200000,
        is_sail: 'No',
        has_motor: 'Yes'
    },
    {
        model: 'Mercurio Sub',
        year: 1412,
        price: 298760,
        is_sail: 'No',
        has_motor: 'Yes'
    }];
});