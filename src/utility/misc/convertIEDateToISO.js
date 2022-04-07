function convertIEDateToISO(irishDate){

    const split = irishDate.split('/');

    return `20${split[2]}-${split[1]}-${split[0]}`;
}
export default convertIEDateToISO;