function destroyPopup(popup) {
    popup.remove();
}

function ask({title, cancel = false}) {
    return new Promise(resolve => {

        const popup = document.createElement('form');
        popup.classList.add('popup');
        popup.classList.add('open');

        popup.insertAdjacentHTML(  // дбавили html
            'afterbegin',
            `<fieldset>
                <label>${title}</label>
                <input type="file"/>
                <button type="submit">UPLOAD</button>
            </fieldset>`
        );

        if (cancel) {
            const cancelButton = document.createElement('button');
            cancelButton.type = 'button';
            cancelButton.textContent = 'CANCEL';
            popup.appendChild(cancelButton);

            cancelButton.addEventListener('click', () => {
                resolve(null);
                destroyPopup(popup);
            })
        }

        popup.addEventListener('submit', e => {
            e.preventDefault();
            const inputValue = e.target.file;
            resolve(inputValue);

            destroyPopup(popup);
        }, { once: true });

        document.body.appendChild(popup);
    })
}

const questions = [
    {
        title: 'First File',
        cancel: true
    },
    {
        title: 'Second File',
        cancel: true
    },
    {
        title: 'Third File',
        cancel: true
    }
];

async function askMany() {
    for (const question of questions) {
        const answer = await ask(question);
        console.log(answer)
    }
}

askMany();