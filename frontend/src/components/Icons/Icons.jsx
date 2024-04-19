import { ReactComponent as InstagramIcon } from "media/icons/instagram-icon.svg"
import { ReactComponent as FacebookIcon } from "media/icons/facebook-icon.svg"
import { ReactComponent as TwitterIcon } from "media/icons/twitter-icon.svg"
import { ReactComponent as WhatsappIcon } from "media/icons/whatsapp-icon.svg"
import { ReactComponent as PhoneIcon } from "media/icons/phone-icon.svg"
import { ReactComponent as MailIcon } from "media/icons/mail-icon.svg"

import styles from "./Icons.module.scss"
import PropTypes from "prop-types"
const icons = {
    Instagram: InstagramIcon,
    Facebook: FacebookIcon,
    Twitter: TwitterIcon,
    Whatsapp: WhatsappIcon,
    Phone: PhoneIcon,
    "E-Mail": MailIcon,
}

const Icons = ({ iconName }) => {
    const Icon = icons[iconName] || null
    return Icon ? (
        <div>
            <Icon className={styles.icons} aria-label={`${iconName} icon`} />
        </div>
    ) : null
}

Icons.propTypes = {
    iconName: PropTypes.string.isRequired, // Ensuring iconName is a string and required
}

export default Icons
