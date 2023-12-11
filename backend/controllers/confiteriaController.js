// confiteriaController.js
import Product from "../models/confiteriaModel.js";
import dataProducts from "../config/dataProductos.json" assert { type: "json" };

const initializeDatabase = async (req, res) => {
  try {
    // Verificar si hay documentos antes de intentar eliminar
    const existingDocuments = await Product.find();

    if (existingDocuments.length > 0) {
      // Elimina todos los documentos existentes
      await Product.deleteMany();
    }

    // Crea nuevos documentos a partir del archivo JSON
    await Product.create(dataProducts);

    res.status(200).json({ message: "Base de datos inicializada con éxito." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al inicializar la base de datos." });
  }
};


// Otro método para obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los productos." });
  }
};

export { initializeDatabase, getAllProducts };
