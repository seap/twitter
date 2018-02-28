import Cookies from 'js-cookie'
import { Modal, Toast } from 'antd-mobile'

export function alert(message, callback = () => {}) {
  Modal.alert('info', message, [
    {
      text: 'confirm',
      onPress: callback
    }
  ])
}

export function toast(message) {
  Toast.info(message, 2)
}
