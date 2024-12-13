const myLibrary = [];
const openButton = document.querySelector("[data-open-modal]"); //Grabs dialog open button from document
const modal = document.querySelector("[data-modal]")            //Grabs dialog from document
const shelf = document.querySelector(".shelf");                 //Grabs the shelf div on which books will be displayed

//Note that here the querySelector is for "modal", because the submit button is inside there
//It's selected by searching it's attribute value and filtering the "cancel" button the same way
const submitButton = modal.querySelector('button[type="submit"]:not([formmethod="dialog"])');
const form = modal.querySelector("form");                       //Grabs the form from the modal

openButton.addEventListener("click", () => {                    //On click, opens modal dialog
    modal.showModal();
});

modal.addEventListener("click", e => {                          //On click, closes modal dialog if click is outside dialog
    const dialogDimensions = modal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        modal.close();
    }
});

submitButton.addEventListener("click", (event) => {             //On submit:
    // Prevents default submit to server
    event.preventDefault();

    // Takes form values
    const title = form.querySelector('#book-title').value.trim();       //Trim gets rid of spaces before and after
    const author = form.querySelector('#book-author').value.trim();
    const pages = form.querySelector('#book-pages').value.trim();
    const readStatus = form.querySelector('input[name="readStatus"]:checked').id; // Takes checked radio's ID for later switch case

    // Converts radio input into string
    let status = '';
    switch (readStatus) {
        case 'read':
            status = "Read";
            break;
        case 'not-read':
            status = "Not read";
            break;
        case 'reading':
            status = "Reading";
            break;
    }

    
    // Calls addBook function
    addBookToLibrary(title, author, pages, status);

    //Closes the dialog (modal) and resets form
    modal.close();
    form.reset();

});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return title + ", " + author + ", " + pages + ", " + read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    addBooksToShelf();
}


function addBooksToShelf() {

    shelf.innerHTML = "";       //Clears the shelf

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card")
        bookCard.dataset.index = index;

        const bookTitle = document.createElement("h2");
        bookTitle.textContent = book.title;
        bookCard.appendChild(bookTitle);

        const bookDelete = document.createElement("button");
        bookDelete.dataset.index = index;
        bookDelete.textContent = "Remove";
        bookDelete.addEventListener("click", () => {
            myLibrary.splice(index, 1);
            addBooksToShelf();
        });
        bookCard.appendChild(bookDelete);

        const bookAuthor = document.createElement("h3");
        bookAuthor.textContent = book.author;
        bookCard.appendChild(bookAuthor);

        const bookPages = document.createElement("p");
        bookPages.textContent = book.pages;
        bookCard.appendChild(bookPages);

        const bookRead = document.createElement("p");
        bookRead.dataset.index = index;
        bookRead.textContent = book.read;
        bookCard.appendChild(bookRead);

        const bookToggleRead = document.createElement("button");
        bookToggleRead.classList.add("status");
        bookToggleRead.textContent = "Status";
        bookToggleRead.addEventListener("click", () => {
            const currentStatus = myLibrary[index].read;
            switch (currentStatus) {
                case "Read":
                    myLibrary[index].read = "Not read";
                    bookRead.textContent = "Not read";
                    break;
                case "Not read":
                    myLibrary[index].read = "Reading";
                    bookRead.textContent = "Reading";
                    break;
                case "Reading":
                    myLibrary[index].read = "Read";
                    bookRead.textContent = "Read";
                    break;
            }
        });
        bookCard.appendChild(bookToggleRead);

        shelf.appendChild(bookCard);
    });
}





