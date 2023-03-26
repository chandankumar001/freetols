import counterReducer from '../features/Counter/counterReducer';
import { createStore ,applyMiddleware,combineReducers} from 'redux';
import myipReducer from '../features/MyIp/MyIpReducer';
import resizeImageReducer from '../features/ResizeImage/ResizeImageReducer';
import CropImageReducer from '../features/CropImage/CropImageReducer';

const thunkMiddleware = require('redux-thunk').default


const rootReducer = combineReducers({
  counter: counterReducer,
  myip:myipReducer,
  resizeimage:resizeImageReducer,
  cropImage:CropImageReducer
})

export const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);
