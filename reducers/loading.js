const IGNORED_ACTIONS = ['NOTIFICATIONS'];

const SUFFIX_REQUEST = 'REQUEST';
const SUFFIX_SUCCESS = 'SUCCESS';
const SUFFIX_FAIL    = 'FAIL';

export default function (state = [], action) {
    var typePrefix = action.type.substring(0, action.type.lastIndexOf("_"));
    var typeSuffix = action.type.substring(action.type.lastIndexOf("_") + 1);
    
    if (IGNORED_ACTIONS.some(ignoredAction => typePrefix.includes(ignoredAction))) {
        return state;
    }

    // on request add action.type to loading
    if (typeSuffix == SUFFIX_REQUEST) {
        if (!state.includes(action.type)) {
            return state.concat([ action.type ]);
        }
    }

    // on responses remove action.type from loading
    if ((typeSuffix == SUFFIX_SUCCESS || typeSuffix == SUFFIX_FAIL) && action.response) {
        return state.splice(state.indexOf(typePrefix + "_" + SUFFIX_REQUEST), 1);
    }

    return state;
}