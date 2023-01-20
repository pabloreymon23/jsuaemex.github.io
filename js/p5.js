//Variables de entrada
const B = Number(getParameterByName('B'));
const X = Number(getParameterByName('X'));
const Ti = Number(getParameterByName('Ti'));
const P = Number(getParameterByName('P'));
const k = Number(getParameterByName('k'));
const Tk = Number(getParameterByName('Tk'));
const Ea = Number(getParameterByName('Ea'));
const R1 = 0.73
const R2 = 1.987
const yA0 = 1;
const eps = 1;
const L = 40;
const As = 0.0205;
var FA0, KT, CA0, n = [], h, xa_n = [], i, op, x, rate, dV, k1, k2, k3, k4, v = 0, t = 39, longitud = [], CA = [], CC = [], xdata = [], Adata = [], Cdata = [], rxn;
if(B, X, k){
    FA0 = B / X;
    KT = k * Math.exp(((Ea * 1000) / R2) * (1 / Tk - 1/ Ti));
    CA0 = (yA0 * P) / (R1 * 1.8 * Ti);
    n = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    h = X / (n.length - 1);
    function rungekutta(x){
        rate = KT * CA0 * ((1 - x) / (1 + eps * x));
        dV = FA0 / rate;
        return {dV, rate};
    };
    for(i = 0; i < n.length; i++){
        xa_n[i] = h * i;
        k1 = h * rungekutta(xa_n[i]).dV;
        k2 = h * rungekutta(xa_n[i] + h / 2).dV;
        k3 = h * rungekutta(xa_n[i] + h / 2).dV;
        k4 = h * rungekutta(xa_n[i] + h).dV;
        v += (1/6) * (k1 + (2 * k2) + (2 * k3) + k4);
        longitud[i] = (v / (As * t)).toFixed(4);
        CA[i] = CA0 * (1 - xa_n[i]) / (1 + eps * xa_n[i]);
        CC[i] = CA0 * (xa_n[i]) / (1 + eps * xa_n[i]);
        xdata[i] = [longitud[i], xa_n[i].toFixed(4)];
        Adata[i] = [longitud[i], CA[i].toFixed(4)];
        Cdata[i] = [longitud[i], CC[i].toFixed(4)];
        console.log(k1);
        if(v >= 80)  break;
    };
    rxn = KT * CA[n.length];
    t= Math.ceil(v / (As * L));
    window.onload = function(){
        var report, reportx, col1, col2, rown;
        $('#resultado').css('display', 'block');
        $('#B').attr('value', B); $('#X').attr('value', X); $('#Ti').attr('value', Ti); $('#P').attr('value', P);
        $('#k').attr('value', k); $('#Tk').attr('value', Tk); $('#Ea').attr('value', Ea);
        report = [' ', 'FB', 'FA0', 'X', 'k', 'k(T)', 'T', 'V', 'No. tubos', 'rate'];
        reportx = ['Reporte de Datos', B.toFixed(4), FA0.toFixed(4), X.toFixed(4), k.toFixed(4), KT.toFixed(4), Ti.toFixed(4), v.toFixed(4), t.toFixed(4), rate.toFixed(4)];
        for(i = 0; i < report.length; i++){
            col1 = '<td>' + report[i] + '</td>';
            col2 = '<td>' + reportx[i] + '</td>';
            rown = '<tr>' + col1 + col2 + '</tr>';
            $('#matriz').append(rown);
        };
        const axis = {
            datasets: [{
                label: 'X', data: xdata, backgroundColor: 'blue', borderColor: 'blue', showLine: true, lineBorderWidth: 0.8, pointRadius: '1'
            },{
                label: 'CA', data: Adata, backgroundColor: 'red', borderColor: 'red', showLine: true, lineBorderWidth: 0.8, pointRadius: '1'
            }, {
                label: 'CB', data: Cdata, backgroundColor: 'green', borderColor: 'green', showLine: true, lineBorderWidth: 0.8, pointRadius: '1'
            }]
        };
        const config = {
            type: 'scatter', data: axis
        };
        const graph = document.querySelector('#graphline');
        new Chart (graph, config);
        $('.container-title').click(function () {
            $(this).next('.container-description').slideToggle();
        });
    };   
};