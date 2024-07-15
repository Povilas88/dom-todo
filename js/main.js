// rikiavimas?.. 😏
// localStorage

const h1DOM = document.querySelector('h1');
const formDOM = document.forms[0];
const textInputDOM = formDOM.querySelector('input');
const submitButtonDOM = formDOM.querySelector('button');
const listDOM = document.querySelector('.list');

const todoData = [];

submitButtonDOM.addEventListener('click', e => {
    e.preventDefault();

    if (textInputDOM.value.length === 0) {
        return;
    }

    todoData.push({
        text: textInputDOM.value,
        createdAt: Date.now(),
    });
    renderList();
});

function renderList() {
    if (todoData.length === 0) {
        renderEmptyList();
    } else {
        renderTaskList();
    }
}

function renderEmptyList() {
    listDOM.classList.add('empty');
    listDOM.textContent = 'Empty';
}

function renderTaskList() {
    let HTML = '';

    for (const todo of todoData) {
        HTML += `
            <article class="item">
                <div class="date">${formatTime(todo.createdAt)}</div>
                <div class="text">${todo.text}</div>
                <form class="hidden">
                    <input type="text">
                    <button type="submit">Update</button>
                    <button type="button">Cancel</button>
                </form>
                <div class="actions">
                    <button>Done</button>
                    <div class="divider"></div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </article>`;
    }

    listDOM.innerHTML = HTML;
    listDOM.classList.remove('empty');

    const articlesDOM = listDOM.querySelectorAll('article');

    for (let i = 0; i < articlesDOM.length; i++) {
        const articleDOM = articlesDOM[i];
        const articleEditFormDOM = articleDOM.querySelector('form');
        const updateInputDOM = articleEditFormDOM.querySelector('input');
        const buttonsDOM = articleDOM.querySelectorAll('button');

        const updateDOM = buttonsDOM[0];
        updateDOM.addEventListener('click', event => {
            event.preventDefault();
            todoData[i] = updateInputDOM.value;
            renderTaskList();
        });

        const cancelDOM = buttonsDOM[1];
        cancelDOM.addEventListener('click', () => {
            articleEditFormDOM.classList.add('hidden');
        });

        const editDOM = buttonsDOM[3];
        editDOM.addEventListener('click', () => {
            articleEditFormDOM.classList.remove('hidden');
        });

        const deleteDOM = buttonsDOM[4];
        deleteDOM.addEventListener('click', () => {
            todoData.splice(i, 1);
            renderList();
        });
    }
}

let date = new Date();
let year = date.getFullYear();
let month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);//grazina index +1
let day = (date.getDate() < 10 ? '0' : '') + date.getDate();;
let hour = date.getHours();
let minute = date.getMinutes();
let second = date.getSeconds();

const d = new Date('2000-01-01 1:2:3')// date konstravimas 0100<YYYY
const months = ['Sausis', 'Vasaris']
const weekDays = ['Sekmadienis', 'Pirmadienis', 'Antradienis']

console.log(d.getMonth(), months[d.getMonth()]);

// 01 - 6
// 02 - 0 - sekmadienis
// 03 - 1 - pirmadienis
// 04 - 2
// 05 - 3
// 06 - 4
// 07 - 5

date = date.toString().split(' ');

function formatTime(timeInMs) {
    // mdn: js Date -> getYear, getMonth, getDay, getHour...

    // return `YYYY-MM-DD HH:MM:SS`;
    // return `${date[3]}-MM-${date[2]} ${date[4]}`;
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`

}

// CRUD operations:
// -----------------------------------
// create   array.push({initial data})
// read     array.map()
// update   array[i] = {updated data}
// delete   array.splice(i, 1)