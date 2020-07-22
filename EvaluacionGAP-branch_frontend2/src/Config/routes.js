import Layout from '../Layout/Layout';



import Documentos from '../components/pruebah1'
import AdminUsers from '../components/Crear-User/Admin-User'
import AdminEmpresas from '../components/ADM-Empresas/Admin-empresa'
import Graficos from '../components/Graficos/VisualGrafict'
import UpdateGraficos from '../components/Modify-Grafic/UpdateGrafic'
import SolGap from '../components/Create-SolAGap/Cuestionario'
import ResGap from '../components/Resultados/Result'
//este se debe borrar despues


const routes = [{
        path:'/Home',
        component:Layout,
        exact:false,
        routes:[{
            path:'/Home',
            component:ResGap,
            exact:true
            },{
            path:'/Home/admEmpresas',
            component:AdminEmpresas,
            exact:true
            },{
            path:'/Home/admCuenta',
            component:AdminUsers,
            exact:true
            },
            {
            path:'/Home/Grafico',
            component:Graficos,
            exact:true
            },{
            path:'/Home/UpdateGrafico',
            component:UpdateGraficos,
            exact:true
            },{
            path:'/Home/Cuestionario-Gap',
            component:SolGap,
            exact:true
            },{
            path:'/Home/Resultados-Gap',
            component:ResGap,
            exact:true
            }
            
    ] ,
    }]
export default routes;


