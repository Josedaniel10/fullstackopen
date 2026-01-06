const Alert = ({ config, setConfig }) => {
  if (!config.isActivated) {
    return
  }

  const styles = {
    border: '2px solid #000',
    padding: '0 10px',
    background: '#249724ff',
    color: '#fff',
    fontSize: '18px',
    borderRadius: '12px',
  }
  const styleSuccess = {
    ...styles,
    background: '#27ab27ff',
  }
  const styleError = {
    ...styles,
    background: '#f93131',
  }

  setTimeout(() => {
    setConfig({ ...config, isActivated: false })
  }, 5000)

  return (
    <div style={config.type === 'success' ? styleSuccess : styleError}>
      <p>{config.message}</p>
    </div>
  )
}

export default Alert
