import cn from 'classnames'
import Tilt from 'vanilla-tilt'
import { useRef, useEffect, useState } from 'react'
// import { TicketGenerationState } from '@lib/constants'
// import {isMobileOrTablet} from '~/lib/helpers'
// import { scrollTo } from '@lib/smooth-scroll'
import styles from './ticket.module.css'
import styleUtils from './utils.module.css'
import TicketForm from './TicketForm'
import TicketVisual from './TicketVisual'
import TicketActions from './TicketActions'
import TicketCopy from './ticket-copy'
import { DATE, SITE_NAME } from '~/lib/constants'
import Form from './form'
import { UserData } from './hooks/use-conf-data'
import ReferralIndicator from '../ReferralIndicator'
import useWinningChances from './hooks/useWinningChances'

type TicketGenerationState = 'default' | 'loading'

type Props = {
  username: UserData['username']
  ticketNumber: UserData['ticketNumber']
  name: UserData['name']
  golden: UserData['golden']
  referrals: number
  sharePage?: boolean
}

export default function Ticket({
  username,
  name,
  ticketNumber,
  sharePage,
  golden,
  referrals,
}: Props) {
  const ticketRef = useRef<HTMLDivElement>(null)
  const [ticketGenerationState, setTicketGenerationState] =
    useState<TicketGenerationState>('default')
  const divRef = useRef<HTMLDivElement>(null)
  const winningChances = useWinningChances()

  useEffect(() => {
    if (ticketRef.current && !window.matchMedia('(pointer: coarse)').matches) {
      Tilt.init(ticketRef.current, {
        glare: true,
        max: 4,
        'max-glare': 0.1,
        'full-page-listening': true,
      })
    }
  }, [ticketRef])

  // useEffect(() => {
  //   if (!sharePage && divRef && divRef.current && isMobileOrTablet()) {
  //     scrollTo(divRef.current, -30)
  //   }
  // }, [divRef, sharePage])
  // golden = true

  return (
    <div
      className="w-full max-w-[800px] xl:max-w-[1100px] flex flex-col items-center xl:grid xl:grid-cols-12 gap-4 xl:gap-8 2xl:gap-16 p-2 bg-[#a988d748] rounded-2xl xl:items-stretch h-auto"
      id="wayfinding--ticket-visual-wrapper-container"
    >
      <div
        className={cn(styles['ticket-visual-wrapper'], 'flex items-stretch col-span-8')}
        id="wayfinding--ticket-visual-wrapper"
      >
        <div
          ref={ticketRef}
          className={cn(
            styles['ticket-visual'],
            styleUtils.appear,
            styleUtils['appear-fourth'],
            username ? 'h-[420px]' : 'h-[395px]',
            'relative flex flex-col gap-2 w-full h-full rounded-xl box-border bg-transparent overflow-hidden'
          )}
          id="wayfinding--ticket-visual-outer-container"
        >
          <TicketVisual
            username={username ?? undefined}
            name={name ?? undefined}
            ticketNumber={ticketNumber ?? 0}
            ticketGenerationState={ticketGenerationState}
            setTicketGenerationState={setTicketGenerationState}
            golden={golden}
          />
          {username && (
            <div>
              <TicketCopy username={username} />
            </div>
          )}
        </div>
        {!sharePage && (
          <>
            {username ? (
              <div className="flex flex-col gap-6 py-4 mx-3">
                {/* <div>
                  <TicketCopy username={username} />
                </div> */}
                {/* <div className={`flex flex-col xl:flex-row gap-3 items-center justify-center`}>
                  <TicketActions username={username} golden={golden} />
                </div> */}
              </div>
            ) : (
              <></>
              // <div className={styles['ticket-actions-placeholder']} />
            )}
          </>
        )}
      </div>
      <div
        ref={divRef}
        className="flex flex-col !w-full h-full justify-center gap-6 col-span-full xl:col-span-4 xl:pr-8 2xl:pr-16"
      >
        <div
          className={`
          text-scale-1200
          flex flex-col
          w-full
          items-center
          text-center xl:text-left
          xl:items-start
          gap-3
          `}
        >
          <h1 className={cn(styleUtils.appear, styleUtils['appear-first'], 'text-xl xl:text-3xl')}>
            {!sharePage ? (
              <>
                {name ? (
                  <>
                    {winningChances === 1 && (
                      <p className="text-2xl dark:text-scale-1200 tracking-[0.02rem]">
                        You're <span className="gradient-text-purple-800">in the draw!</span> <br />
                        Now make it gold.
                      </p>
                    )}
                    {winningChances === 2 && (
                      <p className="text-2xl dark:text-scale-1200 tracking-[0.02rem]">
                        You've <span className="gradient-text-purple-800">doubled</span> your
                        <br />
                        chance! Almost gold.
                      </p>
                    )}
                    {winningChances === 3 && (
                      <p className="text-2xl dark:text-scale-1200 tracking-[0.02rem]">
                        You're <span className="gradient-text-gold-500">gold</span>!<br />
                        You've maxed your <br /> chances of winning!
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-2xl dark:text-scale-1200 tracking-[0.02rem]">
                    Generate your ticket. <br />
                    Win the <span className="gradient-text-purple-800">SupaKeyboard</span>.
                  </p>
                )}
              </>
            ) : (
              <>
                {name ? name : username}'s <br />
                unique ticket
              </>
            )}
          </h1>

          <h2 className="text-base max-w-[520px]">
            {!sharePage ? (
              <>
                {golden ? (
                  <>
                    <p>
                      You got a Golden ticket. This means you’re in, and you also won a Supabase
                      sticker pack!
                    </p>
                  </>
                ) : (
                  <>
                    {username ? (
                      <>
                        <p>
                          Why stop there? Increase your chances of winning by sharing your unique
                          ticket. Get sharing!
                        </p>
                      </>
                    ) : (
                      <p>
                        We have some fantastic swag up for grabs, including 3x limited edition
                        mechanical keyboard that you won't want to miss.
                      </p>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <p>
                  Get yours and win some fantastic swag, including a limited edition mechanical
                  keyboard that you won't want to miss.
                </p>
              </>
            )}
          </h2>

          {!sharePage && username && <ReferralIndicator />}
        </div>
        <div className={cn(styleUtils.appear, styleUtils['appear-third'])}>
          {username && (
            <TicketActions
              username={username}
              golden={golden}
              ticketGenerationState={ticketGenerationState}
              setTicketGenerationState={setTicketGenerationState}
            />
          )}
        </div>
      </div>
    </div>
  )
}