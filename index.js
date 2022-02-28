// getId 
const getId = (id) => document.getElementById(id);



// get serach value and get phone
const search = async () => {

    const search = getId('search').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const response = await fetch(url);
    const date = await response.json();

    loadDate(date.data);
}

// loadDate and decorate mobile phone 
const loadDate = (data) => {
    const mobileDeco = getId('mobile-view');
    mobileDeco.textContent = '';

    if(data.length <= 10){
        data = data;
    }
    else{
        data = data.slice(0,10)
    }
    data.forEach(getPhone => {
        // console.log(getPhone)
        mobileDeco.innerHTML += `    
        <div class="col">
            <div class="card h-100">
                <div class='h-100'>
                
                    <div class='imageDiv'>

                        <img src="${getPhone.image}" class="card-img-top img-fluid p-2 imageProduct" alt="...">
                    </div>
                    <div class="card-body">
                    <h2 class="card-title">${getPhone.phone_name}</h2>
                
                    <h5 class="card-title">Brand: ${getPhone.brand}</h5>
                    </div>
                </div>
                <button onclick="getDetails('${getPhone.slug}')" class="btn bg-warning h2 text-light w-auto">Details</button>
            </div>
        </div>
        
        `
    });

}





// get details and show details /
const getDetails = async (id)=> {
    
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const responseDetails = await fetch(url);
    const data = await responseDetails.json();
    const detailsID = getId('details');
    detailsID.style.display = 'block'
    const getData = data.data;
    // get realese date 
    let release = getData.releaseDate;
    if(release == '' || !release){
        release = 'Not found'
    }

    
    detailsID.innerHTML = `
    <button class="btn" id="close" onclick="getId('details').style.display='none'">
        <i class="fa fa-close" style="font-size:48px;color:red"></i>
    </button>
    <h3><b> Phone details:</b></h3>
    <div>
        <div class="d-flex flex-column align-items-center justify-content-center">
            <img src="${getData.image}" alt="" class="h-50 w-50">
        </div>
        <h2><b>${getData.name}</b></h2>
        <table class="table table-hover">
            <tr>
                <td >Brand</td>
                <td>${getData.brand}</td>
            </tr>
            <tr>
                <td>First Release</td>
                <td>${release}</td>
            </tr>

            <!-- for display  -->
            <tr>
                <td >Display</td>
                <td>${getData.mainFeatures.displaySize}</td>
            </tr>
            
            <tr>
                <td>Chipset</td>
                <td>${getData.mainFeatures.chipSet}</td>
            </tr>

            <tr>
                <td>Memory</td>
                <td>${getData.mainFeatures.memory}</td>
            </tr>

            <tr>
                <td>Sensors</td>
                <td>${getData.mainFeatures.sensors}</td>
            </tr>
    </div>
    `
    console.log(getData)
}

getId('submit-search').onclick = search;