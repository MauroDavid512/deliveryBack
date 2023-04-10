//Aqui estarán todas las funciones que se utilizaran durante el ruteo.

const axios = require('axios')
const { Restaurant, Users, Food ,Categories} = require('../db.js');


// Funciones de /rest

const restCreator = async (dataRest) => {
    try {
        const { name, img, adress, phone, shipping, user} = dataRest; // esto para el req.body en post
        let User = await Users.findAll({
            where: {id: user}
        })

        const newRest = await Restaurant.create({
            name,
            img,
            adress,
            phone,
            shipping
        });
        newRest.addUsers(User)
        return newRest

    } catch (error) {
        console.log("Error en funcion restCreator", error.message);
    }
};



const restUpdating = async (id, restaurantData) => {
      try {
          const restaurant = await Restaurant.update(restaurantData, { where: { id } });

          return restaurant;
      } catch (err) {
          throw err;
      }

  }




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
        const allUsers = await Users.findAll({
            include: {
                model: Restaurant,
                attributes: ['id','name','img'],
                throug:{
                    attributes: []
                }
            }
        })
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


        const newRest = await Users.create({
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

const preloadUsers = async () => {

    try {
        let data = preload.users.map((user) => {
            return {
                name: user.name,
                img: user.img,
                email: user.email,
                birthday: user.birthday

            };
        });

        for (const user of data) {
            userCreator(user);
        }
        return data;
    } catch (error) {
        console.log("ERROR EN preloadUsers", error.message);
    }
};

const preloadRest = async () => {

    try {
        let data = preload.rest.map((rest) => {
            return {
                name: rest.name,
                img: rest.img,
                adress: rest.adress,
                phone: rest.phone,
                shipping: rest.shipping,
                user: rest.user

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

const preloadCategories = async () => {

  try {
      let data = preload.categories.map((category) => {
          return {
              name: category.name,
          };
      });

      for (const category of data) {
          createCategory(category);
      }
      return data;
  } catch (error) {
      console.log("ERROR EN preloadCategories", error.message);
  }
};

//----------FUNCIONES DE CATEGORIAS-------------------
const getCategories = async () => {
  try {
    const allCategories = await Categories.findAll();
    return allCategories;
  } catch (error) {
    console.log("Error en getCategories", error.message);
  }
}
const createCategory = async (body) => {
  try {
    const creation = await Categories.create(body);
    return creation;
  } catch (error) {
    console.log("Error en getCategories", error.message);
  }
}

module.exports = {
    restCreator,
    restUpdating,
    getAllRest,
    getRestDetail,
    userCreator,
    getAllUsers,
    getUserDetail,
    getFood,
    foodCreator,
    getCategories,
    createCategory,
    //Preloads
    preloadUsers,
    preloadRest,
    preloadFood,
    preloadCategories
}

