const loadPhone = async (searchText=13, isShowAll) =>{
    const res = await fetch(` https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) =>{
    // console.log(phones);
    const phoneContainer = document.getElementById('phones-container');
    // clear phone contaier cards before new cards adding
    phoneContainer.textContent = ' '

    // dsplay show all button if there are more then 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // console.log('is show all', isShowAll);
    // display only first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phone =>{
        // console.log(phone);
        // 1: create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 border shadow-xl`;

        // 2: set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title opacity-85">${phone.phone_name}</h2>
            <p class="opacity-70">If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')"  class="btn btn-primary">SHOW DETAILS</button>
            </div>
        </div>
        `;
        // 3: append child
        phoneContainer.appendChild(phoneCard);
    })
    // hide lodding spinner
    toggelLoddingSpinner(false);
};

//
const handleShowDetail = async (id) =>{
    // console.log(id);
    // load singel phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data
    showPhoneDtail(phone);
}

const showPhoneDtail = (phone) =>{
    // display the modal
    console.log(phone);
    showDitailsModal.showModal();
    const phoneName = document.getElementById('show-ditail-phone-image');
    phoneName.innerHTML = `
    <img src="${phone.image}" alt="">
    `;
    const showDitailContainer = document.getElementById('show-ditail-container');
    showDitailContainer.innerHTML = `
    <div class="mt-5 flex flex-col gap-3">
    <h1 class="font-bold text-3xl">${phone?.name}</h1>
    <p><span class="font-medium text-xl">Storage : </span>${phone?.mainFeatures?.storage}</p>
    <p><span class="font-medium text-xl">Display Size : </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-medium text-xl>ChipSet : </span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class="font-medium text-xl">Memory : </span>${phone?.mainFeatures?.memory}</p>
    <p><span class="font-medium text-xl">Release Date : </span>${phone?.releaseDate || 'No Release Date'}</p>
    <p><span class="font-medium text-xl">Brand : </span>${phone?.brand}</p>
    <p><span class="font-medium text-xl">GPS : </span>${phone?.others?.GPS || 'No GPS'}</p>
    </div>

    `
}

// handel search btn
const handelSearch = (isShowAll) =>{
    toggelLoddingSpinner(true);
    const searchFiled = document.getElementById('search-filed')
    const searchText = searchFiled.value;
    // searchFiled.value = ''
    loadPhone(searchText, isShowAll);
}

// const handleSearch2 = () =>{
//     toggelLoddingSpinner(true);
//     const searchFiled2 = document.getElementById('search-filed2');
//     const searchText2 = searchFiled2.value;
//     loadPhone(searchText2);
// }

const toggelLoddingSpinner = (isLodding) =>{
    const loddingSpinner = document.getElementById('lodding-spinner');
    if(isLodding){
        loddingSpinner.classList.remove('hidden')
    }
    else{
        loddingSpinner.classList.add('hidden');
    }
}

// handel show all
const handelShowAll = () =>{
    handelSearch(true);
}

loadPhone();