import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './Header';

const Home = lazy(() => import('./Home'));
const Favorites = lazy(() => import('./Favorites'));

const App = () => (
  <BrowserRouter>
    <main>
      <Header />
      <Switch>
        <Suspense
          maxDuration={800}
          fallback={<h3 className="h2">...loading</h3>}
        >
          <Redirect from="/home" to="/" />
          <Route exact path="/" component={Home} />
          <Route path="/favorites" component={Favorites} />
        </Suspense>
      </Switch>
    </main>
  </BrowserRouter>
);

export default App;
