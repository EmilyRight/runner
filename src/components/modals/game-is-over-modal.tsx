import cn from 'classnames'

import { FC } from 'react'
import { useDisableScroll } from './use-disable-scroll'

import Modal from 'react-modal'

import style from './styles.module.css'

interface IGameIsOverModalProps {
  show: boolean
  onClose: () => void
  points: number
  data: IGameIsOverData | null
}

interface IGameIsOverData {
  id: number
  title: string
  coin: string
  available: boolean
  requiredPoints: number
  discount: string
  validUntil: string
  minOrderAmount: string
  promocode: string
}

export const GameIsOverModal: FC<IGameIsOverModalProps> = ({
  show,
  onClose,
  data,
  points,
}) => {
  useDisableScroll(show)

  const coinValue = Number(data?.coin.replace(/\s+/g, '')) - points
  const formattedValue = coinValue.toLocaleString('ru-RU')

  const hasEnoughPoints = data && points >= data.requiredPoints

  return (
    <Modal
      isOpen={show}
      className={style.modal}
      overlayClassName={style.modal_overlay}
      appElement={document.getElementById('root') || undefined}
    >
      {data &&
        (hasEnoughPoints ? (
          <>
            <h2 className={style.header}>{data.promocode}</h2>

            <h3 className={style.subheader}>
              Скидка {data.discount}&nbsp;₽ по&nbsp;промокоду <br />
              при заказе от {data.minOrderAmount}&nbsp;₽ до&nbsp;
              {data.validUntil}
            </h3>
          </>
        ) : (
          <>
            <h2 className={style.header}>
              Вам не хватает <br /> {formattedValue}
              <img
                src={
                  'https://static-basket-02.wbbasket.ru/vol29/landings/sample_tap/WB-coin.svg'
                }
                alt=""
                className={style.coin_img}
              />
            </h2>

            <h3 className={style.subheader}>
              Чтобы получить доступ к промокоду,
              <br />
              нужно натапать {data.coin}&nbsp;ягодного желе
            </h3>
          </>
        ))}

      <button className={cn(style.button, style.button_back)} onClick={onClose}>
        Вернуться к игре
      </button>

      <a
        className={style.button}
        href="https://www.wildberries.ru/catalog/0/search.aspx?search=iphone"
        target="__blank"
      >
        К товарам бренда
      </a>
    </Modal>
  )
}
