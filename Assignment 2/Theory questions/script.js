// unshift() adds items to the beginning of an array. See example below for how it can be used:
// here is an array of CFGdegree streams:

let CFGstreams = ["software", "data science", "product management"];

//if I want to add "full stack" to the beginning of the array (i.e. at index[0]), I can do:
CFGstreams.unshift("full stack");
console.log(CFGstreams);

//shift() removes the first item in an array, therefore shortening the array's length by 1. It also returns the item that was removed. In the same CFGdegree example, if I wanted to remove "full stack" from the array, and then log both the new array and the item that was removed, I could do:

let otherCFGstreams = CFGstreams.shift();
console.log(otherCFGstreams);
console.log(CFGstreams);

//split() is a method of splitting a string into an array of substrings

let CFGdegree = "full stack, software, data science, product management";
let newArray = CFGdegree.split(",");
console.log(newArray);

//Object methods are functions that can be performed on objects using their own properties and data. Here is an object below called "languages"

const languages = {
  language1: "JavaScript",
  language2: "Python",
  language3: "SQL"
};

//Object.keys returns an array of the property names (keys) within the object:

const propertyNames = Object.keys(languages);
console.log(propertyNames);

//As another example, Object.entries returns an array of the key/value pairs within the object, each pair being a separate array:

const keyValuePairs = Object.entries(languages);
console.log(keyValuePairs);

//Finally, Objects.assign copies properties from a source object to a target object, for example:

const object1 = { name: "JavaScript" };
const object2 = { use: "Web development" };

const combinedObject = Object.assign({}, object1, object2);
console.log(combinedObject);

//onmouseover is a DOM event that is triggered when the user hovers their cursor over a HTML element. For example, in the below example, I have used "onmouseover" to trigger the "changeFont" function, which changes the font of the displayed text. I have also used another DOM event, "onmouseout", to revert the text back to its original font when the user moves their cursor away from the text:

function changeFont() {
  document.getElementById("newFont").style.fontFamily = "Brush Script MT";
}

function resetFont() {
  document.getElementById("newFont").style.fontFamily = "Calibri";
}

//In the final example below, I have added a button and used the "onclick" DOM event to turn the text a different colour when the user clicks the button:

function changeColour() {
  document.getElementById("newFont").style.color = "pink";
}