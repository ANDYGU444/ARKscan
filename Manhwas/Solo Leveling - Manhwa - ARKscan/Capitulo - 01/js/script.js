const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click" , () =>{
    sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Dark Mode";
    }else{
        modeText.innerText = "Light Mode";
        
    }
});

function filterCatalog() {
    const searchValue = document.getElementById('search-input').value.toLowerCase();
    const results = [
        { title: 'Comic 1', description: 'Descripción del comic 1.' },
        { title: 'Comic 2', description: 'Descripción del comic 2.' },
        { title: 'Comic 3', description: 'Descripción del comic 3.' },
        // Agregar más resultados de ejemplo aquí
    ];

    const filteredResults = results.filter(result => result.title.toLowerCase().includes(searchValue));
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    filteredResults.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `<strong>${result.title}</strong><p>${result.description}</p>`;
        resultsContainer.appendChild(resultItem);
    });

    if (filteredResults.length > 0) {
        resultsContainer.style.display = 'block';
    } else {
        resultsContainer.style.display = 'none';
    }
}

function searchComics() {
    const searchValue = document.getElementById('search-input').value;
    if (searchValue) {
        alert(`Buscando cómics con el nombre: ${searchValue}`);
    }
}

function toggleSearchBar() {
    const searchInput = document.getElementById('search-input');
    if (searchInput.classList.contains('expanded')) {
        searchInput.classList.remove('expanded');
        document.getElementById('search-results').style.display = 'none';
    } else {
        searchInput.classList.add('expanded');
        searchInput.focus();
    }
}

