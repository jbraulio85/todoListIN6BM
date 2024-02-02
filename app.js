require('colors');

const { menu, 
        pausa,
        leerInput, 
        mostrarListadoCheckList,
        listadoBorrar,
        confirmar} = require('./helpers/inquirer');

const { guardarArchivo, leerDB } = require('./helpers/guardarInfo');

const Tareas = require('./models/tareas');

const main = async() => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareaFromArray(tareasDB);
    }


    do{
        opt = await menu();
        switch(opt){
            case '1':
                const desc = await leerInput('Descripcion');
                tareas.crearTarea(desc);
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletas(true);
            break;
            case '4':
                tareas.listarPendientesCompletas(false);
            break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.cambiarEstado(ids);
            break;
            case '6':
                const id = await listadoBorrar( tareas.listadoArr);
                if( id !== '0'){
                    const ok = await confirmar('¿Está seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada!!!');
                    }
                }
            break;
        }
        guardarArchivo(tareas.listadoArr);
        await pausa();
    }while(opt !== 0)
    
}

main();