export default function cleanBeforeSubmit(userFields) {
  return function(data) {
    for (let field in userFields) {
      if (!userFields.hasOwnProperty(field)) {
        continue;
      }
      if (userFields[field].userInterfaceOnly) {
        delete data[field];
      }
    }

    return data;
  }
}