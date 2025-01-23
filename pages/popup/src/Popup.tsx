import '@src/Popup.css';
import { useState } from 'react';

import { withErrorBoundary, withSuspense } from '@extension/shared';
import { store, ReduxProvider } from '@extension/store';

import { SlicesHistoryButton, SlicesHistoryContent } from './components/slices-history';
import { CaptureScreenshotButton } from './components/capture';
import { Header, BetaNotifier } from './components/ui';

const Popup = () => {
  const [showSlicesHistory, setShowSlicesHistory] = useState(false);

  const handleOnBack = () => setShowSlicesHistory(false);
  const handleOnDeleteAll = () => {
    // Handle delete all logic
    console.log('All slices deleted');
  };
  const handleOnDelete = (id: string) => {
    // Handle delete all logic
    console.log('All slices deleted');
  };

  return (
    <ReduxProvider store={store}>
      <div className="light bg-background relative px-5 pb-5 pt-4">
        {showSlicesHistory ? (
          <SlicesHistoryContent onBack={handleOnBack} onDelete={handleOnDelete} onDeleteAll={handleOnDeleteAll} />
        ) : (
          <>
            <Header />
            <CaptureScreenshotButton />
            <SlicesHistoryButton onClick={() => setShowSlicesHistory(true)} />
            <BetaNotifier />
          </>
        )}
      </div>
    </ReduxProvider>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div>Loading...</div>), <div>Error Occurred</div>);
