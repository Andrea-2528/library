const myLibrary = [];
const openButton = document.querySelector("[data-open-modal]"); //Grabs dialog open button from document
const modal = document.querySelector("[data-modal]")            //Grabs dialog from document

//Note that here the querySelector is for "modal", because the submit button is inside there
//It's selected by searching it's attribute value and filtering the "cancel" button the same way
const submitButton = modal.querySelector('button[type="submit"]:not([formmethod="dialog"])');
const form = modal.querySelector("form");                       //Grabs the form from the modal

//ddddddddddddddddddddd
const removeButton = document.querySelector("[data-index]");  //Grabs created remove button


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

submitButton.addEventListener('click', (event) => {             //On submit:
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

removeButton.addEventListener("click", {
    
})


//Defines the Book object

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return title + ", " + author + ", " + pages + ", " + read;
    }
}

//Creates a new Book (obj) and adds it to the library (array)

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    addBooksToShelf(myLibrary.length);
}

//Loops through all myLibrary array and adds every book it finds to the shelf 

function addBooksToShelf(length) {

    const shelf = document.querySelector(".shelf");

    let position = length - 1;

    //Connect to HTML elements (existing and non)
    const bookCard = document.createElement("div");
    bookCard.className = "card";
    bookCard.dataset.index = `${position}`;         //Sets a data-attribute called "index" with value ${position}
    const bookTitle = document.createElement("h2");
    const bookDelete = document.createElement("button");
    bookDelete.dataset.index = `${position}`;       //Sets the same data-attribute on the button
    const bookAuthor = document.createElement("h3");
    const bookPages = document.createElement("p");
    const bookRead = document.createElement("p");



    //Appending all elements inside the card
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookDelete);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRead);

    //Assigning all values of the card's elements

    bookTitle.textContent = myLibrary[position].title;
    bookDelete.textContent = "Remove";
    bookAuthor.textContent = myLibrary[position].author;
    bookPages.textContent = myLibrary[position].pages;
    bookRead.textContent = myLibrary[position].read;

    //Appending the card to the shelf
    shelf.appendChild(bookCard);
}




