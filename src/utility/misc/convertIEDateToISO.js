function convertIEDateToISO(irishDate){

    const split = irishDate.split('/');

    return `${split[2]}-${split[1]}-${split[0]}`;
}
export default convertIEDateToISO;