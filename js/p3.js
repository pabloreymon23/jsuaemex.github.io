//Variables de entrada
const A = Number(getParameterByName('A'));
const D = Number(getParameterByName('D'));
const Rel = Number(getParameterByName('Rel'));
const A_ws = Number(getParameterByName('A_ws'));
const A_ww = Number(getParameterByName('A_ww'));
const A_wi = Number(getParameterByName('A_wi'));
const D_xs = Number(getParameterByName('D_xs'));
const D_xw = Number(getParameterByName('D_xw'));
const D_xi = Number(getParameterByName('D_xi'));
var LFI, M, zs_M, zi_M, zw_M, P, R, E, xi_R, xs_R, xw_R, RM, xs_E, xi_E, xw_E, Extraction;
if(A, D, Rel){
    LFI = (Rel / (1 + Rel));
    M = (A + D);
    zs_M = ((A * A_ws + D * D_xs) / M);
    zi_M = ((A * A_wi + D * D_xi) / M);
    zw_M = (1 - zs_M - zi_M);
    P = (M * zi_M * Rel);
    R = (P + M * zi_M);
    E = (M - R);
    xi_R = (M * zi_M / R);
    RM = (zw_M / zs_M);
    xs_R = (LFI / (RM + 1));
    xw_R = (1 - xi_R - xs_R);
    xs_E = ((M * zs_M - R * xs_R) / E);
    xi_E = 0.000;
    xw_E = (1 - xs_E - xi_E);
    Extraction = ((E * xs_E) / (A * A_ws))*100;
    window.onload = function(){
        var col1, col2, col3, col4, col5, i, cx1, cx2, cx3, cx4, cx5, rown;
        $('#resultado').css('display','block');
        $('#A').attr('value', A); $('#A_ws').attr('value', A_ws); $('#A_ww').attr('value', A_ww);
        $('#A_wi').attr('value', A_wi); $('#D').attr('value', D); $('#D_xs').attr('value', D_xs);
        $('#D_xw').attr('value', D_xw); $('#D_xi').attr('value', D_xi); $('#Rel').attr('value', Rel);
        col1 = ['Linea', 'A', 'D', 'R', 'E','Extracción'];
        col2 = ['Cantidad(m)', A.toFixed(4), D.toFixed(4), R.toFixed(4), E.toFixed(4), Extraction.toFixed(4)];
        col3 = ['Fracc. solidos', A_ws.toFixed(4), D_xs.toFixed(4), xs_R.toFixed(4), xs_E.toFixed(4), ''];
        col4 = ['Fracc. Agua', A_ww.toFixed(4), D_xw.toFixed(4), xw_R.toFixed(4), xw_E.toFixed(4),''];
        col5 = ['Fracc. Inerte', A_wi.toFixed(4), D_xi.toFixed(4), xi_R.toFixed(4), xi_E.toFixed(4),''];
        for(i = 0; i < col1.length; i++){
            cx1 = '<td>' + col1[i] + '</td>';
            cx2 = '<td>' + col2[i] + '</td>';
            cx3 = '<td>' + col3[i] + '</td>';
            cx4 = '<td>' + col4[i] + '</td>';
            cx5 = '<td>' + col5[i] + '</td>';
            rown = '<tr>' + cx1 + cx2 + cx3 + cx4 + cx5 + '</tr>';
            $('#tabla').append(rown);
        };
        const Upperline = {
            label: 'Equilibrio', data: [[0,1], [1,0]], backgroundColor: 'gray', 
            borderColor: 'gray', pointRadius: 0, showLine: true, lineBorderWidth: 0.8 
        };
        const LFIline = {
            label: 'Linea LFI', data: [[0,LFI], [LFI, 0]], backgroundColor: 'gray',
            borderColor: 'gray', pointRadius: 0, showLine: true, lineBorderWidth: 0.8
        };
        const DA = {
            label: 'Linea DA', data: [[0,1], [A_ws, A_ww]], backgroundColor: 'green',
            borderColor: 'green', pointRadius: 0, showLine: true, lineBorderWidth: 0.8
        };
        const IE = {
            label: 'Linea IE', data: [[0,0], [xs_E, xw_E]], backgroundColor: 'red',
            borderColor: 'red', pointRadius: 0, showLine: true, lineBorderWidth: 0.8
        };
        const pointA = {
            label: 'A', data: [[A_ws, A_ww]], backgroundColor: 'green', borderColor: 'green', pointRadius: '2'
        };
        const pointM = {
            label: 'M', data: [[zs_M, zw_M]], backgroundColor: 'black', borderColor: 'black', pointRadius: '2'
        };
        const pointR = {
            label: 'R', data: [[xs_R, xw_R]], backgroundColor: 'red', borderColor: 'red', pointRadius: '2'
        };
        const pointE = {
            label: 'E', data: [[xs_E, xw_E]], backgroundColor: 'red', borderColor: 'red', pointRadius: '2'
        };
        const config = {
            type: 'scatter',
            data: {
                datasets: [Upperline, LFIline, DA, IE, pointA, pointM, pointR, pointE]
            }
        };
        const graph = document.querySelector('#graphline');
        new Chart (graph, config);
        $('.container-title').click(function () {
            $(this).next('.container-description').slideToggle();
        });
    };
};