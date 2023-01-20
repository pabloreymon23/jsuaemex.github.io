//Variables de entrada
const FA0 = Number(getParameterByName('FA0'));
const X = Number(getParameterByName('X'));
const k = Number(getParameterByName('k'));
const P0 = Number(getParameterByName('P0'));
const phi = Number(getParameterByName('phi'));
const rho = Number(getParameterByName('rho'));
const DI = Number(getParameterByName('DI'));
const t = Number(getParameterByName('t'));
var FB0, FI0, FT0, yA0, delta= - 0.5, epsilon, PA0, ki, mA0, mB0, mI0, mT0, Ac, G, beta = 0.0775, alpha;
var n = [], h, xa_n = [], i, x, w, y, rate, dW, k1, k2, k3, k4, W = 0, Xdata =[], PA = [], PC = [], Adata = [], Cdata = [];
if(FA0, X, k, P0){
    FB0 = (1 / 2) * FA0;
    FI0 = FB0 * (0.79 / 0.21);
    FT0 = FA0 + FB0 + FI0;
    yA0 = FA0 / FT0;
    epsilon = yA0 * delta;
    PA0 = yA0 * P0;
    ki = 0.63 * k * PA0;
    mA0 = FA0 * 28;
    mB0 = FB0 * 32;
    mI0 = FI0 * 28;
    mT0 = mA0 + mB0 + mI0;
    Ac = (1 / 4) * (Math.PI) * (DI ** 2);
    alpha = (2 * beta) / (Ac * (1 -phi) * rho * P0);
    function rungekutta(x,w){
        y = (1- alpha * w) ** (0.5);
        rate = ki *((1 - x) / (1 + epsilon * x)) * y;
        dW = FA0 /rate ;
        return {dW, rate};
    };
    n = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    h = X / (n.length - 1);
    for(i = 0; i < n.length; i++){
        xa_n[i] = h * i;
        k1 = h * rungekutta(xa_n[i], W).dW;
        k2 = h * rungekutta((xa_n[i] + (h/ 2)), (W + (k1 / 2))).dW;
        k3 = h * rungekutta((xa_n[i] + (h/ 2)), (W + (k2 / 2))).dW;
        k4 = h * rungekutta((xa_n[i] + h), (W + k3)).dW;
        W += (1/6) * (k1 + (2 * k2) + (2 * k3) + k4);
        PA[i] = PA0 * ((1 - xa_n[i]) / (1 + epsilon * xa_n[i]));
        PC[i] = (PA0 * xa_n[i]) / (1 + epsilon * xa_n[i]);
        Xdata[i] = [W.toFixed(4), xa_n[i].toFixed(4)];
        Adata[i] = [W.toFixed(4), PA[i].toFixed(4)];
        Cdata[i] = [W.toFixed(4), PC[i].toFixed(4)];
    };
    window.onload = function(){
        var report, reportx, col1, col2, rown;
        $('#resultado').css('display', 'block');
        $('#FA0').attr('value', FA0); $('#X').attr('value', X); $('#k').attr('value', k); $('#P0').attr('value', P0);
        $('#phi').attr('value', phi); $('#rho').attr('value', rho); $('#DI').attr('value', DI); $('#t').attr('value', t);
        report = [' ', 'FA0', 'k', "k'", 'X', 'PA0', 'a', 'eps', 'rate', 'W (por tubo)', 'W (total)'];
        reportx = ['Resultados obtenidos', FA0.toFixed(4), k.toFixed(4), ki.toFixed(4), X.toFixed(4), PA0.toFixed(4), alpha.toFixed(4), epsilon.toFixed(4), rate.toFixed(4), W.toFixed(4), (W * t).toFixed(4)];
        for(i = 0; i < report.length; i++){
            col1 = '<td>' + report[i] + '</td>';
            col2 = '<td>' + reportx[i] + '</td>';
            rown = '<tr>' + col1 + col2 + '</tr>';
            $('#matriz').append(rown);
        };
        const axis = {
            datasets: [{
                label: 'X', data: Xdata, backgroundColor: 'blue', borderColor: 'blue', showLine: true, lineBorderWidth: 0.8, pointRadius: '1'
            }, {
                label: 'PA', data: Adata, backgroundColor: 'red', borderColor: 'red', showLine: true, lineBorderWidth: 0.8, pointRadius: '1'
            }, {
                label: 'PC', data: Cdata, backgroundColor: 'orange', borderColor: 'orange', showLine: true, lineBorderWidth: 0.8, pointRadius: '1'
            }]
        };
        const config = {
            type : 'scatter', data: axis
        };
        const graph = document.querySelector('#graphline');
        new Chart (graph, config);
        $('.container-title').click(function () {
            $(this).next('.container-description').slideToggle();
        });
    };
};