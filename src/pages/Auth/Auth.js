import { Fragment, useCallback, useContext, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import AuthContext from '../../authContext/auth-context';
import Input from '../../components/UI/Input/Input';

import { validateEmail } from '../../utils/validateEmail';

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
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

  const [isEmailRequiredMessage, setIsEmailRequiredMessage] = useState(false);
  const [isPasswordRequiredMessage, setIsPasswordRequiredMessage] = useState(false);
  const [isConfirmPasswordRequiredMessage, setIsConfirmPasswordRequiredMessage] = useState(false);

  const [showInvalidMessage, setShowInvalidMessage] = useState(false);
  const [showNotMatchPasswordMessage, setShowNotMatchPasswordMessage] = useState(false);
  const [showPleaseWaitMessage, setShowPleaseWaitMessage] = useState(false);

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false);

  const [signUpLoginButtonText, setSignUpLoginButtonText] = useState('Sign Up');

  const matchPassword = useCallback((password, confirmPassword) => {
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        setIsPasswordRequiredMessage(true);
        setIsConfirmPasswordRequiredMessage(true);
        setShowNotMatchPasswordMessage(true)
      } else {
        setIsPasswordRequiredMessage(false);
        setIsConfirmPasswordRequiredMessage(false);
        setShowNotMatchPasswordMessage(false)
      }
    }
  }, []);

  const onChangeEmailHandler = useCallback(email => {
    setEmailValue(email.trim());
    const isEmailRequiredMessage = validateEmail(email) && !!email.trim();
    setIsEmailRequiredMessage(!isEmailRequiredMessage)
    setShowInvalidMessage(false);
  }, []);

  const onChangePasswordHandler = useCallback(password => {
    setPasswordValue(password.trim());
    setIsPasswordRequiredMessage(!password.trim());
    setShowInvalidMessage(false);
    matchPassword(password.trim(), confirmPasswordValue);
  }, [confirmPasswordValue, matchPassword]);

  const onChangeConfirmPasswordHandler = useCallback(password => {
    setConfirmPasswordValue(password.trim());
    setIsConfirmPasswordRequiredMessage(!password.trim());
    setShowInvalidMessage(false);
    matchPassword(passwordValue, password.trim());
  }, [matchPassword, passwordValue]);

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
    const isEmailRequiredMessage = validateEmail(emailValue) && !!emailValue;
    setIsEmailRequiredMessage(!isEmailRequiredMessage);
  }, [emailValue]);

  const onBlurPasswordHandler = useCallback(() => {
    setIsPasswordRequiredMessage(!passwordValue);
    matchPassword(passwordValue, confirmPasswordValue);
  }, [confirmPasswordValue, matchPassword, passwordValue]);

  const onBlurConfirmPasswordHandler = useCallback(() => {
    setIsConfirmPasswordRequiredMessage(!confirmPasswordValue);
    matchPassword(passwordValue, confirmPasswordValue);
  }, [confirmPasswordValue, matchPassword, passwordValue]);

  const onClickEyePasswordIconHandler = () => {
    setIsVisiblePassword(prevState => !prevState);
  }

  const onClickEyeConfirmPasswordIconHandler = () => {
    setIsVisibleConfirmPassword(prevState => !prevState);
  }

  const onChangeSignUpLoginHandler = () => {
    setEmailValue('');
    setPasswordValue('');
    setConfirmPasswordValue('');
    setSignUpLoginButtonText(prevState => {
      if (prevState === 'Sign Up') {
        return 'Login'
      } else {
        return 'Sign Up'
      }
    })
  };

  return (
    <div className={classes.loginWrapper}>
      <img src={logo} alt=""/>

      {
        showInvalidMessage &&
        <p className={classes.errorMessage}>The email address or password is incorrect. Please try again.</p>
      }
      {
        showNotMatchPasswordMessage &&
        <p className={classes.errorMessage}>Password not match. Please try again.</p>
      }
      {
        showPleaseWaitMessage && <p className={classes.pleaseWaitMessage}>Please wait...</p>
      }
      <form onSubmit={onSubmitLogin}>

        <div className={classes.inputWrapper}>
          <Input
            value={emailValue}
            isErrorMessage={isEmailRequiredMessage}
            onBlur={onBlurEmailHandler}
            type='email'
            placeholder='Email'
            onChangeValue={onChangeEmailHandler}/>
          {isEmailRequiredMessage && <p className={classes.errorMessage}>Email address is required</p>}
        </div>

        <div className={classes.inputWrapper}>
          <Input
            value={passwordValue}
            isErrorMessage={isPasswordRequiredMessage}
            onBlur={onBlurPasswordHandler}
            type={isVisiblePassword ? 'text' : 'password'}
            placeholder='Password'
            onChangeValue={onChangePasswordHandler}/>

          {isVisiblePassword ?
            <AiFillEyeInvisible
              className={`${classes.eyePasswordIcon} disableSelection`}
              onClick={onClickEyePasswordIconHandler}/> :
            <AiFillEye
              className={`${classes.eyePasswordIcon} disableSelection`}
              onClick={onClickEyePasswordIconHandler}/>}

          {isPasswordRequiredMessage && <p className={classes.errorMessage}>Password is required</p>}
        </div>

        <div className={classes.inputWrapper}>
          {signUpLoginButtonText !== 'Sign Up' && <Fragment>
            <Input
              value={confirmPasswordValue}
              isErrorMessage={isConfirmPasswordRequiredMessage}
              onBlur={onBlurConfirmPasswordHandler}
              type={isVisibleConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm password'
              onChangeValue={onChangeConfirmPasswordHandler}/>

            {isVisibleConfirmPassword ?
              <AiFillEyeInvisible
                className={`${classes.eyePasswordIcon} disableSelection`}
                onClick={onClickEyeConfirmPasswordIconHandler}/> :
              <AiFillEye
                className={`${classes.eyePasswordIcon} disableSelection`}
                onClick={onClickEyeConfirmPasswordIconHandler}/>}

            {isConfirmPasswordRequiredMessage && <p className={classes.errorMessage}>Confirm password is required</p>}
          </Fragment>}


          <button onClick={onChangeSignUpLoginHandler} className={classes.signUpLoginButton}
                  type='button'>{signUpLoginButtonText}</button>
        </div>

        {
          signUpLoginButtonText !== 'Login' ?
            <button
              disabled={isEmailRequiredMessage || isPasswordRequiredMessage || !emailValue || !passwordValue}
              type='submit'>Login
            </button> :
            <button
              disabled={isEmailRequiredMessage || isPasswordRequiredMessage || isConfirmPasswordRequiredMessage || !emailValue || !passwordValue || !confirmPasswordValue}
              type='submit'>Sign Up
            </button>
        }

      </form>
    </div>
  )
};

export default Auth;
