const myLibrary = [];
const openButton = document.querySelector("[data-open-modal]"); //Grabs dialog open button
const modal = document.querySelector("[data-modal]")            //Grabs dialog

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
}

//Loops through all myLibrary array and adds every book it finds to the shelf 

function addBooksToShelf() {

    const shelf = document.querySelector(".shelf");

    for (let i = 0; i < myLibrary.length; i++) {

        //Connect to HTML elements (existing and non)
        const bookCard = document.createElement("div");
        bookCard.className = "card";
        const bookTitle = document.createElement("h2");
        const bookDelete = document.createElement("button");
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
        bookTitle.textContent = myLibrary[i].title;
        bookDelete.textContent = "X";
        bookAuthor.textContent = myLibrary[i].author;
        bookPages.textContent = myLibrary[i].pages;
        bookRead.textContent = myLibrary[i].read;

        //Appending the card to the shelf
        shelf.appendChild(bookCard);

    }
}














//TEST
addBookToLibrary("Titolo1", "Autore1", "numeroA", "Read");
addBookToLibrary("Titolo2", "Autore2", "numeroB", "Not Read");
addBookToLibrary("Titolo3", "Autore3", "numeroC", "Read");
addBookToLibrary("Titolo4", "Autore4", "numeroD", "Not Read");
addBookToLibrary("Titolo4", "Autore4", "numeroD", "Not Read");
addBookToLibrary("Titolo4", "Autore4", "numeroD", "Not Read");
addBookToLibrary("Titolo4", "Autore4", "numeroD", "Not Read");

addBooksToShelf();

console.log(myLibrary[0]);
console.log(myLibrary[1]);
console.log(myLibrary[2]);
console.log(myLibrary[0].info());
console.log(myLibrary[1].info());
console.log(myLibrary[2].info());


