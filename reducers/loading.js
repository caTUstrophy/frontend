
const SUFFIX_REQUEST = 'REQUEST';
const SUFFIX_SUCCESS = 'SUCCESS';
const SUFFIX_FAIL    = 'FAIL';

export default function (state = { loading : [] }, action) {

    var typePrefix = action.type.slice(0, action.type.lastIndexOf("_"))
    var typeSuffix = action.type.slice(action.type.lastIndexOf("_") + 1);

    // on request add action.type to loading
    if(typeSuffix == SUFFIX_REQUEST) {
        var loading = [];
        if(state.loading) loading = state.loading.slice();
        if(loading.indexOf((action.type) == -1)) loading.push(action.type)
        return Object.assign({}, state, { loading } );
    }

    // on responses remove action.type from loading
    if((typeSuffix == SUFFIX_SUCCESS || typeSuffix == SUFFIX_FAIL) && action.response) {
        var loading = [];
        if(state.loading) loading = state.loading.slice();
        loading.splice(loading.indexOf(typePrefix + "_" + SUFFIX_REQUEST), 1)
        return Object.assign({}, state, { loading } )
    }

    return state;
}