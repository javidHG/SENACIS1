import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
//@ts-ignore
const db = drizzle(sql,{ schema });

const main = async () => {
    try {
     console.log("Se inicializo la base de datos");
     await db.delete(schema.courses);
     await db.delete(schema.userProgress);
     await db.delete(schema.units);
     await db.delete(schema.lessons);
     await db.delete(schema.challenges);
     await db.delete(schema.challengeOptions);
     await db.delete(schema.challengeProgress);

     await db.insert(schema.courses). values ([
        {
            id: 1,
            title:"Java Básico",
            imageSrc:"/Java.png",
            
        },
        {
            id:2,
            title:"JavaScript Basico",
            imageSrc:"/JavaScriptBandera.png",
            
        },
        {
            id:3,
            title:"HTML",
            imageSrc:"/HTMLBandera.png",
            
        },
        {
            id:4,
            title:"CSS",
            imageSrc:"/CssBandera.png",
            
        },
     ]);

     await db.insert(schema.units).values([
        {
            id:1,
            courseId:1, //Java Basico
            title:"Lección 1",
            description: "Variables y Tipos de Datos",
            order:1
        },
        
     ]);

        await db.insert(schema.lessons).values([
            {
                id:1,
                unitId:1,
                order:1,
                title: "Variables y Asignación",
            },
            {
                id:2,
                unitId:1,
                order:2,
                title: "Tipos de Datos Primitivos",
            },
            {
                id:3,
                unitId:1,
                order:3,
                title: "Operaciones Básicas",
            },
            {
                id:4,
                unitId:1,
                order:4,
                title: "Tipos de Datos Primitivos",
            },
            {
                id:5,
                unitId:1,
                order:5,
                title: "Tipos de Datos Primitivos",
            },
        ]);
            //preguntas
            //leccion 1
            //pregunta1
        await db.insert(schema.challenges).values([
            {
                id:1,
                lessonId:1, //variables y asignación
                type: "SELECT",
                order:1,
                question:"¿Cual de estas es la manera correcta de declarar una variable en Java?",
            },
            //pregunta2
            {
                id:2,
                lessonId:1, //variables y asignación
                type: "ASSITS",
                order:2,
                question:" ¿Cuál de las siguientes opciones es la correcta para definir una variable de tipo `double` en Java?",
            },
            //pregunta3
            {
                id:3,
                lessonId:1, //variables y asignación
                type: "SELECT",
                order:3,
                question:"¿Cuál es la forma correcta de declarar y asignar un valor de texto a una variable en Java?",
            },
           
        ]);
            //respuestas
            //respuesta 1- pregunta 1
        await db.insert(schema.challengeOptions).values([
            {
                challengeId:1,
                imageSrc:"/varJava1.png",
                correct:true,
                text:"int edad = 25;",
                audioSrc:"/varJava1.mp3",
            },
            {
                challengeId:1,
                imageSrc:"/varJava2.png",
                correct:false,
                text:"int: edad = 25;",
                audioSrc:"/varJava2.mp3",
            },
            {
                challengeId:1,
                imageSrc:"/varJava3.png",
                correct:false,
                text:"variable int edad = 25;",
                audioSrc:"/varJava3.mp3",
            },
        ]);

        //respuesta 2 - pregunta 2
        await db.insert(schema.challengeOptions).values([
            {
                challengeId:2,//pregunta 2 leccion 1
                correct:false,
                text:"int precio = 19.99;",
                audioSrc:"/L1P2O1.mp3",
            },
            {
                challengeId:2,//pregunta 2 leccion 1
                correct:true,
                text:"double precio = 19.99;",
                audioSrc:"/L1P2O2.mp3",
            },
            {
                challengeId:2,//pregunta 2 leccion 1
                correct:false,
                text:"char precio = 19.99;",
                audioSrc:"/L1P2O3.mp3",
            },
            {
                challengeId:2,//pregunta 2 leccion 1
                correct:false,
                text:"String precio = `19.99`;",
                audioSrc:"/L1P2O4.mp3",
            },
        ]);

        //respuesta 3 - pregunta 3
        await db.insert(schema.challengeOptions).values([
            {
                challengeId:3,
                imageSrc:"/varString.png",
                correct:true,
                text:"String nombre = 'Juan'",
                audioSrc:"/varString.mp3",
            },
            {
                challengeId:3,
                imageSrc:"/varChar.png",
                correct:false,
                text:"char nombre = `Juan`;",
                audioSrc:"/varChar.mp3",
            },
            {
                challengeId:3,
                imageSrc:"/varBoolean.png",
                correct:false,
                text:"text nombre = `Juan`;",
                audioSrc:"/varBoolean.mp3",
            },
        ]);


        //Pregunta 1 leccion2 
        await db.insert(schema.challenges).values([
            {
                id:4,
                lessonId:2, //Tipos de Datos Primitivos
                type: "SELECT",
                order:1,
                question:"¿Cuáles son los tipos de datos primitivos en Java que se utilizan para almacenar números enteros?",
            },
            //pregunta2
            {
                id:5,
                lessonId:2, //Tipos de Datos Primitivos
                type: "ASSITS",
                order:2,
                question:" ¿Qué tipo de dato primitivo en Java se utiliza para almacenar números de punto flotante y cuál es la diferencia entre ellos?",
            },
            //pregunta3
            {
                id:6,
                lessonId:2, //Tipos de Datos Primitivos
                type: "SELECT",
                order:3,
                question:"En Java, el tipo de dato primitivo boolean puede almacenar tres valores diferentes: `true`, `false` y `null`.",
            },
           
        ]);

     console.log("Inicializacion finalizada");
    } catch (error){
        console.error(error);
        throw new Error("No se pudo inicializar la base de datos");
    }
};

main();