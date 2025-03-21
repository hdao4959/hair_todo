export const sortedArray = (array, arrayPattern, sortBy) => {
   const newArray =  array.sort((a, b) => {
      return arrayPattern.indexOf(a[sortBy]) - arrayPattern.indexOf(b[sortBy]) 
   })
    return newArray;
}