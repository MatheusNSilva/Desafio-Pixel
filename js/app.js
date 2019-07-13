const $ = document.querySelector.bind(document);
let listOfAnimes = [];
const $list = $('.container-list');
const $table = $('.container-list tbody');
const $crud = $('.container-crud');
const $btnUIAdd = $('#btn-add-ui');
const $btnAddAnime = $('#btn-add-anime');
const $btnSearchAnime = $('#btn-search');

$btnAddAnime.onclick = function() {
    console.log("Salvar");
    
    const anime = getAnime();
    isEdit(anime.title) ? update(anime) : saveAsNew(anime); 

    clearFields();
}

$btnSearchAnime.onclick = function() {
    const search = document.querySelector('#search'); 
    searchAnime(search.value);
}

function isEdit(title) {
    const anime = listOfAnimes.find( anime => anime.title === title);
    return anime ? true : false;
    
}

function toggleUi() {
    if ($crud.classList.contains(`hide`)) {
        $crud.classList.remove(`hide`)
        $list.classList.add(`hide`)
    } else {
        $list.classList.remove(`hide`)
        $crud.classList.add(`hide`)
    }
}
$btnUIAdd.onclick = toggleUi;

function Anime(title, gender, number, status, description) {
    this.title = title;
    this.gender = gender;
    this.number = number;
    this.status = status;
    this.description = description;
    this.id = new Date().getTime();

    return this;
}

function saveAsNew(anime) {
    listOfAnimes.push(anime);
    createNewRow(anime);
    toggleUi();
}

function getAnime() {
    const title = $(`#title`).value;
    const gender = $(`#gender`).value;
    const number = $(`#number`).value;
    const status = $(`#status`).value;
    const description = $(`#description`).value;
    return new Anime(title, gender, number, status, description);
}

function clearFields() {
    $(`#title`).value = '';
    $(`#gender`).value = '';
    $('#number').value = '';
    $('#status').value = '';
    $('#description').value = '';    
}

function edit(animeId) {
    const anime = listOfAnimes.find( anime => anime.id === animeId );
    $(`#title`).value = anime.title;
    $(`#gender`).value = anime.gender;
    $('#number').value = anime.number;
    $('#status').value = anime.status;
    $('#description').value = anime.description;
    toggleUi();
}

function remove(animeId) {
    listOfAnimes = listOfAnimes.filter( anime => anime.id != animeId );
    document.getElementById(animeId).remove();
}

function update(anime) {
    const oldAnime = listOfAnimes.find( oldAnime => oldAnime.title === anime.title);
    oldAnime.title = anime.title;
    oldAnime.description = anime.description;
    oldAnime.gender = anime.gender;
    oldAnime.number = anime.number;
    oldAnime.status = anime.status;

    document.getElementById(oldAnime.id).remove();
    createNewRow(oldAnime);
    toggleUi();
}

function createNewRow(anime) {
    const html = `
    <tr id=${anime.id}>
        <td class="anime-title">${anime.title}</td>
        <td>${anime.gender}</td>
        <td>${anime.number}</td>
        <td>${anime.description}</td>
        <td>${anime.status}</td>
        <td><button id="btn-edit" onclick="edit(${anime.id})" >Editar</button>
        <button id="btn-remove" onclick="remove(${anime.id})">Remover</button></td>
    </tr>
    `
    $table.lastElementChild.insertAdjacentHTML('afterend', html);
};  

function searchAnime(title) {
    const regex = new RegExp(title, 'i');
    const trs = Array.from(document.querySelectorAll('tbody tr'));
    trs.forEach( tr => {
        if (title) {
            const titleElement = tr.querySelector('td.anime-title');
            const animeTitle = titleElement && titleElement.textContent;
            if ( animeTitle ) {
                regex.test(animeTitle) ? tr.classList.remove('hide') : tr.classList.add('hide') 
            }
        } else {
            tr.classList.remove('hide');
        }
        
    })
}