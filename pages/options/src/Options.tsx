import '@src/Options.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { themeStorage } from '@extension/storage';
import { Button } from '@extension/ui';

const Options = () => {
  const theme = useStorage(themeStorage);
  const isLight = theme === 'light';
  const logo = isLight ? 'options/logo_horizontal.svg' : 'options/logo_horizontal_dark.svg';
  const goGithubSite = () => chrome.tabs.create({ url: 'https://briehq.com' });

  return (
    <div className={`App ${isLight ? 'bg-slate-50 text-gray-900' : 'bg-gray-800 text-gray-100'}`}>
      <button onClick={goGithubSite}>
        <img src={chrome.runtime.getURL(logo)} className="App-logo" alt="logo" />
      </button>
      <p>
        Edit <code>pages/options/src/Options.tsx</code>
      </p>
      <Button className="mt-4" onClick={themeStorage.toggle} theme={theme}>
        Toggle theme
      </Button>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
