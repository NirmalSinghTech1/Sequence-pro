const peopleList = [
    "Elon Musk",
    "Jeff Bezos",
    "Mark Zuckerburg",
    "Larry Ellison",
    "Bernard Arnault",
    "Warren Buffet",
    "Bill Gates",
    "Larry Page",
    "Sergey Brin",
    "Steve Ballmer"
]


const draggableList = document.getElementById('draggable-list')
const checkSequence = document.getElementById('check-sequence')
const rank = document.getElementById('rank')
const startOver = document.getElementById('start-over')

let listItems = []
let dragSrcEl = null;
let draggableItem;

peopleList.map(item => (
    {value: item, sort: Math.random()}
    )).sort((a,b) => a.sort - b.sort)
    .forEach((item, index) => {
    const listItem = document.createElement('li')
    listItem.setAttribute('data-index', index)  
    listItem.classList.add('list-item')
    
    listItems.push(listItem)
    listItem.innerHTML = 
    `   
        <span class="rank">${index + 1}</span>
        <div class="item-name" draggable="true">
            <span class="draggable-item">${item.value}</span>
            <span class="icon"><i class="fa-solid fa-grip-lines"></i></span>
        </div>
    `

    draggableList.appendChild(listItem)
})

function handleDragStart(e){
    e.target.style.opacity = "0.4";
    // draggableItem = +this.closest('li').getAttribute('data-index')
    
    dragSrcEl = this
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData('text/html', this.innerHTML)
}
function handleDragOver(e){
    e.preventDefault()
    return false;
}
function handleDragEnter(e){
    this.closest('li').classList.add('over')
}

function handleDragLeave(e){
    console.log('leave')
    this.closest('li').classList.remove('over')
}

function handleDragEnd(e){
    e.target.style.opacity= "1";
    document.querySelectorAll('.list-item').forEach(item => {
        item.classList.remove("over")
    })
}


function handleDrop(e){
    e.stopPropagation();
    if(dragSrcEl !== this){
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html')
    }
    return false;
}


let items = document.querySelectorAll('.list-item .item-name')
items.forEach(item => {
    item.addEventListener('dragstart', handleDragStart)
    item.addEventListener('dragover', handleDragOver)
    item.addEventListener('dragenter', handleDragEnter)
    item.addEventListener('dragleave', handleDragLeave)
    item.addEventListener('dragend', handleDragEnd)
    item.addEventListener('drop', handleDrop)
})



checkSequence.addEventListener('click', ()=> {
    listItems.forEach((item, index) => {
        const personName = item.querySelector(".item-name").innerText.trim()
        const listName = item.querySelector('.draggable-item')

        if(personName !== peopleList[index]){
            listName.classList.add('wrong')
        } else {
            listName.classList.remove('wrong')
            listName.classList.add('right')
        }
    })
    
})

startOver.addEventListener('click', () => {
    listItems.forEach(item => {
        item.querySelector('.draggable-item').classList.remove('wrong')
        item.querySelector('.draggable-item').classList.remove('right')
    })
})




