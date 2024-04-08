import type { ListenerType } from './ListenerType';

export interface SerialportParamsType {
  onError?: ListenerType;
  onReadData?: ListenerType;
  onService?: ListenerType;
  onConnected?: ListenerType;
  onDeviceAttached?: ListenerType;
  onDeviceDetached?: ListenerType;
}