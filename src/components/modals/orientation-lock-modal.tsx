import { FC } from 'react'
import Modal from 'react-modal'
import cn from 'classnames'

import { useDisableScroll } from './use-disable-scroll'
import style from './styles.module.css'
import './anim.css'

interface IOrientationLockModalProps {
  show: boolean
}

export const OrintationLockModal: FC<IOrientationLockModalProps> = ({
  show,
}) => {
  useDisableScroll(show)

  return (
    <Modal
      isOpen={show}
      closeTimeoutMS={200}
      className={style.modal}
      overlayClassName={cn(style.modal_overlay, style.lock_modal)}
      appElement={document.getElementById('root') || undefined}
    >
      <h3>Верните устройству портретный режим и игра продолжится : ) </h3>
    </Modal>
  )
}
