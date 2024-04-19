export  function deleteNullProperties(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        // If the property is an object (and not null), recursively call the function
        deleteNullProperties(obj[key]);
      } else if (obj[key] === null || obj[key] === '') {
        // If the property value is null, delete the property from the object
        delete obj[key];
      }
    }
    return obj
  }
  
  export function calculateAge (dateOfBirth) {
    // Convert the birthdate string to a Date object
    const birthdateObj = new Date(dateOfBirth);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in years
    let age = currentDate.getFullYear() - birthdateObj.getFullYear();

    // Check if the birthday hasn't occurred yet this year
    if (
      currentDate.getMonth() < birthdateObj.getMonth() ||
      (currentDate.getMonth() === birthdateObj.getMonth() &&
        currentDate.getDate() < birthdateObj.getDate())
    ) {
      age--;
    }

    return age;
  };
