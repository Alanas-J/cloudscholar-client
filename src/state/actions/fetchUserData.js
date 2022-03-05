
async function fetchUserData(userID){

    // Try get user data
    const response = await axios.get('http://localhost:8086/user_data/'+userID);
    

    dispatch(updateUserState({
        loggedIn: true,
        userData: response.data
    }));

    
}

export default fetchUserData;