import './Footer.css'

function Footer({ isAdmin, onAdminLogin, onAdminLogout }) {
  return (
    <footer className="footer">
      <button className="footer__link" type="button" onClick={isAdmin ? onAdminLogout : onAdminLogin}>
        {isAdmin ? 'יציאה ממצב מנהל' : 'כניסת מנהל'}
      </button>
    </footer>
  )
}

export default Footer
