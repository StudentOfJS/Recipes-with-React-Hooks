import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './Header';
import NotFound from './NotFound';
import Loading from './Loading';

const Home = lazy(() => import('./Home'));
const Favorites = lazy(() => import('./Favorites'));

const App = () => (
  <BrowserRouter>
    <main>
      <Header />
      <Switch>
        <Redirect from="/home" to="/" />
        <Suspense maxDuration={800} fallback={<Loading text="loading..." />}>
          <Route path="/favorites" component={Favorites} />
          <Route exact path="/" component={Home} />
        </Suspense>
        <Route component={NotFound} />
      </Switch>
    </main>
  </BrowserRouter>
);

export default App;
