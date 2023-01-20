//Variables de entrada
var p = Number(getParameterByName('p'));
var name1 = getParameterByName('name1');
var name2 = getParameterByName('name2');
var a1 = Number(getParameterByName('a1'));
var b1 = Number(getParameterByName('b1'));
var c1 = Number(getParameterByName('c1'));
var a2 = Number(getParameterByName('a2'));
var b2 = Number(getParameterByName('b2'));
var c2 = Number(getParameterByName('c2'));
var x1 = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
var error = 5e-10;
var iteracion = 0;
var x2, t = [], y1 = [], i, t1sat, t2sat, tsup, p1sat, p2sat, a12, p2, tcal, emn, xt = [], yt = [];
if(p,a1,a2){
    t1sat = Number((b1 / (a1 - Math.log(p))) - c1).toFixed(4);
    t2sat = Number((b2 / (a2 - Math.log(p))) - c2).toFixed(4);
    for(i=0; i < x1.length; i++ ){
        x2 = 1 - x1[i];
        do{
            if(iteracion === 0){
                tsup = Number((x1[i] * t1sat + x2 * t2sat).toFixed(4));
            }else{
                tsup = Number(tcal);
            }
            p1sat = Number(Math.exp( a1 -( b1 /( tsup + c1)))).toFixed(4);
            p2sat = Math.exp(a2 -( b2 /( tsup + c2))).toFixed(4);
            a12 = Number(p1sat / p2sat);
            p2 = Number(p /( x1[i] * a12 + x2));
            tcal = Number((b2 / (a2 - Math.log(p2))) - c2).toFixed(4);
            emn = Math.abs(tcal - tsup);
            iteracion++;
            if(emn < error) break;         
        }while(iteracion < 100);
        y1[i] = ((x1[i] * p1sat) / p).toFixed(4);
        t[i] = tcal;
        xt[i] = [x1[i], Number(t[i])];
        yt[i] = [Number(y1[i]), Number(t[i])];
    };
    x1.unshift('x1'); t.unshift('Temperatura'); y1.unshift('y1');
    window.onload = function(){
        var col1, col2, col3, rown;
        $('#resultado').css('display','block');
        $('#p').attr('value', p); $('#name1').attr('value', name1); $('#name2').attr('value', name2);
        $('#a1').attr('value', a1); $('#b1').attr('value', b1); $('#c1').attr('value', c1);
        $('#a2').attr('value', a2); $('#b2').attr('value', b2); $('#c2').attr('value', c2);
        for(i=0; i < x1.length; i++){
            col1 = '<td>' + x1[i] + '</td>';
            col2 = '<td>' + t[i] + '</td>';
            col3 = '<td>' + y1[i] + '</td>';
            rown = '<tr>' + col1 + col2 + col3 + '</tr>';
            $('#tabla').append(rown);
        };
        const Taxis = {
            datasets: [{
                label: name1, data: xt, backgroundColor: 'red', borderColor: 'red', showLine: true
            },{
                label: name2, data: yt, backgroundColor: 'blue', borderColor: 'blue', showLine: true
            }]
        };
        const config = {
            type: 'scatter', data: Taxis
        }
        const graph = document.querySelector('#graphline');
        new Chart (graph, config);
        $('.container-title').click(function () {
            $(this).next('.container-description').slideToggle();
        });
    };
};