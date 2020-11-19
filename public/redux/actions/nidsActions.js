import { NidsRequest } from '../../react-services/nids-request';

export function getAllNodes() {
  return async (dispatch) => {
    const nodes = await NidsRequest.genericReq('GET', '/nids/nodes', {});
    dispatch(accGetAllNodes(nodes.data.data))
  }
}
function accGetAllNodes(nodes){
  return {
    type: 'NODES', 
    payload: nodes
  }
};

export function getAllTags() {
  return async (dispatch) => {
    const tags = await NidsRequest.genericReq('GET', '/nids/tags', {});
    dispatch(accGetAllTags(tags.data.data))
  }
}
function accGetAllTags(tags){
  return {
    type: 'TAGS', 
    payload: tags
  }
};

export function getAllOrgs() {
  return async (dispatch) => {
    const orgs = await NidsRequest.genericReq('GET', '/nids/orgs', {});
    dispatch(accGetAllOrgs(orgs.data.data))
  }
}
function accGetAllOrgs(orgs){
  return {
    type: 'ORGS', 
    payload: orgs
  }
};

export function getAllGroups() {
  return async (dispatch) => {
    const groups = await NidsRequest.genericReq('GET', '/nids/groups', {});
    dispatch(accGetAllGroups(groups.data.data))
  }
}
function accGetAllGroups(groups){
  return {
    type: 'GROUPS', 
    payload: groups
  }
};

export function LoadInterfaces() {
  return async (dispatch) => {
    const ifaces = await NidsRequest.genericReq('GET', '/nids/interfaces', {});
    dispatch(accSaveInterfaces(ifaces.data.data))
  }
}
function accSaveInterfaces(ifaces){
  return {
    type: 'INTERFACES', 
    payload: ifaces
  }
};

export function loadRuleset() {
  return async (dispatch) => {
    const rsets = await NidsRequest.genericReq('GET', '/nids/rulesets', {});
    dispatch(accSaveRulesets(rsets.data.data))
  }
}
function accSaveRulesets(rsets){
  return {
    type: 'RULESETS', 
    payload: rsets
  }
};

export function deleteNode(uuid) {
  var params = {
    method: "DELETE",
    path: `/node/${uuid}`
  }             
  return async (dispatch) => {
    const data = await NidsRequest.genericReq('PUT', '/nids/node/delete', params);  
    dispatch(getAllNodes())
  }
}

export function addNode(nodeData) {
  var params = {
    method: "POST",
    path: '/node/enrollNewNode',
    data: nodeData
  }  
  return async (dispatch) => {
    const data = await NidsRequest.genericReq('POST', '/nids/node/enroll', params)        
    dispatch(getAllNodes())
  }
}

export function editNode(nodeData) {
  var params = {
    method: "PUT",
    path: '/node/updateNodeReact',
    data: nodeData
  }  
  return async (dispatch) => {
    const data = await NidsRequest.genericReq('PUT', '/nids/node/editNode', params)        
    dispatch(getAllNodes())
  }
}

export function updateService(pluginData) {
  var params = {
    method: "PUT",
    path: '/node/modifyNodeOptionValues',
    data: pluginData
  }  
  return async (dispatch) => {
    const data = await NidsRequest.genericReq('PUT', '/nids/node/updateService', params)        
    dispatch(PingPluginsNode(pluginData.uuid))
  }
}

export function changeServiceStatus(pluginData) {
  var params = {
    method: "PUT",
    path: '/node/changeServiceStatus',
    data: pluginData
  }  
  return async (dispatch) => {
    const data = await NidsRequest.genericReq('PUT', '/nids/node/changeServiceStatus', params)        
    dispatch(PingPluginsNode(pluginData.uuid))
  }
}

export function syncRuleset(pluginData) {
  var params = {
    method: "PUT",
    path: '/node/ruleset/set',
    data: pluginData
  }  
  return async (dispatch) => {
    const data = await NidsRequest.genericReq('PUT', '/nids/node/syncRuleset', params)        
    dispatch(PingPluginsNode(pluginData.uuid))
  }
}

export function addService(pluginData) {
  var params = {
    method: "POST",
    path: '/node/addService',
    data: pluginData
  }  
  return async (dispatch) => {
    const data = await NidsRequest.genericReq('POST', '/nids/node/addService', params)        
    dispatch(PingPluginsNode(pluginData.uuid))
  }
}


export function deleteService(values) {
  var params = {
    method: "DELETE",
    path: `/node/deleteService`,
    data: values
  }             
  return async (dispatch) => {
    const data = await NidsRequest.genericReq('DELETE', '/nids/node/deleteService', params);  
    dispatch(PingPluginsNode(values.uuid))
  }
}

export function PingPluginsNode(uuid) {
  return async (dispatch) => {
    var params = {
      method: "GET",
      path: '/node/PingPluginsNode/'+uuid,
    }  
    const values = await NidsRequest.genericReq('PUT', '/nids/node/PingPluginsNode', params)        
    dispatch(savePlugins(values.data.data))
  }
}

/**
 * Toggle the tab selected for NIDS
 * @param {Boolean} tab
 */
export const savePlugins = value => {
  return {
    type: 'SAVE_PLUGINS',
    payload: value
  };
};

/**
 * Toggle the tab selected for NIDS
 * @param {Boolean} tab
 */
export const changeTabSelected = value => {
  return {
    type: 'TAB',
    payload: value
  };
};
  
/**
 * Toggle Add node panel
 * @param {Boolean} 
 */
export const toggleAddNodeMenu = value => {
  return {
    type: 'ADD_NODE',
    payload: value
  };
};
  
/**
 * Put the node to edit
 * @param {String} 
 */
export const nodeForEdit = value => {
  return {
    type: 'EDIT_NODE',
    payload: value
  };
};
  
/**
 * Put the node to edit
 * @param {String} 
 */
export const SaveNodeToDetails = value => {
  return {
    type: 'NODE_DETAILS',
    payload: value
  };
};
  
/**
 * Put the node to edit
 * @param {String} 
 */
export const NodeDetailsTab = value => {
  return {
    type: 'NODE_TAB',
    payload: value
  };
};
  
/**
 * Add suricata
 * @param {String} 
 */
export const addSuricata = value => {
  return {
    type: 'ADD_SURICATA',
    payload: value
  };
};
  
/**
 * Add suricata toggle
 * @param {String} 
 */
export const toggleAddSuricata = value => {
  return {
    type: 'TOGGLE_SURICATA',
    payload: value
  };
};
  
/**
 * Save plugin to edit
 * @param {String} 
 */
export const savePluginToEdit = value => {
  return {
    type: 'EDIT_PLUGIN',
    payload: value
  };
};
  
/**
 * Save Orgs uuids
 * @param {String} 
 */
export const saveSelectedOrgs = value => {
  return {
    type: 'SAVE_ORGS',
    payload: value
  };
};
  
/**
 * Save Tags uuids
 * @param {String} 
 */
export const saveSelectedTags = value => {
  return {
    type: 'SAVE_TAGS',
    payload: value
  };
};
  
/**
 * Save groups uuids
 * @param {String} 
 */
export const saveSelectedGroups = value => {
  return {
    type: 'SAVE_GROUPS',
    payload: value
  };
};