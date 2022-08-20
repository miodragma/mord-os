import { useCallback, useContext, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import Input from '../../components/UI/Input/Input';
import AuthContext from '../../authContext/auth-context';

import logo from '../../assets/logo.svg';

import classes from './Auth.module.scss';

const credentials = {
  email: 'borgoth@mordos.com',
  password: '12bindthem'
}

const Auth = () => {

  const { login } = useContext(AuthContext);

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [isEmailRequiredMessage, setIsEmailRequiredMessage] = useState(false);
  const [isPasswordRequiredMessage, setIsPasswordRequiredMessage] = useState(false);

  const [showInvalidMessage, setShowInvalidMessage] = useState(false);
  const [showPleaseWaitMessage, setShowPleaseWaitMessage] = useState(false);

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const onChangeEmailHandler = useCallback(email => {
    setEmailValue(email.trim());
    setIsEmailRequiredMessage(!email.trim())
    setShowInvalidMessage(false);
  }, []);

  const onChangePasswordHandler = useCallback(password => {
    setPasswordValue(password.trim());
    setIsPasswordRequiredMessage(!password.trim());
    setShowInvalidMessage(false);
  }, []);

  const onSubmitLogin = e => {
    e.preventDefault();
    if (emailValue !== credentials.email || passwordValue !== credentials.password) {
      setShowInvalidMessage(true);
    } else {
      setShowPleaseWaitMessage(true);
      setTimeout(() => {
        login();
        setShowPleaseWaitMessage(false);
      }, 1500);
    }
  }

  const onBlurEmailHandler = useCallback(() => {
    setIsEmailRequiredMessage(!emailValue);
  }, [emailValue]);

  const onBlurPasswordHandler = useCallback(() => {
    setIsPasswordRequiredMessage(!passwordValue);
  }, [passwordValue]);

  const onClickEyePasswordIconHandler = () => {
    setIsVisiblePassword(prevState => !prevState);
  }

  return (
    <div className={classes.loginWrapper}>
      <img src={logo} alt=""/>

      {
        showInvalidMessage &&
        <p className={classes.errorMessage}>The email address or password is incorrect. Please try again.</p>
      }
      {
        showPleaseWaitMessage && <p className={classes.pleaseWaitMessage}>Please wait...</p>
      }
      <form onSubmit={onSubmitLogin}>

        <div className={classes.inputWrapper}>
          <Input
            isErrorMessage={isEmailRequiredMessage}
            onBlur={onBlurEmailHandler}
            type='email'
            placeholder='Email'
            onChangeValue={onChangeEmailHandler}/>
          {isEmailRequiredMessage && <p className={classes.errorMessage}>Email address is required</p>}
        </div>

        <div className={classes.inputWrapper}>
          <Input
            isErrorMessage={isPasswordRequiredMessage}
            onBlur={onBlurPasswordHandler}
            type={isVisiblePassword ? 'text' : 'password'}
            placeholder='Password'
            onChangeValue={onChangePasswordHandler}/>

          {isVisiblePassword ?
            <AiFillEyeInvisible
              className={classes.eyePasswordIcon}
              onClick={onClickEyePasswordIconHandler}/> :
            <AiFillEye
              className={classes.eyePasswordIcon}
              onClick={onClickEyePasswordIconHandler}/>}

          {isPasswordRequiredMessage && <p className={classes.errorMessage}>Password is required</p>}
        </div>
        <button disabled={!emailValue || !passwordValue} type='submit'>Login</button>

      </form>
    </div>
  )
};

export default Auth;
