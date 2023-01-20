//Variables de entrada
const A = Number(getParameterByName('A'));
const D = Number(getParameterByName('D'));
const Rel = Number(getParameterByName('Rel'));
const grade =  Number(getParameterByName('grade'));
const A_ws = Number(getParameterByName('A_ws'));
const A_wi = Number(getParameterByName('A_wi'));
const A_ww = Number(getParameterByName('A_ww'));
const D_xs = Number(getParameterByName('D_xs'));
const D_xi = Number(getParameterByName('D_xi'));
const D_xw = Number(getParameterByName('D_xw'));
var M, M_zs, M_zi, zs_M, zi_M, zw_M, IM, xs_R, xw_R, xi_R, R, E, xs_E,xw_E, E_Total = 0, W_Total = 0,ET_totales = 0, conversion = 0;
var Etapa = [], Arr_M = [], Arr_zsM = [], Arr_ziM = [], Arr_zwM = [], Arr_R = [], Arr_xsR = [], Arr_xiR = [], Arr_xwR = [], Arr_E = [], Arr_xsE = [], Arr_xwE = [];
var Arr_Etot = [], Arr_Conv = [], ET_solidos, ET_agua, PuntoM = [], PuntoR = [], PuntoE =[], LineaE = [] , LineaR = [] ; 
var n = 0, c, g, w = 0;
if(A,D, grade){
    const LFI = Rel / (1 + Rel);
    const mLFI = (0 - LFI) / (1 - 0);
    const ws_A = A * A_ws;
    do{
        if(n === 0){
            M = A + D;
            zs_M = (A * A_ws + D * D_xs) / M;
            zi_M = (A * A_wi + D * D_xi) / M;
        }else{
            M = R + D;
            zs_M = (R * xs_R) / M;
            zi_M = (R * xi_R) / M;
        }
        zw_M = 1 - zs_M - zi_M;
        IM = (zw_M - 0) / (zs_M - 0);
        xs_R = (-mLFI) / (IM - mLFI);
        xw_R = (IM * xs_R);
        xi_R = 1 - xs_R - xw_R;
        R = (M * zi_M) / xi_R;
        E = (M - R);
        xs_E = (M * zs_M - R * xs_R) / E;
        xw_E = 1 - xs_E;
        E_Total += E * xs_E;
        W_Total += E * xw_E;
        ET_totales += E;
        conversion = E_Total / ws_A;
        c = n +1;
        Etapa[n] = c;
        Arr_M[n] = M.toFixed(4);
        Arr_zsM[n] = zs_M.toFixed(4);
        Arr_ziM[n] = zi_M.toFixed(4);
        Arr_zwM[n] = zw_M.toFixed(4);
        Arr_R[n] = R.toFixed(4);
        Arr_xsR[n] = xs_R.toFixed(4);
        Arr_xiR[n] = xi_R.toFixed(4);
        Arr_xwR[n] = xw_R.toFixed(4);
        Arr_E[n] = E.toFixed(4);
        Arr_xsE[n] = xs_E.toFixed(4);
        Arr_xwE[n] = xw_E.toFixed(4);
        Arr_Etot[n] = E_Total.toFixed(4);
        Arr_Conv[n] = conversion.toFixed(4);
        PuntoM[n] = [zs_M.toFixed(4), zw_M.toFixed(4)];
        PuntoR[n] = [xs_R.toFixed(4), xw_R.toFixed(4)];
        PuntoE[n] = [xs_E.toFixed(4), xw_E.toFixed(4)];
        n++;
        if(conversion >= grade) break;
    }while(n < 100);
    ET_solidos = E_Total / ET_totales;
    ET_agua = 1 - ET_solidos;
    LineaE.length = (2 * Arr_M.length);
    LineaR.length = (2 * Arr_M.length);
    for(g = 0; g < LineaE.length; g++){
        LineaE[g] = [0, 0];
        LineaR[g] = [0, 1];
    };
    for(g = -1; g < (LineaE.length - 1); w++ ){
        g = g + 2;
        LineaE[g] = [Arr_xsE[w], Arr_xwE[w]];
        LineaR[g] = [Arr_xsR[w], Arr_xwR[w]];
    };
    Etapa.unshift('Etapa'); Arr_M.unshift('Cantidad en M'); Arr_zsM.unshift('zsM');
    Arr_ziM.unshift('ziM'); Arr_zwM.unshift('zwM'); Arr_R.unshift('Cantidad en R'); Arr_xsR.unshift('xsR');
    Arr_xiR.unshift('xiR'); Arr_xwR.unshift('xwR'); Arr_E.unshift('Cantidad en E'); Arr_xsE.unshift('xsE');
    Arr_xwE.unshift('xwE'); Arr_Etot.unshift('Total de solidos en E');Arr_Conv.unshift('Conversión');
    window.onload = function(){
        var Matrix, i, j, row, cell, txt_cell, col1, col2, col3, col4, col5, cx1, cx2, cx3, cx4, cx5, rown;
        Matrix = [Etapa, Arr_M, Arr_zsM, Arr_ziM, Arr_zwM, Arr_R, Arr_xsR, Arr_xiR, Arr_xwR, Arr_E, Arr_xsE, Arr_xwE, Arr_Etot, Arr_Conv];
        $('#resultado').css('display', 'block');
        $('#A').attr('value',A); $('#A_ws').attr('value', A_ws); $('#A_ww').attr('value', A_ww); $('#A_wi').attr('value', A_wi);
        $('#D').attr('value', D); $('#D_xs').attr('value', D_xs); $('#D_xw').attr('value', D_xw); $('#D_xi').attr('value', D_xi);
        $('#Rel').attr('value', Rel); $('#grade').attr('value', grade);
        for(i = 0; i < Matrix.length; i++){
            row = document.createElement('tr');
            for(j = 0; j < Matrix[i].length; j++){
                cell = document.createElement('td');
                txt_cell = document.createTextNode(Matrix[i][j]);
                cell.appendChild(txt_cell);
                row.appendChild(cell);
            }
            $('#matriz').append(row);
        };
        col1 = ['Linea', 'A', 'D', 'R', 'E (ultima línea)', 'E Total']
        col2 = ['Cantidad(m)', A.toFixed(4), D.toFixed(4), R.toFixed(4), E.toFixed(4), ET_totales.toFixed(4)];
        col3 = ['Fracc. Sólidos', A_ws.toFixed(4), D_xs.toFixed(4), xs_R.toFixed(4), xs_E.toFixed(4), ET_solidos.toFixed(4)];
        col4 = ['Fracc. Agua', A_ww.toFixed(4), D_xw.toFixed(4), xw_R.toFixed(4), xw_E.toFixed(4), ET_agua.toFixed(4)];
        col5 = ['Fracc. Inerte(s)', A_wi.toFixed(4), D_xi.toFixed(4), xi_R.toFixed(4), '0.000', '0.000'];
        for(i = 0; i < col1.length; i++){
            cx1 = '<td>' + col1[i] +'</td>';
            cx2 = '<td>' + col2[i] + '</td>';
            cx3 = '<td>' + col3[i] + '</td>';
            cx4 = '<td>' + col4[i] + '</td>';
            cx5 = '<td>' + col5[i] + '</td>';
            rown = '<tr>' + cx1 + cx2 + cx3 + cx4 + cx5 +'</tr>';
                $('#tabla').append(rown);
        };
        const Upperline = {
            label: 'Equilibrio', data: [[0, 1], [1, 0]], backgroundColor: 'gray', borderColor: 'gray',
            pointRadius: '0', showLine: true, lineBorderWidth: 0.8
        };
        const LFIline = {
            label: 'Linea LFI', data: [[0, LFI], [1, 0]], backgroundColor: 'gray', borderColor: 'gray',
            pointRadius: '0', showLine: true, lineBorderWidth: 0.8
        };
        const DA = {
            label: 'Linea DA', data: [[0, 1], [A_ws, A_ww]], backgroundColor: 'green', borderColor: 'green',
            pointRadius: '0', showLine: true, lineBorderWidth: 0.8
        };
        const IE = {
            label: 'Linea de Extracto', data: LineaE, backgroundColor: 'red', borderColor: 'red',
            pointRadius: '0', showLine: true, lineBorderWidth: 0.8
        };
        const DE = {
            label: 'Linea de Refinado', data: LineaR, backgroundColor: 'blue', borderColor: 'blue',
            pointRadius: '0', showLine: true, lineBorderWidth: 0.8
        };
        const PointM = {
            label: 'Mezcla', data: PuntoM, backgroundColor: 'black', borderColor: 'black', pointRadius: '2'
        };
        const PointE = {
            label: 'Extracto', data: PuntoE, backgroundColor: 'black', borderColor: 'black', pointRadius: '2'
        };
        const PointR = {
            label: 'Refinado', data: PuntoR, backgroundColor: 'black', borderColor: 'black', pointRadius: '2'
        }
        const config = {
            type: 'scatter',
            data: {
                datasets: [Upperline, LFIline, DA, IE, DE, PointM, PointE, PointR]}
        };
        const graph = document.querySelector('#graphline');
        new Chart (graph, config);
        $('.container-title').click(function () {
            $(this).next('.container-description').slideToggle();
        });
    };
};