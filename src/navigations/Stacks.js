import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../hooks/useAuth';
import About from '../screens/About';
import Blog from '../screens/Blog';
import Checkout from '../screens/Checkout';
import Faq from '../screens/Faq';
import Landing from '../screens/Landing';
import Login from '../screens/Login';
import Message from '../screens/Message';
import Midtrans from '../screens/Midtrans';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Product from '../screens/Product';
import Products from '../screens/Products';
import Promos from '../screens/Promos';
import Register from '../screens/Register';
import TermsConditions from '../screens/TermsConditions';
import Transaction from '../screens/Transaction';
import TransactionsHistory from '../screens/TransactionsHistory';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator();

const Auth = () => null;

const Stacks = () => {
  const auth = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!auth.user && <Stack.Screen name="Landing" component={Landing} />}

      {!auth.user && <Stack.Screen name="Login" component={Login} />}

      {!auth.user && <Stack.Screen name="Register" component={Register} />}

      {auth.user === 'authenticating' && (
        <Stack.Screen name="Auth" component={Auth} />
      )}

      {auth.user?.role === 'user' && (
        <Stack.Screen name="Main" component={Tabs.User} />
      )}

      {auth.user?.role === 'user' && (
        <Stack.Screen name="Promos" component={Promos} />
      )}

      {auth.user?.role === 'user' && (
        <Stack.Screen name="Products" component={Products} />
      )}

      {auth.user?.role === 'user' && (
        <Stack.Screen name="Product" component={Product} />
      )}

      {auth.user?.role === 'user' && (
        <Stack.Screen name="Checkout" component={Checkout} />
      )}

      {auth.user?.role === 'user' && (
        <Stack.Screen name="Midtrans" component={Midtrans} />
      )}

      {auth.user?.role === 'user' && (
        <Stack.Screen name="Message" component={Message} />
      )}

      {auth.user?.role === 'user' && (
        <Stack.Screen name="Transaction" component={Transaction} />
      )}

      {auth.user?.role === 'user' && (
        <Stack.Screen
          name="TransactionsHistory"
          component={TransactionsHistory}
        />
      )}

      {auth.user?.role === 'admin' && (
        <Stack.Screen name="Main" component={Tabs.Admin} />
      )}

      {auth.user?.role === 'admin' && (
        <Stack.Screen name="Message" component={Message} />
      )}

      <Stack.Screen name="FAQ" component={Faq} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Blog" component={Blog} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
    </Stack.Navigator>
  );
};

export default Stacks;
