const loadAiCards = async(dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayAiCards(data.data.tools, dataLimit);
}

const displayAiCards = (aiCards, dataLimit) => {
    // console.log(aiCards);

    // display 6 ai cards only 
    const showAll = document.getElementById('btn-see-more');
    if (dataLimit && aiCards.length > 6) {
        aiCards = aiCards.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    // display ai cards
    const aiContainer = document.getElementById('ai-container');
    aiContainer.textContent = '';
    aiCards.forEach(aiCard => {
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
        aiDiv.innerHTML = `
        <div class="card h-100 p-4">
            <img src="${aiCard.image}" class="card-img-top rounded-3" alt="..." style="height: 50%;">
            <div class="card-body h-25">
                <h5 class="card-title fw-bold">Features</h5>
                <p>${aiCard.features.map(feature => `<li type="1" class="text-dark-emphasis">${feature}</li>`).join('')}</p>
            </div>
            <div class="card-body h-25">
                <hr>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title fw-bold">${aiCard.name}</h5>
                        <p><i class="bi bi-calendar4-week"></i>&nbsp; ${aiCard.published_in}</p>
                    </div>
                    <div>
                        <button onclick="loadAiCardDetails('${aiCard.id}')" href="#" class="border-0 rounded-circle px-2 py-1 bg-danger bg-opacity-10" data-bs-toggle="modal" data-bs-target="#aiCardDetailModal">
                            <i class="bi bi-arrow-right text-danger"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
        aiContainer.appendChild(aiDiv);
    });
    // stop spinner or loader
    toggleSpinner(false);
}

// loader or spinner
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

// See more to show all ai cards
document.getElementById('btn-see-more').addEventListener('click', function(){
    loadAiCards();
});

const loadAiCardDetails = async id => {
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiCardDetails(data.data);
}

const displayAiCardDetails = aiCard => {
    console.log(aiCard);

    // collecting feature names 
    const feature_names = [];
    for (let feature in aiCard.features) {
        feature_names.push(aiCard.features[feature].feature_name);
    }
    console.log(feature_names); 

    const modalTitle = document.getElementById('aiCardDetailModalLabel');
    modalTitle.innerText = aiCard.tool_name;
    const aiCardDetails = document.getElementById('aiCard-details');
    aiCardDetails.innerHTML = `
    <div class="col">
        <div class="card h-100 bg-danger bg-opacity-10 border-danger">
            <div class="card-body">
                <h5 class="card-title fw-bold">${aiCard.description}</h5>
                <div class="row row-cols-1 row-cols-md-3 g-2 mt-2">
                    <div class="col">
                        <div class="card h-100 bg-white border-0 rounded-4">
                            <div class="card-body px-0">
                                <p class="fw-semibold text-success text-center">
                                    <small>
                                        ${aiCard.pricing ? aiCard.pricing[0].price : 'Free of Cost/'} <br> 
                                        ${aiCard.pricing ? aiCard.pricing[0].plan : 'Basic'}
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100 bg-white border-0 rounded-4">
                            <div class="card-body px-0">
                                <p class="fw-semibold text-warning text-center">
                                    <small>
                                        ${aiCard.pricing ? aiCard.pricing[1].price : 'Free of Cost/'} <br> 
                                        ${aiCard.pricing ? aiCard.pricing[1].plan : 'Pro'}
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100 bg-white border-0 rounded-4">
                            <div class="card-body px-0">
                                <p class="fw-semibold text-danger text-center">
                                <small>
                                    ${aiCard.pricing ? aiCard.pricing[2].price : 'Free of Cost/'} <br> 
                                    ${aiCard.pricing ? aiCard.pricing[2].plan : 'Enterprise'}
                                </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                    <div>
                        <h5 class="card-title fw-bold">Features</h5>
                        <p>${feature_names.map(feature => `<li class="text-dark-emphasis"><small>${feature}</small></li>`).join('')}</p>
                    </div>
                    <div>
                        <h5 class="card-title fw-bold">Integrations</h5>
                        <p>${aiCard.integrations ? aiCard.integrations.map(integration => `<li class="text-dark-emphasis">
                        <small>${integration}</small></li>`).join('') : `<small class="text-dark-emphasis">No data Found</small>`}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card h-100">
            <img src="${aiCard.image_link[0]}" class="m-3 rounded-3" alt="...">
            <div class="card-body h-25">
                <h5 class="card-title text-center fw-bold">
                    ${aiCard.input_output_examples ? aiCard.input_output_examples[0].input : 'Can you give any example?'}
                </h5>
                <p class="card-text text-center fw-light">
                    ${aiCard.input_output_examples ? aiCard.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}
                </p>
            </div>
        </div>
    </div>
    `
}

toggleSpinner(true);
loadAiCards(6);