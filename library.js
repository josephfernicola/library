let myLibrary = []; //array of books to be displayed

class Book {
    constructor(title, author, pages, read) { //constructor function - Creates new Book objects
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return this.title + " by " + this.author + ", " + this.pages + ", " + this.read
    }
    }
}
const read = document.querySelector("#read");

const bookDisplay = document.querySelector(".bookdisplay");

function displayAllBooks () {
    bookDisplay.textContent = ""
    myLibrary.forEach((ele) => {
        const addedBook = document.createElement('div');
        const title = document.createElement('h1');
        const author = document.createElement('h2');
        const pages = document.createElement('h2');
        const readButton = document.createElement('button');
        const removeButton = document.createElement('button');
        removeButton.classList.add('removeButton');
        readButton.classList.add('readButton');
        addedBook.classList.add('book');
        addedBook.setAttribute('data-index' , `${myLibrary.indexOf(ele)}`);
        title.textContent = `${ele.title}`;
        author.textContent = `${ele.author}`;
        pages.textContent = `${ele.pages}` + " pages";
        readButton.textContent = `${ele.read}`;
        
        removeButton.textContent = "Remove Book";

        bookDisplay.appendChild(addedBook);
        addedBook.appendChild(title);
        addedBook.appendChild(author);
        addedBook.appendChild(pages);
        addedBook.appendChild(removeButton);
        addedBook.appendChild(readButton);

        removeButton.addEventListener('click' , () => {
            addedBook.removeAttribute('data-index' , `${myLibrary.indexOf(ele)}`);
            addedBook.remove("book");
            const index = myLibrary.indexOf(ele);
            myLibrary.splice(index , 1);   
        });
            readButton.addEventListener('click' , () => {
                 read.checked = !read.checked

                if (read.checked) { 
                    readButton.textContent = "Read"
                }
                else {
                    readButton.textContent = "Not Read"
                }
        });   
});
}

const newBook = document.querySelector(".newbook");
const container = document.querySelector(".modal-container");
const popup = document.querySelector(".modal-popup");
const modalClose = document.querySelector(".modal-close");

newBook.addEventListener('click' , () => {
    popup.classList.add('active');
});

modalClose.addEventListener('click' , () => {
    popup.classList.remove('active');
});

//Function that adds a new book to library array (4 arguments)
const addBookToLibrary = (title, author, pages, read) => {
    const addedBook = new Book(title, author, pages, read);
    myLibrary.push(addedBook);
};
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");

const submitButton = document.getElementById("submit");
const titleError = document.querySelector("#title + span.error")
const authorError = document.querySelector("#author + span.error")
const pagesError = document.querySelector("#pages + span.error")

document.getElementById("submit").addEventListener('click' , function (event) {
    const inputTitle = document.querySelector("#title").value;
    const inputAuthor = document.querySelector("#author").value;
    const inputPages = document.querySelector("#pages").value;
    let inputRead = document.querySelector("#read").value;
    if (!title.validity.valid || !author.validity.valid || !pages.validity.valid) {
        showError();
        event.preventDefault()
    }
    else {




        if (document.querySelector("#read").checked) {
            inputRead = "Read";
        }
        else {
            inputRead = "Not Read"
        }
    addBookToLibrary( 
        inputTitle,
         inputAuthor,
         inputPages,
         inputRead
     );
    popup.classList.remove('active');
    displayAllBooks();
    }
});




title.addEventListener('input' , () => {
    if (title.validity.valid) {
        console.log("valid");
        titleError.textContent = "";
        titleError.className = "error";

    }
    else {
        console.log("invalid");
        showError();
    }
})

function showError() {
    if (title.validity.valueMissing) {
        titleError.textContent = "You need to enter a title.";
        titleError.className = "error errorActive";
    }
   if (author.validity.valueMissing) {
       authorError.textContent = "You need to enter an author.";
       authorError.className = "error errorActive"
   }
   if (pages.validity.valueMissing) {
    pagesError.textContent = "You need to enter a page number.";
    pagesError.className = "error errorActive"
    }
    else if (pages.validity.rangeUnderflow) {
        pagesError.textContent = "Page number needs to be above 0";
        pagesError.className = "error errorActive"
    }
}