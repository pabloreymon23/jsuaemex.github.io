//Variables de entrada
const flow = Number(getParameterByName('flow'));
const type = String(getParameterByName('type'));
const fName1 = String(getParameterByName('flow1name'));
const t1 = Number(getParameterByName('t1'));
const t2 = Number(getParameterByName('t2'));
const cp = Number(getParameterByName('cp'));
const GE1 = Number(getParameterByName('GE1'));
const mu1 = Number(getParameterByName('mu1'));
const k1 = Number(getParameterByName('k1'));
const fName2 = String(getParameterByName('flow2name'));
const T1 = Number(getParameterByName('T1'));
const T2 = Number(getParameterByName('T2'));
const CP = Number(getParameterByName('CP'));
const GE2 = Number(getParameterByName('GE2'));
const mu2 = Number(getParameterByName('mu2'));
const k2 = Number(getParameterByName('k2'));
const fo = Number(getParameterByName('fo'));
const dp = Number(getParameterByName('dp'));
const lg = Number(getParameterByName('lg'));
const DI = Number(getParameterByName('DI'));
const di = Number(getParameterByName('di'));
const de = Number(getParameterByName('de'));
const sl = Number(getParameterByName('sl'));
const JH_a = Number(getParameterByName('JH_a'));
const JH_p = Number(getParameterByName('JH_p'));
var flow2, MDLT, W, w, Q, D1, D2, Deq, D, a_a, a_p, G_a, G_p, Re_a,Re_p, GE_a, GE_p, x_a, x_p, h_a, h_p, h_po, Uc, Ud, A, Long, n, sm,  ss, Udi, Rd;
var Re_ca, f_a, f_p, v_a, F_a, dF_a, dP_a, dF_p, dP_p;
var gen1 = ['Flujo Principal', 't1','t2', 'tprom', 'T1', 'T2', 'Tprom', 'Flujo secundario', 'MDLT'];
var des1 = ['Tabla de datos', 'Coef. Total limpio (Uc)','Coef. Total diseño (Ud)', 'Rd requerido', 'Superficie (ft<sup>2</sup>)','L requerida (ft)','No. de horquillas', 'Ud corregido', 'Rd corregido'];
var dat1 = ['Tipo de dato', 'Área de flujo (ft<sup>2</sup>)','Vel. masa (lb/h*ft<sup>2</sup>)','No de Reynolds','Factor de Trans. Calor', 'Pr<sup>1/3</sup','Coef. de Trans. de Calor','Factor Fricción', 'Caida de Presión (lb / in<sup>2</sup>)'];
var gen2, des2, dat2, dat3, tt1, tt2, ttprom, tT1, tT2, tTprom, i, col1, col2, col3, col4, col5, col6, col7, rown1, rown2, rown3;
$(document).ready(function(){
    $('#t1,#t2,#T1,#T2').on('input', function(){
        tt1 = Number($('#t1').val());
        tt2 = Number($('#t2').val());
        ttprom = ((tt1 + tt2)/2);
        $('#tprom').html(ttprom);
        tT1 = Number($('#T1').val());
        tT2 = Number($('#T2').val());
        tTprom = ((tT1 + tT2)/2);
        $('#Tprom').html(tTprom);
    });
    MDLT = ((T1 - t2) - (T2 - t1)) / (Math.log((T1 - t2) / (T2 - t1)));
    if(type == 'frio'){
        w = flow;
        Q = w * cp * (t2 - t1);
        W = Q / (CP * (T1 - T2));
        flow2 = W;
    } else if ( type == 'caliente'){
        W = flow;
        Q = W * CP * (T1 - T2);
        w = Q / (cp * (t2 - t1));
        flow2 = w;
    }
    D2 = DI / 12;
    D1 = de / 12;
    a_a = ((Math.PI)*(D2**2 - D1**2)/4).toFixed(5);
    Deq = ((D2**2 - D1**2) / D1).toFixed(5);
    D = di / 12;
    a_p = ((Math.PI)* (D**2) / 4).toFixed(5);
    if(w > W){
        G_a = W / a_a;
        Re_a = ((Deq * G_a) / (mu2 * 2.42));
        x_a = ((CP * (mu2 * 2.42)) / k2)**(1 / 3);
        h_a = JH_a * (k2 / Deq) * x_a;
        G_p = w / a_p;
        Re_p = ((D * G_p) / (mu1 * 2.42));
        x_p = ((cp * (mu1 * 2.42)) / k1)**(1 / 3);
        h_p = (JH_p * (k1 / D) * x_p );
        h_po = h_p * (di / de);
        Re_ca = ((D2 - D1) * G_a )  / (mu2 * 2.42);
        f_a = 0.0035 + (0.264 / (Re_ca ** 0.42));
        v_a = G_a / (3600 * GE2 * 62.5);
        GE_a = (GE2 * 62.5);
        GE_p = (GE1 * 62.5)
    }else if ( W > w){
        G_a = w / a_a;
        Re_a = ((Deq * G_a) / (mu1 * 2.42));
        x_a = ((cp * (mu1 * 2.42)) / k1)**(1 / 3);
        h_a = JH_a * (k1 / Deq) * x_a;
        G_p = W / a_p;
        Re_p = ((D * G_p) / (mu2 * 2.42));
        x_p = ((CP * (mu2 * 2.42)) / k2)**(1 / 3);
        h_p = (JH_p * (k2 / D) * x_p );
        Re_ca = ((D2 - D1) * G_a )  / (mu1 * 2.42);
        f_a = 0.0035 + (0.264 / (Re_ca ** 0.42));
        v_a = G_a / (3600 * GE1 * 62.5);
        GE_a = (GE1 * 62.5);
        GE_p = (GE2 * 62.5);
    };
    Uc = (h_po * h_a) / (h_po + h_a);
    Ud = 1 / ((1 / Uc) + fo);
    A = Q / (Ud * MDLT);
    Long = A / sl;
    n = Math.ceil(Long / (2 * lg));
    sm = 2 * n * lg;
    ss = sm * sl;
    Udi = Q / (ss * MDLT);
    Rd = (Uc - Udi) / (Uc * Udi);
    F_a = (3 * (v_a ** 2) / (2 * 32.2));
    dF_a = ((4 * f_a * (G_a ** 2) * sm)/ (2 * (4.18e08) * (GE_a ** 2) * (D2 - D1)));
    dP_a = ((dF_a + F_a) * GE_a) / 144;
    f_p = 0.0035 + (0.264 / (Re_p ** 0.42));
    dF_p = ((4 * f_p * (G_p ** 2) * sm)/ (2 * (4.18e08) * (GE_p ** 2) * D));
    dP_p = (dF_p * GE_p) / 144;
    $('#DI,#di,#de, #sl').on('input', function(){
        $('#Re_a').html(Re_a); $('#Re_p').html(Re_p);
    });
    gen2 = [flow, t1, t2, ((t1 + t2)/2), T1, T2, ((T1 + T2)/2), (flow2).toFixed(5), (MDLT).toFixed(5)];
    des2 = ['Parámetros de diseño', (Uc).toFixed(4), (Ud).toFixed(4), fo, (A).toFixed(4), (Long).toFixed(4), n, (Udi).toFixed(4), (Rd).toFixed(4) ];
    dat2 = ['Anulo', a_a, (G_a).toFixed(5), (Re_a).toFixed(5), JH_a, (x_a).toFixed(5), (h_a).toFixed(5), (f_a).toFixed(5), (dP_a).toFixed(5)];
    dat3 = ['Tubo Interior', a_p, (G_p).toFixed(5), (Re_p).toFixed(5), JH_p, (x_p).toFixed(5), (h_po).toFixed(5), (f_p).toFixed(5), (dP_p).toFixed(5)];
});
if(flow, fName1, fName2){
    window.onload = function(){ 
        $('#resultado').css('display','block');
        $('#flow').attr('value',flow);
            if(type == 'frio'){
                $('#frio').attr('selected','selected');
            }else{
                $('#caliente').attr('selected', 'selected');
            };
        $('#flow1name').attr('value', fName1); $('#t1').attr('value', t1); $('#t2').attr('value', t2); $('#cp').attr('value', cp);
        $('#GE1').attr('value', GE1); $('#mu1').attr('value', mu1); $('#k1').attr('value', k1);
        $('#flow2name').attr('value', fName2); $('#T1').attr('value', T1); $('#T2').attr('value', T2); $('#CP').attr('value', CP);
        $('#GE2').attr('value', GE2); $('#mu2').attr('value', mu2); $('#k2').attr('value', k2);
        $('#fo').attr('value', fo); $('#dp').attr('value', dp); $('#lg').attr('value', lg); $('#DI').attr('value', DI); $('#di').attr('value', di);
        $('#de').attr('value', de); $('#sl').attr('value', sl); $('#JH_a').attr('value', JH_a); $('#JH_p').attr('value', JH_p);
        for(i=0; i< gen1.length; i++){
            col1 = '<td>'+gen1[i]+'</td>';
            col2 = '<td>'+gen2[i]+'</td>';
            rown1 = '<tr>'+col1+col2+'</tr>';
            col3 = '<td>'+des1[i]+'</td>';
            col4 = '<td>'+des2[i]+'</td>';
            rown2 = '<tr>'+col3+col4+'</tr>';
            col5 = '<td>'+dat1[i]+'</td>';
            col6 = '<td>'+dat2[i]+'</td>';
            col7 = '<td>'+dat3[i]+'</td>';
            rown3 = '<tr>'+col5+col6+col7+'</tr>';
            $('.general-d').append(rown1);
            $('.design').append(rown2);
            $('.flow-des').append(rown3);
        };
        $('.container-title').click(function () {
            $(this).next('.container-description').slideToggle();
        });
    };
};