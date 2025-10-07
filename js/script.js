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


function filterCatalog() {
    const category = document.getElementById('category').value;
    const genre = document.getElementById('genre').value;
    const year = document.getElementById('year').value;
    const letter = document.getElementById('letter').value;

    const comics = document.querySelectorAll('.comic');

    comics.forEach(comic => {
        const comicCategory = comic.getAttribute('data-category');
        const comicGenre = comic.getAttribute('data-genre');
        const comicYear = comic.getAttribute('data-year');
        const comicLetter = comic.getAttribute('data-letter');

        if ((category === comicCategory || category === 'all') &&
            (genre === comicGenre || genre === 'all') &&
            (year === comicYear || year === 'all') &&
            (letter === comicLetter || letter === 'all')) {
            comic.style.display = 'block';
        } else {
            comic.style.display = 'none';
        }
    });
}


/////////////////Buscador en Menu////////// "Cuidar diagonales de archivo"////////////////////////
    const comics = [
        {
            name: "Solo Leveling",
            category: "manga",
            genre: "accion",
            year: "2023",
            letter: "s",
            img: "Manhwas/Solo Leveling - Manhwa - ARKscan/solo_leveling.png",
            description: "",
            link: "Manhwas/Solo Leveling - Manhwa - ARKscan/ver.html"
        },
        {
            name: "Solo Leveling",
            category: "manga",
            genre: "accion",
            year: "2023",
            letter: "s",
            img: "Manhwas/Solo Leveling - Manhwa - ARKscan/solo_leveling.png",
            description: "",
            link: "Manhwas/Solo Leveling - Manhwa - ARKscan/ver.html"
        },
        //
        // Añade más cómics aquí
        //
        //
    ];

    function searchComics() {
        const searchBar = document.getElementById('search-bar');
        const searchResults = document.getElementById('search-results');
        const query = searchBar.value.toLowerCase();

        // Filtra los cómics según el nombre
        const filteredComics = comics.filter(comic => comic.name.toLowerCase().includes(query));

        // Limpia los resultados anteriores
        searchResults.innerHTML = '';

        if (filteredComics.length > 0 && query !== '') {
            searchResults.style.display = 'block';
            filteredComics.forEach(comic => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';

                resultItem.innerHTML = `
                    <img src="${comic.img}" alt="${comic.name}">
                    <div>
                        <h2>${comic.name}</h2>
                        <p>${comic.description}</p>
                        <a href="${comic.link}">Empezar a Leer</a>
                    </div>
                `;
                searchResults.appendChild(resultItem);
            });
        } else {
            searchResults.style.display = 'none';
        }
    }

    // Cierra el menú desplegable si se hace clic fuera de él
    document.addEventListener('click', function(event) {
        const searchResults = document.getElementById('search-results');
        const searchBar = document.getElementById('search-bar');

        if (!searchResults.contains(event.target) && !searchBar.contains(event.target)) {
            searchResults.style.display = 'none';
        }
    });
/////////////////Buscador en Menu//////////////////////////////////

