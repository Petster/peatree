import '../css/global.css'
import {SWRConfig} from "swr";
import fetchJson from '../lib/fetchJson'

function MyApp({ Component, pageProps }) {
  return (
      <SWRConfig
          value={{
              fetcher: fetchJson,
              onError: (err) => {
                  console.error(err);
              }
      }}>
            <div className='bg-emerald-100 mx-auto flex flex-col min-h-screen overflow-hidden sm:break-words md:break-normal'>
                <section className={'flex flex-grow p-4'}>
                    <Component {...pageProps} />
                </section>
            </div>
      </SWRConfig>
  )
}

export default MyApp
