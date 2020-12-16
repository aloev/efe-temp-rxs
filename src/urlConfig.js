
export const api = 'http://localhost:2000/api';

export const generatePublicUrl = ( fileName) => {
    return `http://localhost:2000/public/${fileName}`; 
}

//OSX
//"start": "PORT=4000 react-scripts start"

//Windows
//"start": "set PORT=4000 && react-scripts start",
