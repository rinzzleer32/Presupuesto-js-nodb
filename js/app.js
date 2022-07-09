const ingresos = [
    new Ingreso('salario',4000),
    new Ingreso('Puesto',4500)
];
console.log("front end");
const egresos = [
    new Egreso('renta',700),
    new Egreso('iva',3500)
];

let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}
let totalIngresos = ()=>{
    let totalIngreso = 0;
    for (let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
   return totalIngreso;
}
let totalEgresos = ()=>{
    let totalEgreso = 0;
    for (let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}
let cargarCabecero = ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso= totalEgresos()/ totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda =(valor) =>{
    //poemos cambiar la moneda solo con la nacionalidad solo con cambiar el pais y la moneda
    return valor.toLocaleString('en-US',{style:'currency',currency:'USD', minimumFractionDigits:2});

}
const formatoPorcentaje = (valor) =>{
    return valor.toLocaleString('en-US',{style:'percent',minimumFractionDigits:2});
}
const cargarIngresos = () =>{
    let ingresosHtml = '';
    for(let ingreso of ingresos){
        ingresosHtml += crearIngresoHtml(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHtml;
}

const crearIngresoHtml = (ingreso) =>{
    let ingresoHtml = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${ingreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onclick = 'eliminarIngreso(${ingreso.id})'></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `;
    return ingresoHtml;
}
const eliminarIngreso =(id) =>{
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    //similar for(let ingreso of ingresos)
    ingresos.splice(indiceEliminar,1);
    cargarApp();
}
const cargarEgresos = () =>{
    let egresosHtml = '';
   
    for(let egreso of egresos){
        egresosHtml += crearEgresosHtml(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHtml;
}

const crearEgresosHtml = (egreso) =>{
    let egresosHtml= `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                onclick = 'eliminarEgreso(${egreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return egresosHtml;
}
const eliminarEgreso = (id) =>{
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar,1);
    cargarApp();
}

const agregarDato = () =>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor =forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value,+valor.value));
            cargarCabecero();
            cargarIngresos();
        }
       else if(tipo.value === 'egreso'){
        egresos.push(new Egreso(descripcion.value,+valor.value));
        cargarCabecero();
        cargarEgresos();
        }
}

}