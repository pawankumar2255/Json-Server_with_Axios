const axios = require('axios')
const readlineSync = require('readline-sync')




const getAllBooks = async () =>{
    try {
        const getBooks = await axios.get('http://localhost:3000/books') 
        console.log({
            status:getBooks.status,
            statusText:getBooks.statusText,
            data:getBooks.data
        });
    } catch (error) {
        console.log(error.message);
    }
}



const getOneBook = async (id) => {
    try {
        const res = await axios.get('http://localhost:3000/books/'+id)
        console.log({
            status:res.status,
            statusText:res.statusText,
            data:res.data
        });
    } catch (error) {
        console.log(error.message);
    }
}



const insertData = async (data)=>{
    try {
        if (Object.keys(data).length > 0 ){
            const bookDetail = await axios.post('http://localhost:3000/books',data)
            console.log({
                status:bookDetail.status,
                statusText:bookDetail.statusText
            },
            "\n data inserted successfully");
        }

    } catch (error) {
        console.log(error.message);
    }
}



const updateData = async (id, details) => {
    try {

        const data = await axios.put(`http://localhost:3000/books/${id}`, details)
        console.log({
            status:data.status,
            statusText:data.statusText
        },
        "\n data updated successfully ");
        
    } catch (error) {
        console.log(error.message);
    }
}


const deleteData = async (id) =>{
    try {
        const delData = await axios.delete(`http://localhost:3000/books/${id}`)
        console.log({
            status:delData.status,
            statusText:delData.statusText
        },
        "\ndata deleted successfully");
    } catch (error) {
        console.log(error.message);
    }
}

const crudGettingStart = async()=>{

    while (true){
        let select = await readlineSync.questionInt(`
                                            Press 1 for showing all books 
                                            Press 2 for showing perticular book
                                            Press 3 for adding new book to the collection
                                            Press 4 for updating perticular book dettail
                                            Press 5 for deleting book from the collection
                                            press 6 for exit
                                            
                                            `)
        if (select===1){
            await getAllBooks()
        }else if(select===2){
            let id = await readlineSync.question('Press id of the book which you are wanted to see     :       ')
            await getOneBook(id)
        }else if(select===3){
            let author = await readlineSync.question('Please enter the Author name    :    ')
            let bookName = await readlineSync.question('Enter book name    :     ')
    
            await insertData({author,bookName})
        }else if(select===4){
            let id = await readlineSync.question('Press id of the book which you are wanted to update    :       ')
            let author = await readlineSync.question('Please enter the Author name    :    ')
            let bookName = await readlineSync.question('Enter book name    :     ')
            await updateData(id,{author,bookName})
        }else if(select==5){
            let id = await readlineSync.question('Press id of the book which you are wanted to delete    :       ')
            await deleteData(id)
        }else{
            break
        }
    
    }
}


crudGettingStart()