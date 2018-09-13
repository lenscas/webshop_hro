// some simple helper functions.


// same as document.getElementsByClassName but returns a normal array instead of HTMLCollection
export const getElementsAsArrayByClass = (className : string) => Array.from(document.getElementsByClassName(className));