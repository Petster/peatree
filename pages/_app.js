import '../css/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-emerald-100 mx-auto flex flex-col min-h-screen overflow-hidden sm:break-words md:break-normal'>
        <section className={'flex flex-grow p-4'}>
            <Component {...pageProps} />
        </section>
    </div>
  )
}

export default MyApp
