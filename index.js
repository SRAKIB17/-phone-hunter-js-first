// getId 
const getId = (id) => document.getElementById(id);


// for waiting

const wait = (display) =>(getId('waiting').style.display = display)

// get serach value and get phone
const search = async () => {
    wait('flex')

    // display details none 
    getId('details').style.display='none'
    const search = getId('search');
    getId('show').innerText = `
    showing result for '${search.value}'`
    const url = `https://openapi.programming-hero.com/api/phones?search=${search.value}`;
    const response = await fetch(url);
    const date = await response.json();
    // clear search form 
    search.value = '';
    // showing not found 
    if(date.data.length===0){
        getId('notFound').style.display = 'block';
    }
    else{
        getId('notFound').style.display = 'none';

    }

    loadDate(date.data);
}
// loadMoreDate
let loadMdata = [];

// loadDate and decorate mobile phone 
const loadDate = (data) => {
    // get data and storage 
    const getMoreData = data;
    const mobileDeco = getId('mobile-view');
    mobileDeco.textContent = '';

    if(data.length <= 20){
        data = data;
    }
    else{
        data = data.slice(0,20)
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
                <button onclick="getDetails('${getPhone.slug}')" class="btn bg-warning fs-4 text-light w-auto">Details</button>
            </div>
        </div>
        
        `
    });
    console.log(getMoreData);
    // load more data
    if(getMoreData.length >= 20){
        loadMdata = getMoreData.slice(20);
        // console.log(data);
        getId('loadMoreData').style.display = 'block'
    }
    else {
        getId('loadMoreData').style.display = 'none';
    }
    
    wait('none')
}

// const loadMoreDate = (date)=> {
//     console.log(date)
// }



// get details and show details /
const getDetails = async (id)=> {
    
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const responseDetails = await fetch(url);
    const data = await responseDetails.json();
    const detailsID = getId('details');
    // showing details decoration display block
    detailsID.style.display = 'block';

    const getData = data.data;
    // get realese date 
    let release = getData.releaseDate;

    
    const others = getData.others;
    if(release == '' || !release){
        release = 'Not found'
    }

    
    detailsID.innerHTML = `
    <button class="btn" id="close" onclick="getId('details').style.display='none'">
        <i class="fa fa-close" style="font-size:48px;color:red"></i>
    </button>
    <h3><b> Phone details:</b></h3>
        <div class="d-flex flex-column align-items-center justify-content-center">
            <img src="${getData.image}" alt="" class="h-50 w-50">
        </div>
        <h2><b>${getData.name}</b></h2>
        <table class="table table-hover">
            <tbody id='addMore'>
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
            </tbody>
        </table>
    `

    if(getData. hasOwnProperty('others')){
        getId('addMore').innerHTML += `
        <tr>
            <td colspan="2"><b>Others</b></td>

        </tr>
        <tr>
            <td>Bluetooth</td>
            <td>${others.Bluetooth}</td>
        </tr>

        <tr>
            <td>GPS</td>
            <td>${others.GPS}</td>
        </tr>
        <tr>
            <td>NFC</td>
            <td>${others.NFC}</td>
        </tr>
        <tr>
            <td>Radio</td>
            <td>${others.Radio}</td>
        </tr>
        <tr>
            <td>USB</td>
            <td>${others.USB}</td>
        </tr>
        <tr>
            <td>WLAN</td>
            <td>${others.WLAN}</td>
        </tr>
        `
    }
}

getId('submit-search').onclick = search;