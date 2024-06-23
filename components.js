function createButtonWithOnClick(color, text) {
    // Create the button element
    const button = document.createElement('button');
    
    // Set the button's text content
    button.textContent = text;
    
    // Set the onclick event to change the parent's color to red
    button.onclick = function() {
        if (this.parentElement.style.color != color){
            this.parentElement.style.color = color
        } else {
            this.parentElement.style.color = 'black'
        }
    };
    
    return button;
}


function rerenderButton(kl){
    const button = document.createElement('button');
    button.setAttribute("rerender-obj", JSON.stringify({text: "this is the renrender data for the rerenderButton"}))
    button.setAttribute('data-toggle', 'control');
    button.textContent = kl.text;
    button.onclick = () => {
        const rd = JSON.parse(button.getAttribute("rerender-obj"))
        console.log({rd})
        const rpl = rerenderButton(rd);
        console.log({rpl})
        replaceElement(rpl, button);
    }
    return button
}

// Usage exampl

function createList(items){
    const taskList = document.createElement('ol');
    items.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task;
        taskList.appendChild(listItem);
    });

    return taskList
}
function createPersonDiv({name, age, job, salary, items}) {
// Create the main person div
const personDiv = document.createElement('div');
personDiv.className = 'person';

// Create the name div
const nameDiv = document.createElement('div');
nameDiv.className = 'name';
const nameH1 = document.createElement('h1');
nameH1.textContent = name;
nameDiv.appendChild(nameH1);

// Create the age div
const ageDiv = document.createElement('div');
ageDiv.className = 'age';
ageDiv.textContent = age;

// Create the job div
const jobDiv = document.createElement('div');
jobDiv.className = 'job';
jobDiv.textContent = job;

// Create the salary div
const salaryDiv = document.createElement('div');
salaryDiv.className = 'salary';
salaryDiv.textContent = salary;

// Append all child divs to the main person div
personDiv.appendChild(nameDiv);
personDiv.appendChild(ageDiv);
personDiv.appendChild(jobDiv);
personDiv.appendChild(salaryDiv);
personDiv.appendChild(createList(items))
personDiv.appendChild(createButtonWithOnClick(color='red', text='text'))
personDiv.appendChild(rerenderButton({text}))

return personDiv;
}


function replaceElement(newElement, oldElement, goupTree) {
    let elementToReplace = oldElement;
    if (goupTree != undefined){
        for (let i = 0; i < goupTree; i++){
            elementToReplace = elementToReplace.parentNode;
            }
        }
    let parent = elementToReplace.parentNode;
    if (parent) {
        parent.replaceChild(newElement, elementToReplace);
    }
}