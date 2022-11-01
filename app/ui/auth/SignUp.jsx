import React, {useState} from 'react';
import { Accounts } from 'meteor/accounts-base'
import { RoutePaths } from '../components/main/RoutePaths';
import { useNavigate } from 'react-router-dom';
import { ErrorAlert } from '../components/alerts/ErrorAlert';

export const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState();
  
    const navigate = useNavigate();
    const signUp = (e) => {
        e.preventDefault();
        Accounts.createUser({email, password},
        (err) => {
            if (err){
                console.log('err creating user', err);
                setErr(err)
                return;
            } 
            navigate(RoutePaths.HOME)
        })
    }
    return(
        <>
        <div className='flex flex-col items-center'> 
        <h3 className=' rounded-full px-3 py-2 text-lg font-medium'>Sign up</h3>
        {err && <ErrorAlert message={err.reason  || 'Unknown error'} />}
            <form action="" data-aos="fade-up">
           
            <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <div className="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
        <input
          type="email"
          name="email"
          id="email"
          value={email}
        onChange={e => setEmail(e.target.value)}

          className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-indigo-600 focus:ring-0 sm:text-sm"
          placeholder="example.com"
        />
      </div>
    </div>
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Password
      </label>
      <div className="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
        <input
          type="password"
          name="password"
          id="password"
          value={password}
        onChange={e => setPassword(e.target.value)}
          className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-indigo-600 focus:ring-0 sm:text-sm"
          placeholder="example.com"
        />
      </div>
    </div>
             
              <div className='spacing-10'>
                    <button
                    onClick={() => navigate(RoutePaths.HOME)}
                               className='mt-4 py-2 px-3 font-serif font-medium text-[18px] text-white bg-tertiaryOne rounded-[10px] outline-none hover:text-white hover:bg-opacity-40 transition ease-in-out duration-150'
                              
                    >
                      Cancel
                    </button>
                  </div>
              
                  <div className='spacing-10'>
                    <button
                    onClick={signUp}
                    type='submit'
                    className=' py-2 px-3 font-serif font-medium text-[18px] text-white bg-slate-900 rounded-[10px] outline-none hover:text-white hover:bg-opacity-40 transition ease-in-out duration-150'
                              
                    >
                      Sign up
                    </button>
                  </div>
           
          </form>
       </div>
        </>
    )
}