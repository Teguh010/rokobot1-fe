import Head from 'next/head'
import React, { ReactNode } from 'react'
import GlobeComponent from './GlobeComponent'
import CpuUsageChart from './CpuUsageChart'
import SystemLoadChart from './SystemLoadChart'

type Props = {
  children: ReactNode
  title?: string
  description?: string
  favicon?: string
}

const Layout = ({
  children,
  title = 'Rokobot',
  description = 'AI chat bot for Rocos basilik impersonate',
  favicon = '/img/ai-robot.jpg'
}: Props) => (
  <div className="font-mono">
    <Head>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href={favicon} />
    </Head>
    <div className="min-h-screen bg-[#030E07] flex flex-col">
      <div className="first-row flex flex-nowrap  h-[65vh]">
        <div className="system-container min-w-[300px] max-w-[20%] border-r border-[#1E755C] p-4 text-[#1E755C]">
          <div className="text-2xl font-bold border-t border-[#1E755C] py-2">20:27:46</div>
          <div className="space-y-2 mb-2">
            <div className="border-b border-t border-[#1E755C] py-2">UPTIME: 1:08:51</div>
            <div>
              <div className="font-bold border-b border-[#1e755c7b] mb-2">CPU USAGE:</div>
              <div className="flex  cpu-usage h-[50px] border-b border-[#1e755c7b]">
                <div className="flex flex-col items-left w-[120px]">
                  <div className="text-md font-bold">* 1-2</div>
                  <div className="text-xs">avg 56%</div>
                </div>
                <div className="mb-2">
                  <CpuUsageChart />
                </div>
              </div>
              <div className="flex cpu-usage h-[50px] pt-2">
                <div className="flex flex-col items-left w-[120px]">
                  <div className="text-md font-bold">* 3-5</div>
                  <div className="text-xs">avg 56%</div>
                </div>
                <div>
                  <SystemLoadChart />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="font-bold border-t border-[#1E755C] pt-2 mt-4">WORLD VIEW:</div>
            <div>
              <GlobeComponent />
            </div>
          </div>
        </div>

        <div className="terminal-container min-w-[500px] flex-grow flex flex-col border-r border-[#1E755C] p-4 text-[#1E755C]">
          <div>Terminal</div>
        </div>

        <div className="messages-container min-w-[250px] max-w-[25%] flex flex-col">
          <div className="flex-1 p-4">{children}</div>
        </div>
      </div>

      <div className="second-row border-t border-[#1E755C] p-4 text-[#1E755C] text-sm h-[35vh]">
        <div className="flex justify-between items-center">
          <div className="font-bold">FILE FOLDER</div>
          <div className="font-bold">KEYBOARD</div>
        </div>
      </div>
    </div>
  </div>
)

export default Layout
