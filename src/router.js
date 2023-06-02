import { HashRouter, Switch, Route } from 'react-router-dom';
import BrowserHeader from 'src/views/browserHeader';
import SearchBar from 'src/views/searchBar';
import Blank from 'src/views/blank';

function Container() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={BrowserHeader} />
        <Route exact path='/search-bar' component={SearchBar} />
        <Route exact path='/blank' component={Blank} />
      </Switch>
    </HashRouter>
  );
}

export default Container;
