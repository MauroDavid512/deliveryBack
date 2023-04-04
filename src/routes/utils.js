//Aqui estarán todas las funciones que se utilizaran durante el ruteo.

const axios = require('axios')
const { Restaurant, Users, Food } = require('../db.js');


// Funciones de /rest

const restCreator = async (dataRest) => {
    try {
        const { name, img, adress, phone, shipping} = dataRest; // esto para el req.body en post


        const newRest = await Restaurant.create({
            name,
            img,
            adress,
            phone,
            shipping
        });
    } catch (error) {
        console.log("Error en funcion restCreator", error.message);
    }
};





const getAllRest = async () => {
    try {
        const allRest = await Restaurant.findAll({
            include: {
                model: Food,
                attributes: ['id','name','img', 'price'],
                throug:{
                    attributes: []
                }
            }
        })
        return allRest
    } catch (error) {
        console.log('Error en getAllRest ', error.message)
    }
}



const getRestDetail = async (id) => {
    const allRest = await getAllRest()

    /*
    El proximo condicional me permite emplear esta misma funcion tanto cuando
    buscaré un restaurante por su numero de id como para buscarlo por su nombre
    */

    if (typeof (id) === 'number') {
        try {
            const rest = allRest.find(e => e.id === id)
            // console.log('numero ', pokemon)
            return rest
        } catch (error) {
            console.log('Error en getRestDetail con id numerico', error.message)
        }
    }else if(typeof (id) === 'string') {
        try {
            const rest = allRest.filter(e => e.name === id)
            if(rest.length > 0){
                return  rest
            }else{
                throw new Error("No se encuentra al restaurante")
            }
        } catch (error) {
            console.log('Error en getRestDetail con id string', error.message)
        }
    }
}


// Funciones de  /users

const getAllUsers = async () => {
    try {
        const allUsers = await Users.findAll()
        return allUsers
        //Devuelve array con todos los restaurantes

    } catch (error) {
        console.log('Error en getAllRest ', error.message)
    }
}

const userCreator = async (dataUser) => {
    try {
        const { name, img, email, birthday} = dataUser; // esto para el req.body en post
        const aux1 = await getAllUsers()
        //Traigo los datos existentes en la base para corroborar que no se repita ningun pokemon
        const aux2 = aux1.find(e => e.name === name)


        const newRest = await Restaurant.create({
            name,
            img,
            email,
            birthday
        });
    } catch (error) {
        console.log("Error en funcion restCreator", error.message);
    }
};

const getUserDetail = async (id) => {
    const allUser = await getAllUsers()

    /*
    El proximo condicional me permite emplear esta misma funcion tanto cuando
    buscaré un restaurante por su numero de id como para buscarlo por su nombre
    */

    if (typeof (id) === 'number') {
        try {
            const user = allUser.find(e => e.id === id)
            // console.log('numero ', pokemon)
            return user
        } catch (error) {
            console.log('Error en getUserDetail con id numerico', error.message)
        }
    }else if(typeof (id) === 'string') {
        try {
            const user = allUser.filter(e => e.name === id)
            return user
        } catch (error) {
            console.log('Error en getUserDetail con id string', error.message)
        }
    }
}


// -----------Funciones de Food--------------------

const foodCreator = async (dataFood) => {
    try {
        const { name, img, price, description, rest} = dataFood; // esto para el req.body en post
        let Rest = await Restaurant.findAll({
            where: {id: rest}
        })
        const newFood = await Food.create({
            name,
            img,
            price,
            description
        });

        newFood.addRestaurant(Rest)
        return newFood


    } catch (error) {
        console.log("Error en funcion foodCreator", error.message);
    }
};

const getFood = async (idRest) => {
    try{
        const allFood = await Food.findAll({
            include: {
                model: Restaurant,
                attributes: ['id','name','img'],
                throug:{
                    attributes: []
                }
            }
        })
        if(idRest){
            let foodRest = allFood.filter(e => e.restaurantId === idRest)
        }else{
            return allFood
        }
    }catch(error){
        console.log("Error en funcion getFood", error.message)
    }
}



//----------FUNCIONES PRELOAD-------------------

const preload = require("../preload.json")

const preloadRest = async () => {

    try {
        let data = preload.rest.map((rest) => {
            return {
                name: rest.name,
                img: rest.img,
                adress: rest.adress,
                phone: rest.phone,
                shipping: rest.shipping

            };
        });

        for (const rest of data) {
            restCreator(rest);
        }
        return data;
    } catch (error) {
        console.log("ERROR EN preloadRest", error.message);
    }
};

const preloadFood = async () => {

    try {
        let data = preload.food.map((food) => {
            return {
                name: food.name,
                img: food.img,
                price: food.price,
                description: food.description,
                rest: food.rest

            };
        });

        for (const food of data) {
            foodCreator(food);
        }
        return data;
    } catch (error) {
        console.log("ERROR EN preloadRest", error.message);
    }
};


module.exports = {
    restCreator,
    getAllRest,
    getRestDetail,
    userCreator,
    getAllUsers,
    getUserDetail,
    getFood,
    foodCreator,
    //Preloads
    preloadRest,
    preloadFood
}

