import itemList from "/items/itemlist.js"
var container = document.querySelector("div.container");

var activeItem,image,label; // Global variables for selected item, preview image,label elements.
var flag = true; // Flag for initial loading.

/*
    UTILITY FUNCTIONS
*/
// To change the preview image for current selected item.
const changePreview = function(currItem){
    activeItem.classList.toggle("active");
    activeItem = currItem;
    activeItem.classList.toggle("active");
    let src = activeItem.style.backgroundImage; // src is of format: url('...')
    src = src.substring(5,src.length-2); // Extracting path of image
    image.setAttribute("src",src); // set image
    label.innerText = activeItem.getAttribute('id');
}

// Adding items to html
var list = document.createElement("ul");
image = document.createElement("img");
label = document.createElement("div");
label.classList.add("label");
container.append(list);
container.append(image);
container.append(label);

itemList.forEach((item)=>{
    let listItem = document.createElement("li");
    listItem.setAttribute("id",item["title"]);
    listItem.innerHTML = `
    <div class="ellipses">${item["title"]}</div>
    `;
    listItem.style.backgroundImage = `url('${item["previewImage"]}')`;
    // Initialize display for the first item.
    if(flag){
        activeItem = listItem;
        activeItem.classList.toggle("active");
        image.setAttribute("src",item["previewImage"]);
        label.innerText = item["title"];
        flag = false;
    }
    list.append(listItem);
})

// Fixing text that overflows 
var ellipsesText = document.querySelectorAll(".ellipses");
ellipsesText.forEach((item)=>{
    if(item.offsetWidth < item.scrollWidth){
        let text = item.textContent;
        item.dataset.tail = text.slice(text.length - 10);
    }
})

/*
    EVENT LISTENERS
*/
// Adding 'click' event listeners to each list item
var items = document.querySelectorAll("li");
items.forEach((item) => {
    item.addEventListener("click",()=>{
        changePreview(item);
    });
})

// Adding event listener to document to scroll through 
// the list using up and down arrow keys.
document.addEventListener("keydown",(event)=>{
    let keyPressed = event.key;
    let currItem;
    // Do something iff up-down arrow keys are pressed.
    if(keyPressed === "ArrowUp"){
        if(activeItem.previousElementSibling){
            currItem = activeItem.previousElementSibling;
        } else {
            // If previous element is not found go to last element
            // to provide circular navigation
            currItem = activeItem.parentNode.lastElementChild; 
        }
        changePreview(currItem);
    } else if(keyPressed === "ArrowDown"){
        if(activeItem.nextElementSibling){
            currItem = activeItem.nextElementSibling;
        } else {
            currItem = activeItem.parentNode.firstElementChild;
        }
        changePreview(currItem);
    }
});
//END