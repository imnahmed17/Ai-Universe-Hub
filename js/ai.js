const loadAiCards = async(dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayAiCards(data.data.tools, dataLimit);
}

const displayAiCards = (aiCards, dataLimit) => {
    // console.log(aiCards);
    // display all ai cards
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
                        <button onclick="loadAiCardDetails('${aiCard.id}')" href="#" class="border-0 rounded-circle px-2 py-1 bg-danger bg-opacity-10" data-bs-toggle="modal" data-bs-target="#aiCardDetailModal"><i class="bi bi-arrow-right text-danger"></i></button>
                    </div>
                </div>
            </div>
        </div>
        `;
        aiContainer.appendChild(aiDiv);
    });
}

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

loadAiCards();