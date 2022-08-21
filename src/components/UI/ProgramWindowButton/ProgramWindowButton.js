const ProgramWindowButton = props => {

  const { type = 'button', classNames, label, disabled = false, onClickButton } = props;

  const onClickButtonHandler = () => {
    !disabled && onClickButton();
  };

  return (
    <button
      className={classNames}
      disabled={disabled}
      type={type}
      onClick={onClickButtonHandler}>{label}</button>
  )

};

export default ProgramWindowButton;
