const h1DOM = document.querySelector('h1');
const formDOM = document.forms[0];
const textInputDOM = formDOM.querySelector('input');
const submitButtonDOM = formDOM.querySelector('button');
const listDOM = document.querySelector('.list');

const toastDOM = document.querySelector('.toast');
const toastTitleDOM = toastDOM.querySelector('.title');
const toastMessageDOM = toastDOM.querySelector('.message');
const toastCloseDOM = toastDOM.querySelector('.close');

toastCloseDOM.addEventListener('click', () => {
    toastDOM.classList.remove('active');
});

const localData = localStorage.getItem('tasks');
let todoData = [];

if (localData !== null) {
    todoData = JSON.parse(localData);
    renderList();
}

submitButtonDOM.addEventListener('click', e => {
    e.preventDefault();

    const validationMSG = isValidText(textInputDOM.value);
    if (validationMSG !== true) {
        showToastError(validationMSG);
        return;
    }

    todoData.push({
        text: textInputDOM.value,
        createdAt: Date.now(),
    });
    localStorage.setItem('tasks', JSON.stringify(todoData));
    renderList();
    showToastSuccess('Successfully created')
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

            const validationMSG = isValidText(updateInputDOM.value)
            if (validationMSG !== true) {
                showToastError(validationMSG)
                return;
            }

            todoData[i].text = updateInputDOM.value;
            renderTaskList();
            showToastSuccess('Message successfully updated');
        });

        const cancelDOM = buttonsDOM[1];
        cancelDOM.addEventListener('click', () => {
            articleEditFormDOM.classList.add('hidden');
            showToastInfo('Message edit canceled');
        });

        const editDOM = buttonsDOM[3];
        editDOM.addEventListener('click', () => {
            articleEditFormDOM.classList.remove('hidden');
        });

        const deleteDOM = buttonsDOM[4];
        deleteDOM.addEventListener('click', () => {
            todoData.splice(i, 1);
            renderList();
            showToastSuccess('Message successfully deleted');
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

function isValidText(text) {
    if (typeof text !== 'string') {
        return 'Text must be string';
    }
    if (text.trim() === '') {
        return 'Text cannot be empty';
    }
    if (text[0] !== text[0].toUpperCase()) {
        return 'Text must start with uppercase';
    }
    return true;
}

function showToast(state, title, msg) {
    toastDOM.classList.add('active');
    toastDOM.dataset.state = state;
    toastTitleDOM.textContent = title;
    toastMessageDOM.textContent = msg;
}

function showToastSuccess(msg) {
    showToast('success', 'Success', msg)
}

function showToastInfo(msg) {
    showToast('info', 'Info', msg)
}

function showToastWarning(msg) {
    showToast('wrning', 'Warning', msg)
}

function showToastError(msg) {
    showToast('error', 'Error', msg)
}

// CRUD operations:
// -----------------------------------
// create   array.push({initial data})
// read     array.map()
// update   array[i] = {updated data}
// delete   array.splice(i, 1)