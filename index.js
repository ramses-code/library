document.addEventListener('DOMContentLoaded', function() {
    const openModalButton = document.querySelector('#newBook')
    const modal = document.querySelector('#modal')
    const modalForm = document.querySelector('.modal-form')

    openModalButton.addEventListener('click', openModal)

    document.addEventListener('click', (event) => {
        if (!modalForm.contains(event.target)) {
            modal.style.display = 'none'
        }
    })

    modalForm.addEventListener('submit', addNewBook)
})

const library = []

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

function openModal(e) {
    modal.style.display = 'block'

    document.querySelector('#title').value = ''
    document.querySelector('#author').value = ''
    document.querySelector('#pages').value = ''
    document.querySelector('#is-read').checked = false

    e.stopPropagation()
}

function addNewBook(e) {
    e.preventDefault()

    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const pages = document.querySelector('#pages').value
    const isRead = document.querySelector('#is-read').checked

    const newBook = new Book(title, author, pages, isRead)
    library.push(newBook)
    modal.style.display = 'none'
    populateTable()
}

function populateTable() {
    const tbody = document.querySelector('tbody')
    tbody.textContent = ''
    
    library.forEach((elem, index) => {
        const tr = document.createElement('tr')
        const title = document.createElement('td')
        const author = document.createElement('td')
        const pages = document.createElement('td')
        const isRead = document.createElement('td')
        const changeReadStatus = document.createElement('button')
        const deleteTd = document.createElement('td')
        const deleteBtn = document.createElement('button')
        
        title.innerHTML = elem.title
        author.innerHTML = elem.author
        pages.innerHTML = elem.pages
        changeReadStatus.innerHTML = elem.isRead ? 'Read' : 'No read'
        deleteBtn.innerHTML = 'Delete'
        changeReadStatus.className = 'book-btns'
        deleteBtn.className = 'book-btns'
        deleteTd.appendChild(deleteBtn)
        isRead.appendChild(changeReadStatus)

        changeReadStatus.addEventListener('click', () => {
            elem.isRead ? elem.isRead = false : elem.isRead = true
            populateTable()
        })

        deleteBtn.addEventListener('click', () => {
            library.splice(index, 1)
            populateTable()
        })
        
        tr.appendChild(title)
        tr.appendChild(author)
        tr.appendChild(pages)
        tr.appendChild(isRead)
        tr.appendChild(deleteTd)

        tbody.appendChild(tr)
    })
}

