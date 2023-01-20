//Variables de entrada
var t = Number(getParameterByName('temp'));
var name1 = String(getParameterByName('name1'));
var name2  = String(getParameterByName('name2'));
var a1 = Number(getParameterByName('a1'));
var b1 = Number(getParameterByName('b1'));
var c1 = Number(getParameterByName('c1'));
var a2 = Number(getParameterByName('a2'));
var b2 = Number(getParameterByName('b2'));
var c2 = Number(getParameterByName('c2'));
var x1 = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
var pk1, pk2, p, y1, i, xp = [], yp = [];
if(t,a1,a2){
    pk1 = Math.exp(a1 - (b1 / (t + c1))).toFixed(4);
    pk2 = Math.exp(a2 - (b2/(t + c2))).toFixed(4);
    p = x1.map(mp => (mp * pk1 + (1 - mp) * pk2).toFixed(4));
    y1 = x1.map(np => ((np * pk1) / (np * pk1 + (1 - np) * pk2)).toFixed(4));
        for(i = 0; i < x1.length ; i++){
            xp[i] = [x1[i], p[i]];
            yp[i] = [y1[i], p[i]];
        };
        x1.unshift('x1'); p.unshift('Presion'); y1.unshift('y1');
    window.onload = function(){
        var col1, col2, col3, rown;
        $('#resultado').css('display', 'block');
        $('#temp').attr('value', t); $('#name1').attr('value', name1); $('#name2').attr('value', name2);
        $('#a1').attr('value', a1); $('#b1').attr('value', b1); $('#c1').attr('value', c1);
        $('#a2').attr('value', a2); $('#b2').attr('value', b2); $('#c2').attr('value', c2);
        for(i = 0; i < x1.length ;  i ++){
            col1 = '<td>' + x1[i] + '</td>';
            col2 = '<td>' + p[i] + '</td>';
            col3 = '<td>' + y1[i] + '</td>';
            rown = '<tr>' + col1 + col2 + col3 + '</tr>';
            $('#tabla').append(rown);
        };
        const Paxis = {
            datasets: [{
                label: name1, data: xp, backgroundColor: 'red', borderColor: 'red', showLine: true
            },{
                label: name2, data: yp, backgroundColor: 'blue', borderColor: 'blue', showLine: true
            }]
        };
        const config = {
            type : 'scatter', data: Paxis
        };
        const graph = document.querySelector('#graphline');
        new Chart (graph, config);
        $('.container-title').click(function () {
            $(this).next('.container-description').slideToggle();
        });
    };
};

