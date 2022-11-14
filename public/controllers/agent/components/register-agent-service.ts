import { WzRequest } from '../../../react-services/wz-request';
import { ServerAddressOptions } from '../register-agent/steps';

type Protocol = 'TCP' | 'UDP';

type RemoteItem = {
  connection: 'syslog' | 'secure';
  ipv6: 'yes' | 'no';
  protocol: Protocol[];
  allowed_ips?: string[];
  queue_size?: string;
};

type RemoteConfig = {
  name: string;
  isUdp: boolean | null;
  haveSecureConnection: boolean | null;
};

/**
 * Get the remote configuration from api
 */
async function getRemoteConfiguration(
  nodeName: string,
): Promise<RemoteConfig>{
  let config: RemoteConfig = {
    name: nodeName,
    isUdp: null,
    haveSecureConnection: null,
  };
  const result = await WzRequest.apiReq(
    'GET',
    `/cluster/${nodeName}/configuration/request/remote`,
    {},
  );
  const items = ((result.data || {}).data || {}).affected_items || [];
  const remote = items[0]?.remote;
  if (remote) {
    const remoteFiltered = remote.filter((item: RemoteItem) => {
      return item.connection === 'secure';
    });

    remoteFiltered.length > 0
      ? (config.haveSecureConnection = true)
      : (config.haveSecureConnection = false);

    let protocolsAvailable: Protocol[] = [];
    remote.forEach((item: RemoteItem) => {
      // get all protocols available
      item.protocol.forEach(protocol => {
        protocolsAvailable = protocolsAvailable.concat(protocol);
      });
    });

    config.isUdp =
      getRemoteProtocol(protocolsAvailable) === 'UDP' ? true : false;
  }
  return config;
};

/**
 * Get the remote protocol available from list of protocols
 * @param protocols 
 */
function getRemoteProtocol(protocols: Protocol[]) {
  if (protocols.length === 1) {
    return protocols[0];
  } else {
    return !protocols.includes('TCP') ? 'UDP' : 'TCP';
  }
};


/**
 * Get the remote configuration from nodes registered in the cluster and decide the protocol to setting up in deploy agent param
 * @param nodeSelected 
 * @param defaultServerAddress 
 */
async function getConnectionConfig(nodeSelected: ServerAddressOptions, defaultServerAddress?: string) {
  const nodeName = nodeSelected?.label;
  if(!defaultServerAddress){
    if(nodeSelected.nodetype !== 'custom'){
      const remoteConfig = await getRemoteConfiguration(nodeName);
      return { serverAddress: remoteConfig.name, udpProtocol: remoteConfig.isUdp, connectionSecure: remoteConfig.haveSecureConnection };
    }else{
      return { serverAddress: nodeName, udpProtocol: false, connectionSecure: true };
    }
  }else{
    return { serverAddress: defaultServerAddress, udpProtocol: false, connectionSecure: true };
  }
}

type NodeItem = {
  name: string;
  ip: string;
  type: string;
}

type NodeResponse = {
  data: {
    data: {
      affected_items: NodeItem[];
    }
  }
}

/**
 * Get the list of the cluster nodes and parse it into a list of options
 */
export const getNodeIPs = async (): Promise<any> => {
  return await WzRequest.apiReq('GET', '/cluster/nodes', {});
};

/**
 * Parse the nodes list from the API response to a format that can be used by the EuiComboBox
 * @param nodes
 */
export const parseNodesInOptions = (nodes: NodeResponse): ServerAddressOptions[] => {
  return nodes.data.data.affected_items.map((item: NodeItem) => ({
    label: item.name,
    value: item.ip,
    nodetype: item.type,
  }));
};

/**
 * Get the list of the cluster nodes from API and parse it into a list of options
 */
export const fetchClusterNodesOptions = async (): Promise<ServerAddressOptions[]> => {
  const nodes = await getNodeIPs();
  return parseNodesInOptions(nodes);
}

/**
 * Get the master node data from the list of cluster nodes
 * @param nodeIps
 */
export const getMasterNode = (nodeIps: ServerAddressOptions[]): ServerAddressOptions[] => {
  return nodeIps.filter((nodeIp) => nodeIp.nodetype === 'master');
};



export {
  getConnectionConfig,
  getRemoteConfiguration,
}