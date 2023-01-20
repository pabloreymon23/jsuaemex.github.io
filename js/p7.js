//Variables de entrada
const G = Number(getParameterByName('G'));
const ya1 = Number(getParameterByName('ya1'));
const ya2 = Number(getParameterByName('ya2'));
const L = Number(getParameterByName('L'));
const xa2 = Number(getParameterByName('xa2'));
const kya = Number(getParameterByName('kya'));
const kxa = Number(getParameterByName('kxa'));
const H = Number(getParameterByName('H'));
const s = Number(getParameterByName('s'));
var YA1, YA2, XA2, XA1, xa1, PQ, n = [], x_n, xa_n = [], i, op, xai, yai, xas, yas, PQs, G1, G2, Gprom;
var y_A, y_Ai, y_As, y_AM, R, ya_n = [], ma_n, mai_n, yai_n = [], rya = [], inya = [], salto = [], h_ya = [];
var suma, variacion, Z, Zreal, matrix_h = [], matrix_d = [];
if(G,L,ya1){
    YA1 = ya1 / (1 - ya1);
    YA2 = ya2 / (1 - ya2);
    XA2 = xa2 / (1 - xa2);
    XA1 = ((G * (YA1 - YA2) + L * XA2) / L);
    xa1 = XA1 / (1 - XA1);
    PQ = [[xa2, ya2], [xa1, ya1]];
    xai = ((kya * ya1) + (kxa * xa1)) / ((kxa * H) + kya);
    yai = H * xai;
    xas = ((kya * ya2) + (kxa * xa2)) / ((kxa * H) + kya);
    yas = H * xas;
    PQs = [[xas, yas], [xai, yai]];
    G1 = G / (1 - ya1);
    G2 = G / (1 - ya2);
    Gprom = (G1 + G2) / 2;
    y_A = ((1 - ya1) + (1 - ya2)) / 2;
    y_Ai = ((1- ya1) - (1 - yai)) / (Math.log((1 - ya1) / (1 - yai)));
    y_As = ((1- ya2) - (1 - yas)) / (Math.log((1 - ya2) / (1 - yas)));
    y_AM = (y_Ai + y_As) / 2;
    R = (G * y_AM) / (kya * s * y_A * 3600);
    ma_n = (ya2 - ya1) / (xa2 - xa1);
    mai_n = (yai - yas) / xa1;
    salto = [1, 2, 2, 2, 2, 1];
    n = [0, 1, 2, 3, 4, 5];
    x_n = xa1 / 5;
    for(i = 0; i < n.length; i++){
        xa_n[i] = (x_n * i).toFixed(4);
        ya_n[i] = (ma_n * xa_n[i] + ya2).toFixed(4);
        yai_n[i] = (mai_n * xa_n[i] + yas).toFixed(4);
        rya[i] = (ya_n[i] - yai_n[i]).toFixed(4);
        inya[i] = (1 / rya[i]).toFixed(4);
        h_ya[i] = salto[i] * inya[i];
    };
    suma = h_ya.reduce((w,z) => w + z, 0);
    variacion = (ya1 - ya2) / (2 * 5);
    Z = R * variacion * suma;
    Zreal = 1.2 * Z;
    matrix_h = [' ','G', 'ya1', 'ya2', 'L', 'xa1', 'xa2', 's', 'Z', 'Z Real', 'suma h * y'];
    matrix_d = ['Resumen general', G.toFixed(4), ya1.toFixed(4), ya2.toFixed(4), L.toFixed(4), xa1.toFixed(4), xa2.toFixed(4), s.toFixed(4), Z.toFixed(4), Zreal.toFixed(4), suma.toFixed(4)];
    n.unshift('n'), xa_n.unshift('xA'), ya_n.unshift('yA'), yai_n.unshift('yAi'), rya.unshift('yA - yAi'), inya.unshift('1/(yA - yAi)'), salto.unshift('h'), h_ya.unshift('h * yA');
    window.onload = function(){
        var col1, col2, col3, col4, col5, col6, col7, col8, col9, rown, rown1;
        $('#resultado').css('display', 'block');
        $('#G').attr('value', G); $('#ya1').attr('value', ya1); $('#ya2').attr('value', ya2);
        $('#L').attr('value', L); $('#xa2').attr('value', xa2);
        $('#kya').attr('value', kya); $('#kxa').attr('value', kxa); $('#H').attr('value', H); $('#s').attr('value', s);
        for(i = 0; i < matrix_h.length; i++){
            col1 = '<td>' + matrix_h[i] + '</td>';
            col2 = '<td>' + matrix_d[i] + '</td>';
            rown = '<tr>' + col1 + col2 + '</tr>';
            $('#matriz').append(rown);
        };
        for(i = 0; i < n.length; i++){
            col3 = '<td>' + n[i] + '</td>';
            col4 = '<td>' + xa_n[i] + '</td>';
            col5 = '<td>' + ya_n[i] + '</td>';
            col6 = '<td>' + rya[i] + '</td>';
            col7 = '<td>' + inya[i] + '</td>';
            col8 = '<td>' + salto[i] + '</td>';
            col9 = '<td>' + h_ya[i] + '</td>';
            rown1 = '<tr>' + col3 + col4 + col5 + col6 + col7 + col8 + col9 + '</tr>';
            $('#tabla').append(rown1);
        };
        const axis = {
            datasets: [{
                label: 'Linea de Equilibrio', data: [[0, 0], [0.03, H * 0.03]], backgroundColor: 'red',
                borderColor: 'red', showLine: true, lineBorderWidth: 0.8
            }, {
                label: 'PQ', data: PQ, backgroundColor: 'green', borderColor: 'green', showLine: true, lineBorderWidth: 0.8
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