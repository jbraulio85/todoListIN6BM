const inquirer = require('inquirer');
const { validate } = require('uuid');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué deseas hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3'.green} Listar tareas completas`
            },
            {
                value: '4',
                name: `${'4'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5'.green} Completar tareas(s).`
            },
            {
                value: '6',
                name: `${'6'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0'.green} Salir del programa`
            }
        ]
    }
];

const menu = async () => {
    console.clear();
    console.log('=============================='.green);
    console.log('     Selecciona una opción'.white);
    console.log('=============================='.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return(opcion);
}

const leerInput = async(message) =>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Ingresa un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const pausa = async () => {
    const question =[
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
}

const mostrarListadoCheckList = async (tareas = []) =>{
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.green;

        return{
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn) ? true : false
        }
    });
    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}

const listadoBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return{
            value: tarea.id,
            name: `${ idx } ${ tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    menu,
    leerInput,
    pausa,
    mostrarListadoCheckList,
    listadoBorrar,
    confirmar
}