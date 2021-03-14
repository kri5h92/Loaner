import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Dashboard from '../components/Dashboard';
import routerGuard from './routerGuards';

export default {
    admin: {
        exact: true,
        path: '/admin/dashboard',
        component: Dashboard,
        guardFuntion: routerGuard.mustBeAuthorized,
        redirectPath: '/'
    },
    signIn: {
        exact: true,
        path: '/',
        component: SignIn,
        guardFuntion: routerGuard.mustBeUnAuthorized,
        redirectPath: '/admin/dashboard'
    },
    signUp: {
        exact: true,
        path: '/signUp',
        component: SignUp,
        guardFuntion: routerGuard.mustBeUnAuthorized,
        redirectPath: '/'
    },
    notFound: {
        redirect: true,
        path: '*',
        to: '/'
    }
}
