import './HeaderBar.css'

export default function HeaderBar() {
    return (<header className="container header-bar">
        <img src="logo.svg" alt="logo" />
        <div className='flex-r'>
            <div>
                <button className='font-button'>
                    Mono
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8"><path fill="none" stroke="var(--clr-primary-100)" strokeWidth="1.5" d="m1 1 6 6 6-6" /></svg>
                </button>


            </div>
            <div className='vertical-line'>

            </div>
            <input type="checkbox" id="check" className="toggle" />
            <label htmlFor="check"></label>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path fill="none" stroke="#838383" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z" /></svg>
        </div>
    </header>);
}