// Fungsi untuk memformat nama Digimon (contoh: agumon -> Agumon)
function formatDigimonName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

// Fungsi untuk clear input dan hasil pencarian
function clearSearch() {
    document.getElementById('digimonName').value = '';
    document.getElementById('digimonInfo').innerHTML = '';
}

// Fungsi untuk validasi input
function validateInput(input) {
    const validCharacters = /^[a-zA-Z]+$/; // Hanya huruf yang diizinkan
    return validCharacters.test(input);
}

// Fungsi untuk menangani kesalahan jaringan
function handleNetworkError(error) {
    const digimonInfo = document.getElementById('digimonInfo');
    digimonInfo.innerHTML = `<p class="error">Network error occurred. Please check your connection and try again.</p>`;
    console.error('Network Error:', error);
}

// Fungsi utama untuk mendapatkan informasi Digimon
function getDigimon() {
    const digimonNameInput = document.getElementById('digimonName').value.trim();
    const digimonInfo = document.getElementById('digimonInfo');
    const loading = document.getElementById('loading');

    if (digimonNameInput === "") {
        alert("Please enter a Digimon name!");
        return;
    }

    if (!validateInput(digimonNameInput)) {
        alert("Please enter a valid Digimon name! (Only letters are allowed)");
        return;
    }

    const digimonName = formatDigimonName(digimonNameInput);
    digimonInfo.innerHTML = '';
    loading.classList.remove('hidden');

    fetch(`https://digimon-api.vercel.app/api/digimon/name/${digimonName.toLowerCase()}`)
        .then(response => response.json())
        .then(data => {
            loading.classList.add('hidden');
            if (data.length > 0) {
                const digimon = data[0];
                digimonInfo.innerHTML = `
                    <img src="${digimon.img}" alt="${digimon.name}" class="digimon-image">
                    <p class="success"><strong>Name:</strong> ${digimon.name}</p>
                    <p><strong>Level:</strong> ${digimon.level}</p>
                `;
            } else {
                digimonInfo.innerHTML = `<p class="error">Digimon not found! Please try again.</p>`;
            }
        })
        .catch(error => {
            loading.classList.add('hidden');
            handleNetworkError(error);
        });
}
