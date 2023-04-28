import {
  PipeableStream,
  RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';

import App from '../App';
import { store } from '../redux/store';

export function render(url: string, options?: RenderToPipeableStreamOptions): PipeableStream {
  const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>,
    options
  );
  return stream;
}
