import styles from "./header.module.css";
import Image from "next/image";
const Header = () => {
    return (
        <div className = {styles.container}>
            <Image src="https://cdn.discordapp.com/icons/879728304482029609/7d76e567ef29dc578ffcb4c79ac6075a.webp?size=128" alt="" width="60" height="60" />
            <span className = {styles.title}>Tech Club - Time Keeping</span>
        </div>
    )
}

export default Header