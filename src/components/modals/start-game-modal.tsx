import { FC } from 'react'
import Modal from 'react-modal'

import { useDisableScroll } from './use-disable-scroll'
import style from './styles.module.css'
import './anim.css'

interface IGameIsOverModalProps {
  show: boolean
  onClick: () => void
}

export const StartGameModal: FC<IGameIsOverModalProps> = ({
  show,
  onClick,
}) => {
  useDisableScroll(show)

  return (
    <Modal
      isOpen={show}
      closeTimeoutMS={200}
      className={style.modal}
      overlayClassName={style.modal_overlay}
      appElement={document.getElementById('root') || undefined}
    >
      <img
        src={
          'https://static-basket-02.wbbasket.ru/vol29/landings/sample_tap/logo-bear.svg'
        }
        alt="logo"
        className={style.header_logo}
      />
      <h3 className={style.subheader}>
        Всё просто - нажимайте на мишку и копите
        <br />
        ягодное желе. Его можно обменять
        <br />
        на промокод на покупку у бренда
      </h3>

      <button className={style.button} onClick={onClick}>
        Начать игру
      </button>
    </Modal>
  )
}
