import { HashRouter, Switch, Route } from 'react-router-dom';
import BrowserHeader from 'src/views/browserHeader';
import SearchBar from 'src/views/searchBar';
import Blank from 'src/views/blank';

function Container() {
  return (
    <HashRouter>
      <Switch>
        <Route path='/' component={BrowserHeader} />
        <Route path='/search-bar' component={SearchBar} />
        <Route path='/blank' component={Blank} />
      </Switch>
    </HashRouter>
  );
}

export default Container;
