import { combineReducers } from 'redux';
import { authentication } from './auth.reducer';
import { userSettings } from './user.reducer';
import { passwordReset } from './passwordReset.reducer';

const rootReducer = combineReducers({
    authentication,
    userSettings,
    passwordReset
});

export default rootReducer;